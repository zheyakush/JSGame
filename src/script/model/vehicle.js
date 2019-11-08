define(
    [
        'app',
        'three',
        './base',
        './keyboard'
    ],
    function (app, THREE, modelBase, keyboardController) {
        function ModelVehicle(id, config) {
            modelBase.call(this, id, config);

            this.stepX = config.stepSize && config.stepSize.x ? config.stepSize.x : app.config.GRID_WIDTH / 10;
            this.stepY = config.stepSize && config.stepSize.y ? config.stepSize.y : app.config.GRID_HEIGHT / 10;

            this.keyboardEvents();
        }

        ModelVehicle.prototype = Object.create(modelBase.prototype);

        ModelVehicle.prototype.keyboardEvents = function () {
            var player1 = app.elements['player1'];
            var player2 = app.elements['player2'];
            var speed1 = 50;
            var speed2 = 10;
            keyboardController({
                65: {
                    speed: speed2,
                    callback: function () {
                        player2.left();
                    }
                },
                87: {
                    speed: speed2,
                    callback: function () {
                        player2.top();
                    }
                },
                68: {
                    speed: speed2,
                    callback: function () {
                        player2.right();
                    }
                },
                83: {
                    speed: speed2,
                    callback: function () {
                        player2.bottom();
                    }
                },
                37: {
                    speed: speed1,
                    callback: function () {
                        player1.left();
                    }
                },
                38: {
                    speed: speed1,
                    callback: function () {
                        player1.top();
                    }
                },
                39: {
                    speed: speed1,
                    callback: function () {
                        player1.right();
                    }
                },
                40: {
                    speed: speed1,
                    callback: function () {
                        player1.bottom();
                    }
                }
            });
        };

        ModelVehicle.prototype.left = function () {
            this.mesh.rotation.z = Math.PI / 2;
            if (app.config.SCENE_LEFT < (this.mesh.position.x - this.offsetWidth)) {
                var newSceneCoordinate = this.mesh.position.x - this.stepX;
                if (app.elements.grid.isAvailableSpace(newSceneCoordinate, this.mesh.position.y, this.width, this.height)) {
                    this.mesh.position.x = newSceneCoordinate;
                    // this.position = gridPos;
                }
            }
        };

        ModelVehicle.prototype.right = function () {
            this.mesh.rotation.z = Math.PI / -2;
            if (app.config.SCENE_WIDTH > (this.mesh.position.x + this.offsetWidth)) {
                var newSceneCoordinate = this.mesh.position.x + this.stepX;
                if (app.elements.grid.isAvailableSpace(newSceneCoordinate, this.mesh.position.y, this.width, this.height)) {
                    this.mesh.position.x = newSceneCoordinate;
                    // this.position = gridPos;
                }
            }
        };

        ModelVehicle.prototype.top = function () {
            this.mesh.rotation.z = Math.PI;
            if (app.config.SCENE_TOP < (this.mesh.position.y - this.offsetHeight)) {
                var newSceneCoordinate = this.mesh.position.y - this.stepY;
                if (app.elements.grid.isAvailableSpace(newSceneCoordinate, this.mesh.position.y, this.width, this.height)) {
                    this.mesh.position.x = newSceneCoordinate;
                    // this.position = gridPos;
                }
            }
        };

        ModelVehicle.prototype.bottom = function () {
            this.mesh.rotation.z = 0;
            if (app.config.SCENE_WIDTH > (this.mesh.position.y + this.offsetHeight)) {
                var newSceneCoordinate = this.mesh.position.y + this.stepY;
                if (app.elements.grid.isAvailableSpace(newSceneCoordinate, this.mesh.position.y, this.width, this.height)) {
                    this.mesh.position.x = newSceneCoordinate;
                    // this.position = gridPos;
                }
            }
        };

        ModelVehicle.prototype.remove = function () {
            app.scene.remove(app.elements[this.id].mesh);
            delete app.elements[this.id];
        };


        return ModelVehicle;
    }
);
