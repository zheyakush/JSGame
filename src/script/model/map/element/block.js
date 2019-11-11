define(
    [
        'app',
        'model/base',
        'three'
    ],
    function (app, modelBase, THREE) {
        function ModelBlock(id, config) {
            this.isBlocker = true;
            modelBase.call(this, id, config);

            if (this.isBlocker) {
                app.blockers = app.blockers || {};
                app.blockers[this.id] = {
                    x: this.mesh.position.x - this.offsetWidth,
                    y: this.mesh.position.y - this.offsetHeight,
                    x1: this.mesh.position.x + this.offsetWidth,
                    y1: this.mesh.position.y + this.offsetHeight
                };
            }
        }

        ModelBlock.prototype = Object.create(modelBase.prototype);
        app.model.block = ModelBlock;



        ModelBlock.prototype.createMaterial = function () {
            const loader = new THREE.TextureLoader();
            return new THREE.MeshBasicMaterial({
                map: loader.load('./img/brick9.jpg'),
            });
        };

        ModelBlock.prototype.remove = function () {
            modelBase.prototype.remove.call(this);

            if (this.isBlocker) {
                delete app.blockers[this.id];
            }
        };


        return ModelBlock;
    }
);
