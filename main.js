import { quat, mat4 } from './gl-matrix-module.js';
import { Transform } from './core/Transform.js';
import { Camera } from './core/Camera.js';
import { Node } from './core/Node.js';
import { getGlobalModelMatrix, getGlobalViewMatrix, getProjectionMatrix } from './core/SceneUtils.js';
import { ResizeSystem } from './systems/ResizeSystem.js';
import { UpdateSystem } from './systems/UpdateSystem.js';
import { BaseRenderer } from './renderers/BaseRenderer.js';


// poklices renderer, da inicializira webgpu
const canvas = document.querySelector('canvas'); // keep this
const renderer = new BaseRenderer(canvas);
await renderer.initialize(); // creates context, device, format internally

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
        { position: [-1,-1,-1,1], uv: [0,0] },
        { position: [-1,-1, 1,1], uv: [0,1] },
        { position: [-1, 1,-1,1], uv: [1,0] },
        { position: [-1, 1, 1,1], uv: [1,1] },
        { position: [ 1,-1,-1,1], uv: [0,0] },
        { position: [ 1,-1, 1,1], uv: [0,1] },
        { position: [ 1, 1,-1,1], uv: [1,0] },
        { position: [ 1, 1, 1,1], uv: [1,1] },
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
        { shaderLocation: 0, offset: 0, format: 'float32x4' },
        { shaderLocation: 1, offset: 16, format: 'float32x2' },
    ]
};

// bufferji ampak kot mesh iz rendererja
const meshGPU = renderer.prepareMesh(mesh, vertexBufferLayout);
const textureGPU = renderer.prepareImage(imageBitmap);
const samplerGPU = renderer.prepareSampler({
    minFilter: 'linear',
    magFilter: 'linear',
});


// Load texture
const imageBitmap = await fetch('./assets/images/image.png')
    .then(r => r.blob())
    .then(createImageBitmap);

const texture = renderer.device.createTexture({
    size: [imageBitmap.width, imageBitmap.height],
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_DST,
});
renderer.device.queue.copyExternalImageToTexture({ source: imageBitmap }, { texture }, [imageBitmap.width, imageBitmap.height]);

const sampler = renderer.device.createSampler({ minFilter: 'linear', magFilter: 'linear' });

// Shader module
const shaderCode = await fetch('shader.wgsl').then(r => r.text());
const shaderModule = renderer.createShaderModule({ code: shaderCode });


// Pipeline
const pipeline = renderer.device.createRenderPipeline({
    vertex: { module: shaderModule, entryPoint: 'vertex', buffers: [vertexBufferLayout] },
    fragment: { module: shaderModule, entryPoint: 'fragment', targets: [{ format }] },
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

// Scene setup
const model = new Node();
model.addComponent(new Transform());
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
camera.addComponent(new Transform({ translation: [0,0,5] }));

const scene = new Node();
scene.addChild(model);
scene.addChild(camera);

// Application object for UpdateSystem
const app = {
    start() { resizeSystem.start(); },
    update(time, dt) {
        scene.traverse(node => node.components.forEach(c => c.update?.(time, dt)));
        const matrix = mat4.create();
        mat4.multiply(matrix, getProjectionMatrix(camera), getGlobalViewMatrix(camera));
        mat4.multiply(matrix, matrix, getGlobalModelMatrix(model));
        renderer.device.queue.writeBuffer(uniformBuffer, 0, matrix);
    },
    render() {
        const encoder = renderer.device.createCommandEncoder();
        const pass = encoder.beginRenderPass({
            colorAttachments: [{ view: context.getCurrentTexture().createView(), loadOp: 'clear', clearValue: [0.7,0.8,0.9,1], storeOp: 'store' }],
            depthStencilAttachment: { view: depthTexture.createView(), depthClearValue: 1, depthLoadOp: 'clear', depthStoreOp: 'discard' }
        });
        pass.setPipeline(pipeline);
        // pass.setVertexBuffer(0, vertexBuffer);
        // pass.setIndexBuffer(indexBuffer, 'uint32');
        pass.setVertexBuffer(0, meshGPU.vertexBuffer);
        pass.setIndexBuffer(meshGPU.indexBuffer, 'uint32');

        pass.setBindGroup(0, bindGroup);
        
        pass.drawIndexed(indices.length);
        pass.end();
        renderer.device.queue.submit([encoder.finish()]);
    },
    stop() { resizeSystem.stop(); }
};

// Start UpdateSystem
const updateSystem = new UpdateSystem(app);
updateSystem.start();
