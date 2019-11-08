define(
    [
        'app',
        './base',
        'three'
    ],
    function (app, modelBase, THREE) {
        function ModelBlock(id, config) {
            this.isBlocker = true;
            modelBase.call(this, id, config);
        }

        ModelBlock.prototype = Object.create(modelBase.prototype);
        app.model.block = ModelBlock;

        ModelBlock.prototype.createMaterial = function (config) {
            const loader = new THREE.TextureLoader();
            return new THREE.MeshBasicMaterial({
                map: loader.load('./img/brick9.jpg'),
            });
        };

        return ModelBlock;
    }
);
