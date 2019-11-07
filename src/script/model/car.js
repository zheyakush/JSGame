define(['app', './base',
    'three',], function (app, modelBase, THREE) {
    function modelCar(id, startPosition, speed, options) {
        modelBase.call(this, id, startPosition, speed, options);
        const loader = new THREE.TextureLoader();
        this.material = new THREE.MeshBasicMaterial({
            map: loader.load('./img/tank1.png'),
        });
        this.mesh.material = this.material;
    }
    modelCar.prototype = Object.create(modelBase.prototype);
    app.model.car = modelCar;

    return modelCar;
});
