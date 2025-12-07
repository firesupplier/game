export default class ObjLoader2 {
    constructor() {
        this.vertices = [];
        this.normals = [];
        this.textureCoords = [];
        this.faces = [];
        this.facesMaterialsIndex = [{ materialName: null, materialStartIndex: 0 }];
        this.materials = [];
    }

    async load(objUrl, mtlUrl) {
        // Load OBJ
        const objText = await fetch(objUrl).then(r => r.text());
        objText.split('\n').forEach(line => this.parseObj(line));

        // Load MTL
        if (mtlUrl) {
            const mtlText = await fetch(mtlUrl).then(r => r.text());
            let currentMat = {};
            mtlText.split('\n').forEach(line => currentMat = this.parseMtl(line, currentMat));
            if (currentMat.name) this.materials.push(currentMat);
        }

        return {
            vertices: this.vertices,
            normals: this.normals,
            textureCoords: this.textureCoords,
            faces: this.faces,
            facesMaterialsIndex: this.facesMaterialsIndex,
            materials: this.materials
        };
    }

    parseObj(line) {
        const commentStart = line.indexOf('#');
        if (commentStart !== -1) line = line.substring(0, commentStart);
        line = line.trim();
        if (!line) return;

        const splitedLine = line.split(/\s+/);

        if (splitedLine[0] === 'v') {
            this.vertices.push(splitedLine.slice(1).map(Number));
        } else if (splitedLine[0] === 'vt') {
            this.textureCoords.push(splitedLine.slice(1).map(Number));
        } else if (splitedLine[0] === 'vn') {
            this.normals.push(splitedLine.slice(1).map(Number));
        } else if (splitedLine[0] === 'f') {
            const face = { indices: [], texture: [], normal: [] };
            for (let i = 1; i < splitedLine.length; i++) {
                const dIndex = splitedLine[i].indexOf('//');
                const parts = splitedLine[i].split(/\W+/);
                if (dIndex > 0) {
                    face.indices.push(parts[0]);
                    face.normal.push(parts[1]);
                } else if (parts.length === 2) {
                    face.indices.push(parts[0]);
                    face.texture.push(parts[1]);
                } else if (parts.length === 3) {
                    face.indices.push(parts[0]);
                    face.texture.push(parts[1]);
                    face.normal.push(parts[2]);
                } else {
                    face.indices.push(parts[0]);
                }
            }
            this.faces.push(face);
        } else if (splitedLine[0] === 'usemtl') {
            const materialName = splitedLine[1];
            const materialStartIndex = this.faces.length;
            this.facesMaterialsIndex.push({ materialName, materialStartIndex });
        }
    }

    parseMtl(line, currentMat) {
        const commentStart = line.indexOf('#');
        if (commentStart !== -1) line = line.substring(0, commentStart);
        line = line.trim();
        if (!line) return currentMat;

        const parts = line.split(/\s+/);
        switch (parts[0]) {
            case 'newmtl':
                if (currentMat.name) this.materials.push(currentMat);
                currentMat = { name: parts[1] };
                break;
            case 'Ka':
                currentMat.ambient = parts.slice(1, 4).map(Number);
                break;
            case 'Kd':
                currentMat.diffuse = parts.slice(1, 4).map(Number);
                break;
            case 'Ks':
                currentMat.specular = parts.slice(1, 4).map(Number);
                break;
            case 'Ns':
                currentMat.specularExponent = Number(parts[1]);
                break;
            case 'd':
            case 'Tr':
                currentMat.transparent = Number(parts[1]);
                break;
            case 'illum':
                currentMat.illumMode = Number(parts[1]);
                break;
            case 'map_Ka':
                currentMat.ambientMap = parts[1];
                break;
            case 'map_Kd':
                currentMat.diffuseMap = parts[1];
                break;
            case 'map_Ks':
                currentMat.specularMap = parts[1];
                break;
            case 'map_d':
                currentMat.alphaMat = parts[1];
                break;
            case 'map_bump':
            case 'bump':
                currentMat.bumpMap = parts[1];
                break;
            case 'disp':
                currentMat.displacementMap = parts[1];
                break;
        }
        return currentMat;
    }
}
