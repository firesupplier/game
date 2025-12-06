import { quat, mat4 } from './gl-matrix-module.js';
import { 
    Camera,
    Entity,
    Light,
    Transform,
    Material,
    Mesh,
    Model,
    Primitive,
    Sampler,
    Texture,
 } from './core/core.js';

import { GLTFLoader } from './loaders/GLTFLoader.js';
import { OBJLoader } from './loaders/OBJLoader.js';
import { ImageLoader } from './loaders/ImageLoader.js';

import { ResizeSystem } from './systems/ResizeSystem.js';
import { UpdateSystem } from './systems/UpdateSystem.js';

import { UnlitRenderer } from './renderers/UnlitRenderer.js';
import { LambertRenderer } from './renderers/LambertRenderer.js';

import { FirstPersonController } from './controllers/FirstPersonController.js';
import { CharacterController } from './controllers/CharacterController.js';

import {showHUD, showDialogue, closeHUD} from './hud/showHUD.js'

// starting screen

// const startScreen = document.getElementById("start-screen");
// const startBtn = document.getElementById("start-btn");
const canvas = document.querySelector("canvas");

// canvas.style.display = "none";
// const clickSound = document.getElementById("click-sound");


// startBtn.addEventListener("click", () => {
//     clickSound.currentTime = 0; 
//     clickSound.play();
//     startScreen.style.display = "none";
//     canvas.style.display = "block";
//     startGame();
// });

// game start
//async function startGame() {

    // Initialize renderer
    const renderer = new LambertRenderer(canvas);
    await renderer.initialize();

    // Load GLTF
    const loader = new GLTFLoader();
    await loader.load(new URL('./assets/models/placeholder_scena/placeholder_scena.gltf', import.meta.url));

    const scene = loader.loadScene();
    const camera = new Entity();
    camera.addComponent(new Transform({
        translation: [-2, 8, -15],
        rotation: [-0.0006866238545626402, 0.9767575263977051, 0.21432319283485413, 0.0031292226631194353],

    }));

    camera.addComponent(new Camera());
    //FirstPersonController-ja kamera ne uporablja več, lahko se uporablja za debugging
    //camera.addComponent(new FirstPersonController(camera, canvas));
    scene.push(camera);

    const light = new Entity();
    light.addComponent(new Light({
        //color: [255, 255, 0],
        direction: [5, 1, -0.5],
    }));
    scene.push(light);

    const loaderOBJ = new OBJLoader();
    const loaderImage = new ImageLoader();

    const characterMesh = await loaderOBJ.load(new URL('./assets/models/placeholder_character/placeholder_character.obj', import.meta.url));
    const characterTekstura = await loaderImage.load(new URL('./assets/models/placeholder_character/lik_telo.png', import.meta.url));
    const character = new Entity();
    character.addComponent(new Transform({
        translation: [0, 0, -5],
    }));
    character.addComponent(new Model({
        primitives: [
            new Primitive({
                mesh: characterMesh,
                material: new Material({
                    baseTexture: new Texture({
                        image: characterTekstura,
                        sampler: new Sampler,
                    })
                }),
            }),
        ],
    }));
    character.addComponent(new CharacterController(character, canvas, camera));
    scene.push(character);

    // Update loop
    function update(t, dt) {
        for (const entity of scene) {
            for (const component of entity.components) {
                component.update?.(t, dt);
            }
        }
    }

    // Render loop
    function render() {
        renderer.render(scene, camera);
    }

    // Resize handling
    function resize({ displaySize: { width, height }}) {
        camera.getComponentOfType(Camera).aspect = width / height;
    }

    new ResizeSystem({ canvas, resize }).start();
    new UpdateSystem({ update, render }).start();
//}