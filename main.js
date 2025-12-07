import { quat, mat4 } from './gl-matrix-module.js';
import { 
    Camera,
    Character,
    Entity,
    Light,
    Transform,
    Material,
    Mesh,
    Model,
    Pickup,
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

//import { addGltfModel } from "./helpers/addGltfModel.js"

import {
    calculateAxisAlignedBoundingBox,
    mergeAxisAlignedBoundingBoxes,
} from './core/MeshUtils.js';

import { Physics } from './core/Physics.js';

// starting screen

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const endScreenBad = document.getElementById("end-screen-bad");
const endScreenGood = document.getElementById("end-screen-good");
const restartBtnGood = document.getElementById("restart-btn-good");
const restartBtnBad = document.getElementById("restart-btn-bad");
const canvas = document.querySelector("canvas");
const ctrlsBtn = document.getElementById("ctrls-btn");
const controlsPopUp = document.getElementById("controls");
const closeCtrlsBtn = document.getElementById("close-ctrls");
const overlay = document.getElementById("overlay");
const gameCtrlsBtn = document.getElementById("game-ctrls-btn");

canvas.style.display = "none";
const clickSound = document.getElementById("click-sound");


startBtn.addEventListener("click", () => {
    clickSound.currentTime = 0; 
    clickSound.play();
    startScreen.style.display = "none";
    endScreenBad.style.display = "none";
    endScreenGood.style.display = "none";
    canvas.style.display = "block";
    startGame();
});



var bgm = document.getElementById("bgm");
bgm.loop = true;
var playMusic = true;

document.addEventListener("keydown", (event) => {
    if (event.code === "KeyT") {
        musicPlayer();
    }
})

function musicPlayer() {
    if (playMusic) {
        bgm.play();
        playMusic = false;
    } else {
        bgm.pause();
        playMusic = true;
    }
}

function endMusic() {
    if (!playMusic) {
        bgm.pause();
    }
}

restartBtnGood.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();

    setTimeout(() => {
        window.location.reload();
    }, 150);
});
restartBtnBad.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();

    setTimeout(() => {
        window.location.reload();
    }, 150);
});

ctrlsBtn.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
    controlsPopUp.style.display = "block";
    overlay.style.display = "block";
});


closeCtrlsBtn.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
    controlsPopUp.style.display = "none";
    overlay.style.display = "none";

});

gameCtrlsBtn.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
    controlsPopUp.style.display = "block";
    overlay.style.display = "block";
});



let gameEnded = false;
let updateSystem;

/*function endGame() {
    musicPlayer();
    gameEnded = true;
    startScreen.style.display = "none";   
    canvas.style.display = "none";
    endScreen.style.display = "flex";
}*/

