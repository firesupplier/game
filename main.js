import { quat, mat4 } from './gl-matrix-module.js';
import { Camera } from './core/core.js';

import { GLTFLoader } from './loaders/GLTFLoader.js';

import { ResizeSystem } from './systems/ResizeSystem.js';
import { UpdateSystem } from './systems/UpdateSystem.js';

import { UnlitRenderer } from './renderers/UnlitRenderer.js';

const loader = new GLTFLoader();
await loader.load(new URL('./assets/models/monkey/monkey.gltf', import.meta.url));

const scene = loader.loadScene();
const camera = scene.find(entity => entity.getComponentOfType(Camera));

const canvas = document.querySelector('canvas');
const renderer = new UnlitRenderer(canvas);
await renderer.initialize();

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

