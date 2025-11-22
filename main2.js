import { quat, mat4 } from './gl-matrix-module.js';
import { Transform } from './core/Transform.js';
import { Camera } from './core/Camera.js';
import { Node } from './core/Node.js';
import { getGlobalModelMatrix, getGlobalViewMatrix, getProjectionMatrix } from './core/SceneUtils.js';
import { ResizeSystem } from './systems/ResizeSystem.js';
import { UpdateSystem } from './systems/UpdateSystem.js';
import { BaseRenderer } from './renderers/BaseRenderer.js';
import { OBJLoader } from './loaders/OBJLoader.js';
import { GLTFLoader } from './loaders/GLTFLoader.js';




// poklices renderer, da inicializira webgpu
const canvas = document.querySelector('canvas'); // keep this
const renderer = new BaseRenderer(canvas);
await renderer.initialize(); // creates context, device, format internally

// Ustvari uniform buffer
const uniformBuffer = renderer.device.createBuffer({
    size: 16 * 4, // 4x4 matrika
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});

// // Ustvari uniform buffer za OBJ
// const objUniformBuffer = renderer.device.createBuffer({
//     size: 16 * 4,
//     usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
// });


// Depth texture
let depthTexture = renderer.device.createTexture({
    size: [canvas.width, canvas.height],
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
});

// Resize system
const resizeSystem = new ResizeSystem({
    canvas,
    resize: ({ canvasSize }) => {
        renderer.context.configure({ device: renderer.device, format: renderer.format, size: [canvasSize.width, canvasSize.height] });
        depthTexture = renderer.device.createTexture({
            size: [canvasSize.width, canvasSize.height],
            format: 'depth24plus',
            usage: GPUTextureUsage.RENDER_ATTACHMENT,
        });
    }
});

const mesh = {
    vertices: [
        { position: [-1,-1,-1,1], texcoords: [0,0] },
        { position: [-1,-1, 1,1], texcoords: [0,1] },
        { position: [-1, 1,-1,1], texcoords: [1,0] },
        { position: [-1, 1, 1,1], texcoords: [1,1] },
        { position: [ 1,-1,-1,1], texcoords: [0,0] },
        { position: [ 1,-1, 1,1], texcoords: [0,1] },
        { position: [ 1, 1,-1,1], texcoords: [1,0] },
        { position: [ 1, 1, 1,1], texcoords: [1,1] },
    ],
    indices: [
        0,1,2, 2,1,3,
        4,0,6, 6,0,2,
        5,4,7, 7,4,6,
        1,5,3, 3,5,7,
        6,2,7, 7,2,3,
        1,0,5, 5,0,4
    ]
};
// Vertex buffer layout
const vertexBufferLayout = {
    arrayStride: 24,
    attributes: [
        { shaderLocation: 0, offset: 0, format: 'float32x4', name: 'position' },
        { shaderLocation: 1, offset: 16, format: 'float32x2', name: 'texcoords' },
    ]
};

// Load texture
const imageBitmap = await fetch('./assets/images/image.png')
    .then(r => r.blob())
    .then(createImageBitmap);


// bufferji ampak kot mesh iz rendererja
const textureGPU = renderer.prepareImage(imageBitmap);
const samplerGPU = renderer.prepareSampler({
    minFilter: 'linear',
    magFilter: 'linear',
});

const meshGPU = renderer.prepareMesh(mesh, vertexBufferLayout);



const texture = renderer.device.createTexture({
    size: [imageBitmap.width, imageBitmap.height],
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_DST,
});
renderer.device.queue.copyExternalImageToTexture({ source: imageBitmap }, { texture }, [imageBitmap.width, imageBitmap.height]);

const sampler = renderer.device.createSampler({ minFilter: 'linear', magFilter: 'linear' });


// fetch shader
const shaderCode = await fetch('shader.wgsl').then(r => r.text());
const shaderModule = renderer.createShaderModule(shaderCode);


// Pipeline
const pipeline = renderer.device.createRenderPipeline({
    vertex: { module: shaderModule, entryPoint: 'vertex', buffers: [vertexBufferLayout] },
    fragment: { module: shaderModule, entryPoint: 'fragment', targets: [{ format: renderer.format }] },
    depthStencil: { depthWriteEnabled: true, depthCompare: 'less', format: 'depth24plus' },
    layout: 'auto',
});

