import { Mesh } from '../core/Mesh.js';
import { Primitive } from '../core/Primitive.js';
import { Material } from '../core/Material.js';
import { vec3 } from '../gl-matrix-module.js';

// Returns a cube primitive ready to attach to a model
export function createCube(device, size = 1, material = null) {
    const half = size / 2;

    const positions = new Float32Array([
        -half, -half, -half,
         half, -half, -half,
         half,  half, -half,
        -half,  half, -half,
        -half, -half,  half,
         half, -half,  half,
         half,  half,  half,
        -half,  half,  half,
    ]);

    const indices = new Uint32Array([
        0,1,2, 0,2,3,
        4,5,6, 4,6,7,
        0,4,7, 0,7,3,
        1,5,6, 1,6,2,
        3,2,6, 3,6,7,
        0,1,5, 0,5,4,
    ]);

    const uvs = new Float32Array([
        0,0, 1,0, 1,1, 0,1,
        0,0, 1,0, 1,1, 0,1,
    ]);

    const geometry = { positions, indices, uvs };

    const mesh = new Mesh(device, geometry);
    if (!material) material = new Material({ baseTexture: null });

    return new Primitive({ mesh, material });
}