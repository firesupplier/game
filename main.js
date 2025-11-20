import { quat, mat4 } from './gl-matrix-module.js';
import { Transform } from './Transform.js';
import { Camera } from './Camera.js';
import { Node } from './Node.js';
import {
    getGlobalModelMatrix,
    getGlobalViewMatrix,
    getProjectionMatrix,
} from './SceneUtils.js';

// Inicializacija (samo enkrat): 
// pridobiš adapter, device, konfiguriraš canvas, ustvariš shader module, ustvariš pipeline, ustvariš vertex bufferje, uniform bufferje, pripraviš teksture, podatke, like ...

// Game loop (vsak frame):
// posodobiš logiko (premik lika, fizika, animacije), napišeš GPU ukaze:, ustvariš commandEncoder, začneš renderPass, nastaviš pipeline, nastaviš vse bufferje (vertex, uniform …)
// pokličeš draw(), končaš renderPass, pošlješ ukaze GPU-ju, ponoviš naslednji frame

// 1. Inicializacija WebGPU (adapter, device, canvas)
// 2. Naložiš podatke (positions, colors, ...)
// 3. Ustvariš bufferje (positionBuffer, colorBuffer, ...)
// 4. Ustvariš shader module
// 5. bufferlayout
// 6. Ustvariš pipeline
// 7. Bind grupe
// 8. Inicializacija matrik
// 6. Game loop / render pass (update, render, frame)


// Initialize WebGPU
const adapter = await navigator.gpu.requestAdapter(); // poisce razpolozljiv gpu na racunalniku
const device = await adapter.requestDevice(); // ustvari device
const canvas = document.querySelector('canvas'); // iz html-ja dobimo canvas
const context = canvas.getContext('webgpu'); // kontekst za risanje s WebGPU
const format = navigator.gpu.getPreferredCanvasFormat();
context.configure({ device, format });


const vertices = new Float32Array([ // definirana so le unikatna oglisca - vertex buffer 
    // positions         // colors         // index
    -1, -1, -1,  1,      0,  0,  0,  1,    //   0
    -1, -1,  1,  1,      0,  0,  1,  1,    //   1
    -1,  1, -1,  1,      0,  1,  0,  1,    //   2
    -1,  1,  1,  1,      0,  1,  1,  1,    //   3
     1, -1, -1,  1,      1,  0,  0,  1,    //   4
     1, -1,  1,  1,      1,  0,  1,  1,    //   5
     1,  1, -1,  1,      1,  1,  0,  1,    //   6
     1,  1,  1,  1,      1,  1,  1,  1,    //   7
]);

const indices = new Uint32Array([ // indeksi vertexov, pove kateri vertexi se zdruzujejo v trikotnike, negre v buffer, ker ne doloca vsebino podatkov
    0, 1, 2,    2, 1, 3,
    4, 0, 6,    6, 0, 2,
    5, 4, 7,    7, 4, 6,
    1, 5, 3,    3, 5, 7,
    6, 2, 7,    7, 2, 3,
    1, 0, 5,    5, 0, 4,
]);
// BUFFER 
// GPU rise piksle, bere iz svojega pomnilnika GPU RAM, Buffer je: kos pomnilnika na GPU, kamor skopiraš podatke iz CPU, da jih GPU lahko hitro bere v shaderjih.
// GPU pomnilnik/buffer -prostor na GPU, kjer bodo shranjeni položaji oglišč, ki jih bo vertex shader bral

// buffer indeksov
const indexBuffer = device.createBuffer({
    size: indices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
});

device.queue.writeBuffer(indexBuffer, 0, indices);
// Moramo ga poklicati pred risanjem, sicer GPU še nima podatkov za vertex shader.


// buffer oglisc
const vertexBuffer = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST, 
});

device.queue.writeBuffer(vertexBuffer, 0, vertices); 

// buffer za uniforme
const uniformBuffer = device.createBuffer({
    size: 4 * 4 * 4,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST, // uporabljen kot uniforma, COPY_DST omogoča, da ga kasneje vsaki frame posodabljamo.
});

// globinska textura za pravilno risanje ploskev
const depthTexture = device.createTexture({ // ustvarjanje globinske slike, ureja prekrivanje ploskev
    size: [canvas.width, canvas.height],
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
});


// Fetch and compile shaders -> create moduls
const code = await fetch('shader.wgsl').then(response => response.text()); // dobimo shaderje iz .wgsl
const module = device.createShaderModule({ code }); // iz shaderjev ustvari modul, ki ga lahko pipeline uporabi