// Bind group
const bindGroup = renderer.device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
        { binding: 0, resource: { buffer: uniformBuffer } },
        { binding: 1, resource: texture.createView() },
        { binding: 2, resource: sampler },
    ]
});


// // Bind group za OBJ
// const objBindGroup = renderer.device.createBindGroup({
//     layout: pipeline.getBindGroupLayout(0),
//     entries: [
//         { binding: 0, resource: { buffer: objUniformBuffer } },
//         { binding: 1, resource: texture.createView() },
//         { binding: 2, resource: sampler },
//     ]
// });

// Scene setup
const model = new Node();
model.addComponent(new Transform({ translation: [0, 0, -5] }));

model.addComponent({
    update() {
        const time = performance.now() / 1000;
        const transform = model.getComponentOfType(Transform);
        quat.identity(transform.rotation);
        quat.rotateX(transform.rotation, transform.rotation, time * 0.6);
        quat.rotateY(transform.rotation, transform.rotation, time * 0.7);
    }
});



const camera = new Node();
camera.addComponent(new Camera());
camera.addComponent(new Transform({ translation: [0,0,10] }));

const scene = new Node();
scene.addChild(model);
scene.addChild(camera);

// Application object for UpdateSystem
const app = {
    start() { resizeSystem.start(); },
    update(time, dt) {
        scene.traverse(node => node.components.forEach(c => c.update?.(time, dt)));

        // Cube matrika
        const cubeMatrix = mat4.create();
        mat4.multiply(cubeMatrix, getProjectionMatrix(camera), getGlobalViewMatrix(camera));
        mat4.multiply(cubeMatrix, cubeMatrix, getGlobalModelMatrix(model));
        renderer.device.queue.writeBuffer(uniformBuffer, 0, cubeMatrix);

        // // OBJ matrika
        // const objMatrix = mat4.create();
        // mat4.multiply(objMatrix, getProjectionMatrix(camera), getGlobalViewMatrix(camera));
        // mat4.multiply(objMatrix, objMatrix, getGlobalModelMatrix(objNode));
        // renderer.device.queue.writeBuffer(objUniformBuffer, 0, objMatrix);
    },
    render() {
        const encoder = renderer.device.createCommandEncoder();
        const pass = encoder.beginRenderPass({
            colorAttachments: [{
                view: renderer.context.getCurrentTexture().createView(),
                loadOp: 'clear',
                clearValue: [1, 0.75, 0.8, 1],
                storeOp: 'store'
            }],
            depthStencilAttachment: {
                view: depthTexture.createView(),
                depthClearValue: 1,
                depthLoadOp: 'clear',
                depthStoreOp: 'discard'
            }
        });

        pass.setPipeline(pipeline);

        // Nariši cube
        pass.setVertexBuffer(0, meshGPU.vertexBuffer);
        pass.setIndexBuffer(meshGPU.indexBuffer, 'uint32');
        pass.setBindGroup(0, bindGroup);
        pass.drawIndexed(mesh.indices.length);

        // // Nariši OBJ
        // pass.setVertexBuffer(0, objGPU.vertexBuffer);
        // pass.setIndexBuffer(objGPU.indexBuffer, 'uint32');
        // pass.setBindGroup(0, objBindGroup);
        // pass.drawIndexed(objMesh.indices.length);

        pass.end();
        renderer.device.queue.submit([encoder.finish()]);
    },
    stop() { resizeSystem.stop(); }
};


// // 1. Naloži OBJ model
// const loader = new OBJLoader();
// const objMesh = await loader.load('./assets/models/h3.obj');
// console.log(objMesh.vertices.length, objMesh.indices.length);


// // 2. Vertex layout za OBJ (če uporablja pozicijo in texcoords)
// const objVertexBufferLayout = {
//     arrayStride: 24,
//     attributes: [
//         { shaderLocation: 0, offset: 0, format: 'float32x4', name: 'position' },
//         { shaderLocation: 1, offset: 16, format: 'float32x2', name: 'texcoords' },
//     ]
// };

// // 3. Pripravi GPU bufferje
// const objGPU = renderer.prepareMesh(objMesh, objVertexBufferLayout);

// // 4. Ustvari Node za OBJ model in ga dodaj v sceno
// const objNode = new Node();
// objNode.addComponent(new Transform({ translation: [0, 0, 0] }));
// scene.addChild(objNode);



// Start UpdateSystem
const updateSystem = new UpdateSystem(app);
updateSystem.start();
