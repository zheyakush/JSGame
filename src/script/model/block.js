define(['app', './base',
    'three',], function (app, modelBase, THREE) {
    function modelBlock(id, startPosition, speed, options) {
        modelBase.call(this, id, startPosition, speed, options);
        const loader = new THREE.TextureLoader();
        this.material = new THREE.MeshBasicMaterial({
            map: loader.load('./img/brick9.jpg'),
        });
        this.mesh.material = this.material;
    }
    modelBlock.prototype = Object.create(modelBase.prototype);
    app.model.block = modelBlock;

    return modelBlock;
});
