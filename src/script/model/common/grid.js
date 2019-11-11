define(
    [
        'init',
        'three',
        './keyboard'
    ],
    function (app, THREE) {
        function Grid() {
            this.gridColor = app.config.GRID_COLOR ? parseInt(app.config.GRID_COLOR.replace(/^#/, ''), 16) : 0x505050;
            this.render();
        }

        Grid.prototype.render = function () {
            if (app.config.GRID_ENABLED) {
                var material = new THREE.LineBasicMaterial({color: this.gridColor});
                var countVerticalLines = Math.floor(app.config.SCENE_WIDTH / app.config.GRID_WIDTH);
                var geometry, line, k;
                for (k = 0; k < countVerticalLines; k++) {
                    geometry = new THREE.Geometry();
                    geometry.vertices.push(new THREE.Vector3(app.config.GRID_WIDTH * k, 0, 0));
                    geometry.vertices.push(new THREE.Vector3(app.config.GRID_WIDTH * k, app.config.SCENE_HEIGHT, 0));
                    line = new THREE.Line(geometry, material);
                    app.scene.add(line);
                }

                var countHorizontalLines = Math.floor(app.config.SCENE_HEIGHT / app.config.GRID_HEIGHT);
                for (k = 0; k < countHorizontalLines; k++) {
                    geometry = new THREE.Geometry();
                    geometry.vertices.push(new THREE.Vector3(0, app.config.GRID_HEIGHT * k, 0));
                    geometry.vertices.push(new THREE.Vector3(app.config.SCENE_WIDTH, app.config.GRID_HEIGHT * k, 0));
                    line = new THREE.Line(geometry, material);

                    app.scene.add(line);
                }
            }
        };

        Grid.prototype.getGridPosition = function (x, y) {
            return {
                x: x / app.config.GRID_WIDTH,
                y: y / app.config.GRID_HEIGHT
            };
        };

        Grid.prototype.getBlocker = function (sceneX, sceneY, w, h) {
            var player = {
                x: sceneX - w / 2,
                y: sceneY - h / 2,
                x1: sceneX + w / 2,
                y1: sceneY + h / 2
            };
            var res = Object.keys(app.blockers).find(function (id) {
                var blocker = app.blockers[id];
                return player.x1 > blocker.x && player.x < blocker.x1 && player.y1 > blocker.y && player.y < blocker.y1
            });

            return res;
        };

        Grid.prototype.isAvailableSpace = function (sceneX, sceneY, w, h) {
            return (typeof this.getBlocker.call(this, sceneX, sceneY, w, h) === 'undefined');
        };

        app.elements.grid = new Grid();

        return app.elements['grid'];
    }
);
