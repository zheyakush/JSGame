define(
    [
        '../init',
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
                var material = new THREE.LineBasicMaterial({ color: this.gridColor });
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
                x: ((x + app.config.GRID_WIDTH) / app.config.GRID_WIDTH),
                y: ((y + app.config.GRID_HEIGHT) / app.config.GRID_HEIGHT)
            };
        };

        Grid.prototype.isAvailableSpace = function (sceneX, sceneY, w, h) {
            var corners = [
                this.getGridPosition(sceneX - w / 2, sceneY - h / 2), // leftTop
                this.getGridPosition(sceneX - w / 2, sceneY + h / 2), // leftBottom
                this.getGridPosition(sceneX + w / 2, sceneY - h / 2), // rightTop
                this.getGridPosition(sceneX + w / 2, sceneY + h / 2)  // rightBottom
            ];
            console.log(corners);
            return corners.every(function (coordinates) {
                if (Object.keys(app.blockers.x).indexOf(Math.floor(coordinates.x).toString()) === -1) {
                    return true;
                } else if (app.blockers.x[Math.floor(coordinates.x)].indexOf(Math.floor(coordinates.y)) === -1) {
                    return true;
                }
                return false;
            });
        };

        app.elements['grid'] = new Grid();

        return app.elements['grid'];
    }
);
