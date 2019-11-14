define(
    [
        'app',
        'model/map/element/wallBase',
        'three'
    ],
    function (app, ModelWallBase, THREE) {
        function ModelConcreteWall(id, config) {
            this.health = 9999;
            ModelWallBase.call(this, id, config);
        }

        ModelConcreteWall.prototype = Object.create(ModelWallBase.prototype);
        app.model.concreteWall = ModelConcreteWall;

        ModelConcreteWall.prototype.createMaterial = function () {
            const loader = new THREE.TextureLoader();
            return new THREE.MeshBasicMaterial({
                map: loader.load('./img/concrete-wall.png'),
            });
        };

        return ModelConcreteWall;
    }
);
