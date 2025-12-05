import { quat, mat4 } from './gl-matrix-module.js';
import { 
    Camera,
    Entity,
    Light,
 } from './core/core.js';

import { GLTFLoader } from './loaders/GLTFLoader.js';

import { ResizeSystem } from './systems/ResizeSystem.js';
import { UpdateSystem } from './systems/UpdateSystem.js';

import { UnlitRenderer } from './renderers/UnlitRenderer.js';
import { LambertRenderer } from './renderers/LambertRenderer.js';

import {showHUD, showDialogue, closeHUD} from './hud/showHUD.js'

// --- UI CONTROL -------------------------------------------------------------

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const canvas = document.querySelector("canvas");

// Hide canvas initially
canvas.style.display = "none";

// On click, hide menu and start the game
startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    canvas.style.display = "block";
    startGame();
});


// --- GAME START -------------------------------------------------------------

async function startGame() {

    // Initialize renderer
    const renderer = new LambertRenderer(canvas);
    await renderer.initialize();

    // Load GLTF
    const loader = new GLTFLoader();
    await loader.load(new URL('./assets/models/test-bajtica.gltf', import.meta.url));

    const scene = loader.loadScene();
    const camera = scene.find(entity => entity.getComponentOfType(Camera));

    // Add a light
    const light = new Entity();
    light.addComponent(new Light({}));
    scene.push(light);

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
}
