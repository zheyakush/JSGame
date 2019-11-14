define(
    [
        'app',
        'model/base',
        'three'
    ],
    function (app, modelBase, THREE) {
        function ModelWallBase(id, config) {
            this.isBlocker = this.isBlocker || true;
            this.health = this.health || 100;
            modelBase.call(this, id, config);

            if (this.isBlocker) {
                app.blockers = app.blockers || {};
                app.blockers[this.id] = {
                    health: this.health,
                    position: {
                        x: this.mesh.position.x - this.offsetWidth,
                        y: this.mesh.position.y - this.offsetHeight,
                        x1: this.mesh.position.x + this.offsetWidth,
                        y1: this.mesh.position.y + this.offsetHeight
                    }
                };
            }
        }

        ModelWallBase.prototype = Object.create(modelBase.prototype);
        app.model.block = ModelWallBase;

        ModelWallBase.prototype.remove = function () {
            modelBase.prototype.remove.call(this);

            if (this.isBlocker) {
                delete app.blockers[this.id];
            }
        };

        return ModelWallBase;
    }
);
