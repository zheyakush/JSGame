define(
    [
        '../app',
        'three',
        './keyboard'
    ],
    function (app, THREE, keyboardController) {
        function ModelBase(id, startPosition, speed, options) {
            this.id = id;
            this.width = app.config.MODEL_BASE_WIDTH;
            this.height = app.config.MODEL_BASE_HEIGHT;
            this.x = speed && speed.x ? speed.x : app.config.MODEL_BASE_WIDTH;
            this.y = speed && speed.y ? speed.y : app.config.MODEL_BASE_HEIGHT;

            this.offsetHeight = 1 * (this.height / 2).toFixed(2);
            this.offsetWidth = 1 * (this.width / 2).toFixed(2);

            this.geometry = new THREE.BoxGeometry(this.width, this.height);
            var color = parseInt(app.config.MODEL_BASE_COLOR.replace(/^#/, ''), 16);
            if (options && Object.keys(options).length && options.color) {
                color = options.color;
            }
            this.material = new THREE.MeshBasicMaterial({ color: color });
            this.mesh = new THREE.Mesh(this.geometry, this.material);

            this.mesh.position.x = startPosition.x > 0 ? app.config.MODEL_BASE_WIDTH * startPosition.x - this.offsetWidth  : this.offsetWidth;
            this.mesh.position.y = startPosition.y > 0 ? app.config.MODEL_BASE_HEIGHT * startPosition.y - this.offsetHeight  : this.offsetHeight;

            app.scene.add(this.mesh);
            app.elements[this.id] = this;

            this.initEvents();
        }

        ModelBase.prototype.initEvents = function () {
            var player1 = app.elements['player1'];
            var player2 = app.elements['player2'];
            keyboardController({
                65: function () {
                    player2.left();
                },
                87: function () {
                    player2.top();
                },
                68: function () {
                    player2.right();
                },
                83: function () {
                    player2.bottom();
                },
                37: function () {
                    player1.left();
                },
                38: function () {
                    player1.top();
                },
                39: function () {
                    player1.right();
                },
                40: function () {
                    player1.bottom();
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
