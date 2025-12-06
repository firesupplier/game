// Vertex shader 
// Dela na vsakem ogliscu, Običajno prejme položaj, barvo, normalo, UV … njegova naloga je:
// izračunati končni položaj oglišča na zaslonu,
// podatke, ki jih bo potreboval fragment shader, posredovati naprej.
// Vertex shader obdeluje GEOMETRIJO (točke trikotnikov).

// vertex input - podatki, ki pridejo iz GPU vertex bufferja v vertex shader
// vertex output - podatki, ki jih vertex shader poslje v fragment shader


// Fragment shader
// Dela na vsakem pikslu, ki ga ustvari trikotnik.
// Prejme podatke, ki jih je vertex shader poslal (interpolirane).
// Odloči, kakšna bo barva tega piksla.
// Fragment shader obarva PIXLE, ki sestavijo trikotnik.

// fragment input - vertex output, ki ga gpu interpolira med ogl
// fragmet output - koncna barva piksla 

// Uniform za translacijo
//@group(0) @binding(0) var<uniform> translation: vec2f; //skupini 0 in ji določili številko vezave 0. 
@group(0) @binding(0) var<uniform> matrix: mat4x4f; // translacija z matriko 
@group(0) @binding(1) var baseTexture: texture_2d<f32>;
@group(0) @binding(2) var baseSampler: sampler;



const positions = array<vec2f, 3>(
    vec2(-0.5, -0.5),
    vec2( 0.5, -0.5),
    vec2( 0.0,  0.5),
);

const colors = array<vec4f, 3>(
    vec4(1, 0, 0, 1),
    vec4(0, 1, 0, 1),
    vec4(0, 0, 1, 1),
);

// struct VertexInput {
//     // Shader je postal preprost in čist: prebere podatke iz bufferja, pozicionira oglišče.

//     @location(0) position: vec4f, // lokacija, kjer se v bufferju nahaja barva, glej obliko atributa! , kot prvih 8 bajtov je pozicija
//     @location(1) color: vec4f, // drugih 8 bajtov je barva
// }

struct VertexInput {
    @location(0) position: vec4f,
    @location(1) texcoords: vec2f,
    @location(2) normal: vec3f,

}

struct VertexOutput {
    @builtin(position) position: vec4f,
    @location(1) texcoords: vec2f,
}

struct FragmentInput {
    @location(1) texcoords: vec2f,
}

struct FragmentOutput {
    @location(0) color: vec4f, // note, the output location is in no way related to the interpolant location
}

@vertex
fn vertex(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    //output.position = vec4(input.position, 0, 1); // vzame pozicijo in jo spremeni v 4D vektor [x,y,z,w]
    //output.position = matrix * vec4(input.position, 0, 1); // prispejemo translacijo
    output.position = matrix * input.position;
    output.texcoords = input.texcoords;

    return output; // poslje fragmet shaderju v pravi obliki
}

@fragment
fn fragment(input: FragmentInput) -> FragmentOutput {
    var output: FragmentOutput;

    //output.color = input.color;
    output.color = textureSample(baseTexture, baseSampler, input.texcoords);
    // Pri tem sporočimo teksturo, ki jo želimo vzorčiti, vzorčevalnik, ki ga želimo pri tem uporabiti, in teksturne koordinate, ki določajo položaj vzorca v teksturnem prostoru. 


    return output;
}