// Bufferlayout - pove cevovodu, kako so podatki (atributi) shranjeni v gpu bufferju
// opis medpomnilnika, ki vsebuje položaje oglišč in barv (2 atributa):

const vertexBufferLayout = {
    arrayStride: 32,
    attributes: [
        {
            shaderLocation: 0,
            offset: 0,
            format: 'float32x4',
        },
        {
            shaderLocation: 1,
            offset: 16,
            format: 'float32x4',
        },
    ],
};


// Create the pipeline - pove kako procesiramo vrstice in pixle
// pipeline ustvaris samo enkrat, saj se ustvari samo enkrat ob inicializaciji programa, je staticna konfiguracija shaderjev
// klices ga pa usak frame
const pipeline = device.createRenderPipeline({
    vertex: {
        module,
        buffers: [vertexBufferLayout],

    },
    fragment: {
        module,
        entryPoint: 'fragment',
        targets: [{ format }],
    },
    depthStencil: { // globinska slika
        depthWriteEnabled: true,
        depthCompare: 'less',
        format: 'depth24plus',
    },
    layout: 'auto',
});

// Create matrix buffer
const matrixBuffer = device.createBuffer({
    size: 16 * 4,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});

// Ustvarjanje bind grupe
const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
        { binding: 0, resource: uniformBuffer },
    ]
});

// ustvarimo sceno
const model = new Node();
model.addComponent(new Transform());
model.addComponent({
    update() {
        const time = performance.now() / 1000;
        const transform = model.getComponentOfType(Transform);
        const rotation = transform.rotation;

        quat.identity(rotation);
        quat.rotateX(rotation, rotation, time * 0.6);
        quat.rotateY(rotation, rotation, time * 0.7);
    }
});

const camera = new Node();
camera.addComponent(new Camera());
camera.addComponent(new Transform({
    translation: [0, 0, 5]
}));

const scene = new Node();
scene.addChild(model);
scene.addChild(camera);



function update() { //za posodabljanje 60x na sec
    // user input, animations, AI ...
    // posodobi uniform buffer, premike, transformacije ...
    scene.traverse(node => { // tako posodobimo vse objekte scene naenkrat, tako da klicemo njihove lastne update funkcije
        for (const component of node.components) {
            component.update?.();
        }
    });
}

function render() {
    const modelMatrix = getGlobalModelMatrix(model);
    const viewMatrix = getGlobalViewMatrix(camera);
    const projectionMatrix = getProjectionMatrix(camera);

    // Upload the transformation matrix
    const matrix = mat4.create();
    mat4.multiply(matrix, modelMatrix, matrix);
    mat4.multiply(matrix, viewMatrix, matrix);
    mat4.multiply(matrix, projectionMatrix, matrix);

    device.queue.writeBuffer(uniformBuffer, 0, matrix);


    // clear the canvas, izris
    // Ustvarimo commandEncoder in renderPass **vsaki frame**
    const commandEncoder = device.createCommandEncoder(); // objekt v katerega zapisujemo ukaze
    const renderPass = commandEncoder.beginRenderPass({ // zacne fazo risanja (render pass), klice se za vsak frame znova
        colorAttachments: [{
            view: context.getCurrentTexture().createView(), // dobi trenutno tekturo 
            loadOp: 'clear', // pobrise platno
            clearValue: [0.7, 0.8, 0.9, 1], // barva ciscenja / ozadje
            storeOp: 'store', // shrani rezultat renderja v texturo
        }],
        depthStencilAttachment: {
            view: depthTexture.createView(),
            depthClearValue: 1,
            depthLoadOp: 'clear',
            depthStoreOp: 'discard',
        },
    });

    renderPass.setPipeline(pipeline); // kateri pipeline se uporablja 
    renderPass.setBindGroup(0, bindGroup);
    renderPass.setVertexBuffer(0, vertexBuffer); // kateri buffer gre v katero lokacijo shaderja, stevilke v zgornji kodi se nanašajo na seznam medpomnilnikov v opisu cevovoda
    renderPass.setIndexBuffer(indexBuffer, 'uint32');
    renderPass.drawIndexed(indices.length);
    renderPass.end();
    device.queue.submit([commandEncoder.finish()]); // doda ukaz v encoder in caka na izris

}


function frame() {
    update();
    render();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame); // poklice frame pred vsakim osvezevanjem zaslona

