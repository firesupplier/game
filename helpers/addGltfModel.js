async function addGLTFModel(scene, url, position = [0,0,0], scale = [1,1,1], rotation = [0,0,0,1]) {
    const loader = new GLTFLoader();
    await loader.load(url);
    const gltfScene = loader.loadScene(); // array of entities from GLTF

    // Add each entity from the GLTF to your main scene
    for (const entity of gltfScene) {
        const transform = entity.getComponentOfType(Transform);
        if (transform) {
            transform.translation = position;
            transform.scale = scale;
            transform.rotation = rotation;
        }
        scene.push(entity);
    }
}
