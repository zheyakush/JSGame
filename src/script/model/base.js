define(
    [
        'three',
        '../app'
    ],
    function (THREE, app) {
        function ModelBase(id, config) {
            // General setting
            this.id = id;
            this.width = app.config.GRID_WIDTH;
            this.height = app.config.GRID_HEIGHT;
            this.offsetHeight = 1 * (this.height / 2).toFixed(2);
            this.offsetWidth = 1 * (this.width / 2).toFixed(2);

            this.isBlocker = this.isBlocker || false;
            this.helth = 100;
            this.armor = 10;
            this.createElement(config);

            if (this.isBlocker) {
                app.blockers.x[this.position.x] = app.blockers.x[this.position.x] || [];
                app.blockers.x[this.position.x].push(this.position.y);
                app.blockers.y[this.position.y] = app.blockers.y[this.position.y] || [];
                app.blockers.y[this.position.y].push(this.position.x);
            }
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
            this.mesh.position.x = startPosition.x > 0 ? app.config.GRID_WIDTH * startPosition.x - this.offsetWidth : this.offsetWidth;
            this.mesh.position.y = startPosition.y > 0 ? app.config.GRID_HEIGHT * startPosition.y - this.offsetHeight : this.offsetHeight;

            app.scene.add(this.mesh);
            app.elements[this.id] = this;
        };

        ModelBase.prototype.createMaterial = function (config) {
            var color = parseInt(app.config.MODEL_BASE_COLOR.replace(/^#/, ''), 16);
            if (config && Object.keys(config).length && config.color) {
                color = config.color;
            }
            return new THREE.MeshBasicMaterial({ color: color });
        };

        return ModelBase;
    }
);