// game start
async function startGame() {
    let elapsedTime = 0; // seconds
    const gameDuration = 5000; // end game after 60 seconds

    // Music player
    musicPlayer();
    
    // Initialize renderer
    const renderer = new LambertRenderer(canvas);
    await renderer.initialize();

    // Load GLTF
    const loader = new GLTFLoader();
    await loader.load(new URL('./assets/models/placeholder_scena/placeholder_scena1.gltf', import.meta.url));

    const scene = loader.loadScene();
    const camera = new Entity();
    camera.addComponent(new Transform({
        translation: [-2, 12, -20],
        rotation: [-0.0006866238545626402, 0.9767575263977051, 0.21432319283485413, 0.0031292226631194353],
    }));

    camera.addComponent(new Camera());
    //FirstPersonController-ja kamera ne uporablja več, lahko se uporablja za debugging
    //camera.addComponent(new FirstPersonController(camera, canvas));
    scene.push(camera);


    // Lights in the scene -> three (we can have max 4)

    // first light
    // const light = new Entity();
    // light.addComponent(new Light({
    //     color: [20/255, 200/255, 20/255], // lights are normalised so its works better?
    //     direction: [-50, 3, -5],
    //     blinking: false,
    //     baseColor: [20/255,0,200/255],
    // }));
    // scene.push(light);

    // second light
    const light2 = new Entity();
    light2.addComponent(new Light({
        color: [0, 20/255, 100/255], // convert to 0–1
        direction: [50, 10, -0.5],
        blinking: false,
        baseColor: [0, 220/255, 20/255],
        }));
    scene.push(light2);

    // third light, blinking
    const light3 = new Entity();
    light3.addComponent(new Light({
        color: [0/255, 100/255, 0/255],
        direction: [10, 40, -0.5],
        blinking: true,
        baseColor: [20/255, 20/255, 220/255]
    }));
    scene.push(light3);



    const loaderOBJ = new OBJLoader();
    const loaderImage = new ImageLoader();

    const characterMesh = await loaderOBJ.load(new URL('./assets/models/mc2.obj', import.meta.url));
    const characterTekstura = await loaderImage.load(new URL('./assets/models/tekstura.png', import.meta.url));
    const character = new Entity();
    character.addComponent(new Transform({
        translation: [0, 0, -5],
        scale: [0.3, 0.3, 0.3],
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
    character.addComponent(new Character());
    character.addComponent(new CharacterController(character, canvas, camera));
    scene.push(character);

    // console.log(character.components[1].primitives[0].mesh.vertices[0].position);

const kockaMesh = await loaderOBJ.load(new URL('./assets/models/kocka.obj', import.meta.url));
const kockaTekstura = await loaderImage.load(new URL('./assets/models/tekstura.png', import.meta.url));

const pickup = new Entity();
pickup.addComponent(new Transform({
    translation: [-20, 0, -5],
    scale: [0.5, 0.5, 0.5],
}));
pickup.addComponent(new Model({
    primitives: [
        new Primitive({
            mesh: kockaMesh,
            material: new Material({
                baseTexture: new Texture({
                    image: kockaTekstura,
                    sampler: new Sampler,
                })
            })
        })
    ],
    solid: false,
}));
pickup.addComponent(new Pickup())
pickup.aabb = {
    min: [-0.2, -0.2, -0.2],
    max: [0.2, 0.2, 0.2],
};
scene.push(pickup);

/*const kocka = new Entity();
kocka.addComponent(new Transform({
    translation: [-10, 0, -5],
}));
kocka.addComponent(new Model({
    primitives: [
        new Primitive({
            mesh: kockaMesh,
            material: new Material({
                baseTexture: new Texture({
                    image: kockaTekstura,
                    sampler: new Sampler,
                })
            })
        })
    ]
}));
kocka.aabb = {
    min: [-0.2, -0.2, -0.2],
    max: [0.2, 0.2, 0.2],
};
scene.push(kocka);*/

// Cirkev
const curchMesh = await loaderOBJ.load(new URL('./assets/models/curch3.obj', import.meta.url));
const curchTekstura = await loaderImage.load(new URL('./assets/models/tekstura.png', import.meta.url));

const curch = new Entity();
curch.addComponent(new Transform({
    translation: [5, 1, 2],  // dx - levo desno, y gor dol, z naprej nazaj
    scale: [2, 2, 2],

}));
curch.addComponent(new Model({
    primitives: [
        new Primitive({
            mesh: curchMesh,
            material: new Material({
                baseTexture: new Texture({
                    image: curchTekstura,
                    sampler: new Sampler,
                })
            })
        })
    ]
}));
curch.aabb = {
    min: [-0.2, -0.2, -0.2],
    max: [0.2, 0.2, 0.2],
};
scene.push(curch);

// Vodnjak
const wellMesh = await loaderOBJ.load(new URL('./assets/models/vodnjak.obj', import.meta.url));
const wellTekstura = await loaderImage.load(new URL('./assets/models/tekstura.png', import.meta.url));

const well = new Entity();
well.addComponent(new Transform({
    translation: [-25, 2, -3],
    scale: [2.5, 2.5, 2.5],

}));
well.addComponent(new Model({
    primitives: [
        new Primitive({
            mesh: wellMesh,
            material: new Material({
                baseTexture: new Texture({
                    image: wellTekstura,
                    sampler: new Sampler,
                })
            })
        })
    ]
}));
well.aabb = {
    min: [-0.2, -0.2, -0.2],
    max: [0.2, 0.2, 0.2],
};
scene.push(well);

// Tall bajta
const tallMesh = await loaderOBJ.load(new URL('./assets/models/tall2.obj', import.meta.url));
const tallTekstura = await loaderImage.load(new URL('./assets/models/tekstura.png', import.meta.url));

const tall = new Entity();
tall.addComponent(new Transform({
    translation: [-18, 3, 3],
    scale: [2.5, 2.5, 2.5],

}));
tall.addComponent(new Model({
    primitives: [
        new Primitive({
            mesh: tallMesh,
            material: new Material({
                baseTexture: new Texture({
                    image: tallTekstura,
                    sampler: new Sampler,
                })
            })
        })
    ]
}));
tall.aabb = {
    min: [-0.2, -0.2, -0.2],
    max: [0.2, 0.2, 0.2],
};
scene.push(tall);

//mini bajta
const miniMesh = await loaderOBJ.load(new URL('./assets/models/mini2.obj', import.meta.url));
const miniTekstura = await loaderImage.load(new URL('./assets/models/tekstura.png', import.meta.url));

const mini = new Entity();
mini.addComponent(new Transform({
    translation: [-4, 4, 4],
    scale: [3, 3, 3],

}));
mini.addComponent(new Model({
    primitives: [
        new Primitive({
            mesh: miniMesh,
            material: new Material({
                baseTexture: new Texture({
                    image: miniTekstura,
                    sampler: new Sampler,
                })
            })
        })
    ]
}));
mini.aabb = {
    min: [-0.2, -0.2, -0.2],
    max: [0.2, 0.2, 0.2],
};
scene.push(mini);




// bajta 
const bajtaMesh = await loaderOBJ.load(new URL('./assets/models/bajtica2.obj', import.meta.url));
const bajtaTekstura = await loaderImage.load(new URL('./assets/models/tekstura.png', import.meta.url));

const bajta = new Entity();
bajta.addComponent(new Transform({
    translation: [17, 2.5, 3], // x levo desno, gor dol, globina
    scale: [1.5, 1.5, 1.5],

}));
bajta.addComponent(new Model({
    primitives: [
        new Primitive({
            mesh: bajtaMesh,
            material: new Material({
                baseTexture: new Texture({
                    image: bajtaTekstura,
                    sampler: new Sampler,
                })
            })
        })
    ]
}));
bajta.aabb = {
    min: [-0.2, -0.2, -0.2],
    max: [0.2, 0.2, 0.2],
};
scene.push(bajta);


// Boardwalk 
const boardWalkMesh = await loaderOBJ.load(new URL('./assets/models/boardwalk.obj', import.meta.url));
const boardWalkTekstura = await loaderImage.load(new URL('./assets/models/tekstura.png', import.meta.url));

const boardwalk = new Entity();
boardwalk.addComponent(new Transform({
    translation: [10, 3, -3],
    scale: [4, 4, 4],

}));
boardwalk.addComponent(new Model({
    primitives: [
        new Primitive({
            mesh: boardWalkMesh,
            material: new Material({
                baseTexture: new Texture({
                    image: boardWalkTekstura,
                    sampler: new Sampler,
                })
            })
        })
    ]
}));
scene.push(boardwalk);

//Meje
const mejaTekstura = await loaderImage.load(new URL('./assets/models/mejatekstura.png', import.meta.url));
const meja = new Entity();
meja.addComponent(new Transform({
    translation: [0, -0.7, -8.5],
    scale: [50, 1, 1],
}));
meja.addComponent(new Model({
    primitives: [
        new Primitive({
            mesh: kockaMesh,
            material: new Material({
                baseTexture: new Texture({
                    image: mejaTekstura,
                    sampler: new Sampler,
                })
            })
        })
    ]
}));
meja.aabb = {
    min: [-0.2, -0.2, -0.2],
    max: [0.2, 0.2, 0.2],
};
scene.push(meja);


const physics = new Physics(scene);
for (const entity of scene) {
    const model = entity.getComponentOfType(Model);
    if (!model) {
        continue;
    }

    const boxes = model.primitives.map(primitive => calculateAxisAlignedBoundingBox(primitive.mesh));
    entity.aabb = mergeAxisAlignedBoundingBoxes(boxes);
}

    // Update loop
    function update(t, dt) {

        if (gameEnded) {
            updateSystem?.stop(); // stop update loop entirely
            return;
        }

        /*elapsedTime += dt;
        if (elapsedTime >= gameDuration) {
            endGame();
            return;
        }*/

        let shouldEndGame = window.hudManager.getEndGame();
        if (shouldEndGame > 0) {
            if (shouldEndGame == 1) {
                endGame1();
            } else if (shouldEndGame == 2) {
                endGame2();
            }
        }

        for (const entity of scene) {
            for (const component of entity.components) {
                component.update?.(t, dt);
            }

            const light = entity.getComponentOfType(Light);
            if (light?.blinking) { // this only defines color intensity, real math is in renderer
                const tSec = t / 1000; 
                const speed = 2; 
                const isOn = Math.sin(tSec * Math.PI * 2 * speed) > 0;
                const intensity = isOn ? 1 : 0.70;
                light.color = light.baseColor.map(c => c * intensity);
            }
        }
        physics.update(t, dt);
    }

    // Render loop
    function render() {
        if (!gameEnded) {
            renderer.render(scene, camera);
        }
    }

    // Resize handling
    function resize({ displaySize: { width, height }}) {
        camera.getComponentOfType(Camera).aspect = width / height;
    }

    updateSystem = new UpdateSystem({ update, render });
    new ResizeSystem({ canvas, resize }).start();
    updateSystem.start();

// ----------------------------------------------------------------------------------
// Begin dialogue at game start

    window.hudManager.setDialogueId(1);
    window.dialogueMaster.inputReader(1);
    

// ----------------------------------------------------------------------------------
// End Game

function endGame1() { // Good ending
    endMusic();
    gameEnded = true;
    startScreen.style.display = "none";   
    canvas.style.display = "none";
    endScreenGood.style.display = "flex";
}
function endGame2() { // Bad ending
    endMusic();
    gameEnded = true;
    startScreen.style.display = "none";   
    canvas.style.display = "none";
    endScreenBad.style.display = "flex";
}
}

