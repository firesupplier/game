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

const canvas = document.querySelector('canvas');
//const renderer = new UnlitRenderer(canvas);
const renderer = new LambertRenderer(canvas);
await renderer.initialize();

const loader = new GLTFLoader();
await loader.load(new URL('./assets/models/test-bajtica.gltf', import.meta.url));

const scene = loader.loadScene();
const camera = scene.find(entity => entity.getComponentOfType(Camera));

const light = new Entity();
light.addComponent(new Light({
    //color: [255, 255, 0],
    //direction: [5, 1, -0.5],
}));
scene.push(light);

function update(t, dt) {
    for (const entity of scene) {
        for (const component of entity.components) {
            component.update?.(t, dt);
        }
    }
}

function render() {
    renderer.render(scene, camera);
}

function resize({ displaySize: { width, height }}) {
    camera.getComponentOfType(Camera).aspect = width / height;
}

new ResizeSystem({ canvas, resize }).start();
new UpdateSystem({ update, render }).start();

