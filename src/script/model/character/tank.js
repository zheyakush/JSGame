define(
    [
        'three',
        'app',
        './vehicle',
        './bullet1'
    ],
    function (THREE, app, modelVehicle, bullet) {
        function ModelTank(id, config) {
            modelVehicle.call(this, id, config);

            const loader = new THREE.TextureLoader();
            this.material = new THREE.MeshBasicMaterial({
                map: loader.load('./img/tank1.png'),
            });
            this.mesh.material = this.material;
        }

        ModelTank.prototype = Object.create(modelVehicle.prototype);
        app.model.tank = ModelTank;

        ModelTank.prototype.keyboardEvents = function () {
            modelVehicle.prototype.keyboardEvents.call(this);

            var player1 = app.elements['player1'];
            this.keyboardMap[32] = {
                speed: 0,
                callback: function () {
                    player1.shot();
                }
            }
        };

        ModelTank.prototype.shot = function () {
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

            this.b = new bullet({
                direction: this.direction,
                startPosition: {
                    x: x,
                    y: y
                }
            });
            this.b.move();
        };

        return ModelTank;
    }
);
