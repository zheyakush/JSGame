define(
    [
        '../init',
        'three',
        './keyboard'
    ],
    function (app, THREE) {
        if (app.config.GRID_ENABLED) {
            var material = new THREE.LineBasicMaterial({ color: 0x505050 });
            var countVerticalLines = Math.floor(app.config.SCENE_WIDTH / app.config.MODEL_BASE_WIDTH);
            var geometry, line, k;
            for (k = 0; k < countVerticalLines; k++) {
                geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3(app.config.MODEL_BASE_WIDTH * k, 0, 0));
                geometry.vertices.push(new THREE.Vector3(app.config.MODEL_BASE_WIDTH * k, app.config.SCENE_HEIGHT, 0));
                line = new THREE.Line(geometry, material);
                app.scene.add(line);
            }

            var countHorizontalLines = Math.floor(app.config.SCENE_HEIGHT / app.config.MODEL_BASE_HEIGHT);
            for (k = 0; k < countHorizontalLines; k++) {
                geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3(0, app.config.MODEL_BASE_HEIGHT * k, 0));
                geometry.vertices.push(new THREE.Vector3(app.config.SCENE_WIDTH, app.config.MODEL_BASE_HEIGHT * k, 0));
                line = new THREE.Line(geometry, material);

                app.scene.add(line);
            }
        }
        return app;
    }
);
