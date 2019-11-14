define(
    [
        'three',
        'app'
    ],
    function (THREE, app) {
        function ModelBase(id, config) {
            // General setting
            this.id = this.id ? this.id : (id ? id : Math.random().toString(36).substring(7));
            this.width = this.width || app.config.GRID_WIDTH;
            this.height = this.height || app.config.GRID_HEIGHT;
            this.offsetHeight = 1 * (this.height / 2).toFixed(2);
            this.offsetWidth = 1 * (this.width / 2).toFixed(2);

            this.createElement(config);
        }

        ModelBase.prototype.createElement = function (config) {
            var startPosition = config.startPosition;
            this.geometry = new THREE.BoxGeometry(this.width, this.height);
            this.material = this.createMaterial();
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            this.position = {
                x: startPosition.x,
                y: startPosition.y
            };

            var scenePosition = this.getScenePosition(config);
            this.mesh.position.x = scenePosition.x;
            this.mesh.position.y = scenePosition.y;

            app.scene.add(this.mesh);
            app.elements[this.id] = this;
        };

        ModelBase.prototype.getScenePosition = function (config) {
            var startPosition = config.startPosition;
            return {
                x: startPosition.x > 0 ? app.config.GRID_WIDTH * startPosition.x - this.offsetWidth : this.offsetWidth,
                y: startPosition.y > 0 ? app.config.GRID_HEIGHT * startPosition.y - this.offsetHeight : this.offsetHeight
            }
        };

        ModelBase.prototype.createMaterial = function (config) {
            var color = parseInt(app.config.MODEL_BASE_COLOR.replace(/^#/, ''), 16);
            if (config && Object.keys(config).length && config.color) {
                color = config.color;
            }
            return new THREE.MeshBasicMaterial({ color: color });
        };

        ModelBase.prototype.remove = function () {
            app.scene.remove(app.elements[this.id].mesh);
            delete app.elements[this.id];

            return this;
        };

        return ModelBase;
    }
);
