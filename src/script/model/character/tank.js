define(
    [
        'three',
        'app',
        'model/character/vehicleBase',
        'model/character/bullet1'
    ],
    function (THREE, app, modelVehicle, bullet) {
        function ModelTank(id, config) {
            this.id = id;
            modelVehicle.call(this, id, config);

            const loader = new THREE.TextureLoader();
            this.material = new THREE.MeshBasicMaterial({
                map: loader.load('./img/tank1.png'),
            });
            this.mesh.material = this.material;
        }

        ModelTank.prototype = Object.create(modelVehicle.prototype);
        app.model.tank = ModelTank;

        ModelTank.prototype.keyBinding = function () {
            modelVehicle.prototype.keyBinding.call(this);

            var player = app.elements.hasOwnProperty(this.id) && app.elements[this.id] ? app.elements[this.id] : null;
            if (player && app.config.hasOwnProperty(this.id)) {
                this.keyboardMap[app.config[this.id].FIRE] = {
                    speed: 0,
                    callback: function () {
                        player.shot();
                    }
                }
            }
        };

        ModelTank.prototype.shot = function () {
            var bulletObj = new bullet({
                direction: this.direction,
                startPosition: this.getFrontPosition()
            });
            bulletObj.move();
        };

        ModelTank.prototype.remove = function () {
            var player = app.elements.hasOwnProperty(this.id) && app.elements[this.id] ? app.elements[this.id] : null;
            if (player && app.config.hasOwnProperty(this.id)) {
                this.keyboardMap[app.config[this.id].FIRE] = {
                    speed: 0,
                    callback: function () {}
                }
            }
            modelVehicle.prototype.initKeyboardController.call(this);
            modelVehicle.prototype.remove.call(this);
        };

        return ModelTank;
    }
);
