define(
    [
        '../app',
        'three',
        './keyboard'
    ],
    function (app, THREE, keyboardController) {
        function ModelBase(id, startPosition, speed) {
            this.id = id;
            this.width = app.config.MODEL_BASE_WIDTH;
            this.height = app.config.MODEL_BASE_HEIGHT;
            this.x = speed && speed.x ? speed.x : 0;
            this.y = speed && speed.y ? speed.y : 0;
            this.offsetHeight = 1 * (this.height / 2).toFixed(2);
            this.offsetWidth = 1 * (this.width / 2).toFixed(2);

            this.geometry = new THREE.BoxGeometry(this.width, this.height);
            this.material = new THREE.MeshBasicMaterial({ color: 0x00ffec });
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            this.mesh.position.x = startPosition.x || this.offsetWidth;
            this.mesh.position.y = startPosition.y || this.offsetHeight;

            app.scene.add(this.mesh);
            app.elements[this.id] = this;

            this.initEvents();
        }

        ModelBase.prototype.initEvents = function () {
            var activeElement = app.elements['active'];
            keyboardController({
                37: function () {
                    activeElement.left();
                },
                38: function () {
                    activeElement.top();
                },
                39: function () {
                    activeElement.right();
                },
                40: function () {
                    activeElement.bottom();
                }
            });
        };

        ModelBase.prototype.left = function () {
            if (app.config.SCENE_LEFT < (this.mesh.position.x - this.offsetWidth)) {
                this.mesh.position.x -= this.x;
            }
        };

        ModelBase.prototype.right = function () {
            if (app.config.SCENE_WIDTH > (this.mesh.position.x + this.offsetWidth)) {
                this.mesh.position.x += this.x;
            }
        };

        ModelBase.prototype.top = function () {
            if (app.config.SCENE_TOP < (this.mesh.position.y - this.offsetHeight)) {
                this.mesh.position.y -= this.y;
            }
        };

        ModelBase.prototype.bottom = function () {
            if (app.config.SCENE_WIDTH > (this.mesh.position.y + this.offsetHeight)) {
                this.mesh.position.y += this.y;
            }
        };

        ModelBase.prototype.remove = function () {
            app.scene.remove(app.elements[this.id].mesh);
            delete app.elements[this.id];
        };

        return ModelBase;
    }
);
