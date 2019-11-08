define(['app', './vehicle',
    'three',], function (app, modelVehicle, THREE) {
    function modelTank(id, config) {
        modelVehicle.call(this, id, config);

        // const loader = new THREE.TextureLoader();
        // this.material = new THREE.MeshBasicMaterial({
        //     map: loader.load('./img/tank1.png'),
        // });
        // this.mesh.material = this.material;
    }

    modelTank.prototype = Object.create(modelVehicle.prototype);
    app.model.tank = modelTank;

    return modelTank;
});
