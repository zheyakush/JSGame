define(
    [
        'app',
        'model/map/element/wallBase',
        'three'
    ],
    function (app, ModelWallBase, THREE) {
        function ModelBrickWall(id, config) {
            this.health = 1;
            ModelWallBase.call(this, id, config);
        }

        ModelBrickWall.prototype = Object.create(ModelWallBase.prototype);
        app.model.brickWall = ModelBrickWall;

        ModelBrickWall.prototype.createMaterial = function () {
            const loader = new THREE.TextureLoader();
            return new THREE.MeshBasicMaterial({
                map: loader.load('./img/brick-wall.jpg'),
            });
        };

        return ModelBrickWall;
    }
);
