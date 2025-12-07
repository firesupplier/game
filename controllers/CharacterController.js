import { quat, vec3, mat4 } from '../gl-matrix-module.js';

import { Transform } from '../core/Transform.js';
import { Character } from '../core/Character.js';

export class CharacterController {

    constructor(entity, domElement, camera, {
        pitch = 0,
        yaw = 0,
        velocity = [0, 0, 0],
        acceleration = 50,
        maxSpeed = 5,
        decay = 0.99999,
    } = {}) {
        this.entity = entity;
        this.domElement = domElement;
        this.camera = camera;

        this.keys = {};

        this.pitch = pitch;
        this.yaw = yaw;

        this.velocity = velocity;
        this.acceleration = acceleration;
        this.maxSpeed = maxSpeed;
        this.decay = decay;

        this.initHandlers();
    }

    initHandlers() {
        //this.pointermoveHandler = this.pointermoveHandler.bind(this);
        this.keydownHandler = this.keydownHandler.bind(this);
        this.keyupHandler = this.keyupHandler.bind(this);

        const element = this.domElement;
        const doc = element.ownerDocument;

        doc.addEventListener('keydown', this.keydownHandler);
        doc.addEventListener('keyup', this.keyupHandler);

        /*element.addEventListener('click', e => element.requestPointerLock());
        doc.addEventListener('pointerlockchange', e => {
            if (doc.pointerLockElement === element) {
                doc.addEventListener('pointermove', this.pointermoveHandler);
            } else {
                doc.removeEventListener('pointermove', this.pointermoveHandler);
            }
        });*/
    }

    update(t, dt) {
        // Calculate forward and right vectors.
        const cos = Math.cos(this.yaw);
        const sin = Math.sin(this.yaw);
        const forward = [-sin, 0, -cos];
        const right = [cos, 0, -sin];

        // Map user input to the acceleration vector.
        const acc = vec3.create();
        const inDialogue = window.hudManager.getDialogueValue(); // Checks if in dialogue and if so prevents movement
        if (this.keys['KeyS'] && !inDialogue) {
            vec3.add(acc, acc, forward);
        }
        if (this.keys['KeyW'] && !inDialogue) {
            vec3.sub(acc, acc, forward);
        }
        if (this.keys['KeyA'] && !inDialogue) {
            vec3.add(acc, acc, right);
        }
        if (this.keys['KeyD'] && !inDialogue) {
            vec3.sub(acc, acc, right);
        }
        

        // Update velocity based on acceleration.
        vec3.scaleAndAdd(this.velocity, this.velocity, acc, dt * this.acceleration);

        // If there is no user input, apply decay.
        if ((!this.keys['KeyW'] &&
            !this.keys['KeyS'] &&
            !this.keys['KeyD'] &&
            !this.keys['KeyA']) || inDialogue)
        {
            const decay = Math.exp(dt * Math.log(1 - this.decay));
            vec3.scale(this.velocity, this.velocity, decay);
        }

        // Limit speed to prevent accelerating to infinity and beyond.
        const speed = vec3.length(this.velocity);
        if (speed > this.maxSpeed) {
            vec3.scale(this.velocity, this.velocity, this.maxSpeed / speed);
        }

        const transform = this.entity.getComponentOfType(Transform);
        const colliding = this.entity.getComponentOfType(Character).colliding;
        const transCamera = this.camera.getComponentOfType(Transform);

        const offset = [-2.8, 5.3, -14.2];
        const verticePos = this.entity.components[1].primitives[0].mesh.vertices[0].position;
        const transVerPosX = verticePos[0] + transform.translation[0];
        const transVerPosY = verticePos[2] + transform.translation[2];
        if (transform) {
            // Update translation based on velocity.
            vec3.scaleAndAdd(transform.translation,
                transform.translation, this.velocity, dt);
            
            //this.entity.components[1].primitives[0].mesh.vertices[0].position
            //console.log(transform.translation);
            //Premika kamero!
            /*if(!colliding){
                vec3.scaleAndAdd(transCamera.translation,
                    transCamera.translation, this.velocity, dt);
                transCamera.translation[2] = -15;
            }*/
            transCamera.translation[0] = 
                offset[0] + transVerPosX;
        }

        //console.log(transVerPosX, transVerPosY)
        for(let i = 0; i < this.entity.components[2].npcLocation.length; i++){
            var locationNPC = this.entity.components[2].npcLocation[i]
            if(transVerPosX>locationNPC[0]-3 && transVerPosX<locationNPC[0]+3 && transVerPosY>locationNPC[2]-3&&transVerPosY<locationNPC[2]+3){
                //this.entity.components[2].isNearNPC[i] = true;
                window.hudManager.setNPCLocation(i, true);
            } else {
                //this.entity.components[2].isNearNPC[i] = false;
                window.hudManager.setNPCLocation(i, false);
            }
        }
    }

    keydownHandler(e) {
        this.keys[e.code] = true;
    }

    keyupHandler(e) {
        this.keys[e.code] = false;
    }
}
