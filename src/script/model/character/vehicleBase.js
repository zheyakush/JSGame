define(
    [
        'app',
        'three',
        'model/base',
        'model/common/keyboard'
    ],
    function (app, THREE, modelBase, keyboardController) {
        function ModelVehicle(id, config) {
            modelBase.call(this, id, config);

            this.stepX = config.stepSize && config.stepSize.x ? config.stepSize.x : app.config.GRID_WIDTH / 10;
            this.stepY = config.stepSize && config.stepSize.y ? config.stepSize.y : app.config.GRID_HEIGHT / 10;

            this.setDirection('top');
            this.keyBinding();
            this.initKeyboardController();
        }

        ModelVehicle.prototype = Object.create(modelBase.prototype);

        ModelVehicle.prototype.keyBinding = function () {
            var player = app.elements.hasOwnProperty(this.id) && app.elements[this.id] ? app.elements[this.id] : null;
            if (player && app.config.hasOwnProperty(this.id)) {
                this.keyboardMap = this.keyboardMap || {};
                this.keyboardMap[app.config[this.id].LEFT] = {
                    speed: app.config[this.id].SPEED,
                    callback: function () {
                        player.left();
                    }
                };
                this.keyboardMap[app.config[this.id].TOP] = {
                    speed: app.config[this.id].SPEED,
                    callback: function () {
                        player.top();
                    }
                };
                this.keyboardMap[app.config[this.id].RIGHT] = {
                    speed: app.config[this.id].SPEED,
                    callback: function () {
                        player.right();
                    }
                };
                this.keyboardMap[app.config[this.id].BOTTOM] = {
                    speed: app.config[this.id].SPEED,
                    callback: function () {
                        player.bottom();
                    }
                };
            }

            return this;
        };

        ModelVehicle.prototype.initKeyboardController = function () {
            keyboardController(this.keyboardMap);

            return this;
        };

        ModelVehicle.prototype.setDirection = function (direction) {
            switch (direction) {
                case 'left':
                    this.direction = 'left';
                    this.mesh.rotation.z = Math.PI / 2;
                    break;
                case 'right':
                    this.direction = 'right';
                    this.mesh.rotation.z = Math.PI / -2;
                    break;
                case 'top':
                    this.direction = 'top';
                    this.mesh.rotation.z = Math.PI;
                    break;
                case 'bottom':
                    this.direction = 'bottom';
                    this.mesh.rotation.z = 0;
                    break;
            }

            return this;
        };

        ModelVehicle.prototype.getFrontPosition = function () {
            var x = this.mesh.position.x;
            var y = this.mesh.position.y;
            switch (this.direction) {
                case 'left':
                    x = this.mesh.position.x - this.offsetWidth;
                    break;
                case 'right':
                    x = this.mesh.position.x + this.offsetWidth;
                    break;
                case 'top':
                    y = this.mesh.position.y - this.offsetHeight;
                    break;
                case 'bottom':
                    y = this.mesh.position.y + this.offsetHeight;
                    break;
            }

            return {
                x: x,
                y: y
            }
        };

        ModelVehicle.prototype.moveTo = function (position) {
            if (position && position.hasOwnProperty('x') && position.hasOwnProperty('y') && position.x && position.y) {
                if (app.elements.grid.isAvailableSpace(position.x, position.y, this.width, this.height)) {
                    this.mesh.position.x = parseInt(position.x, 10);
                    this.mesh.position.y = parseInt(position.y, 10);
                    this.position = app.elements.grid.getGridPosition(position.x, position.y);
                }
            }

            return this;
        };

        ModelVehicle.prototype.left = function () {
            this.setDirection('left');
            if (app.config.SCENE_LEFT < (this.mesh.position.x - this.offsetWidth)) {
                var newSceneCoordinate = this.mesh.position.x - this.stepX;
                this.moveTo({ x: newSceneCoordinate, y: this.mesh.position.y });
            }

            return this;
        };

        ModelVehicle.prototype.right = function () {
            this.setDirection('right');
            if (app.config.SCENE_WIDTH > (this.mesh.position.x + this.offsetWidth)) {
                var newSceneCoordinate = this.mesh.position.x + this.stepX;
                this.moveTo({ x: newSceneCoordinate, y: this.mesh.position.y });
            }

            return this;
        };

        ModelVehicle.prototype.top = function () {
            this.setDirection('top');
            if (app.config.SCENE_TOP < (this.mesh.position.y - this.offsetHeight)) {
                var newSceneCoordinate = this.mesh.position.y - this.stepY;
                this.moveTo({ x: this.mesh.position.x, y: newSceneCoordinate });
            }

            return this;
        };

        ModelVehicle.prototype.bottom = function () {
            this.setDirection('bottom');
            if (app.config.SCENE_WIDTH > (this.mesh.position.y + this.offsetHeight)) {
                var newSceneCoordinate = this.mesh.position.y + this.stepY;
                this.moveTo({ x: this.mesh.position.x, y: newSceneCoordinate });
            }

            return this;
        };

        return ModelVehicle;
    }
);
