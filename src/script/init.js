define([
    'three',
    'app',
    'model/car',
    'model/block'
], function (THREE, app) {
    app.config.SCENE_WIDTH = Math.floor(app.config.SCENE_WIDTH / app.config.MODEL_BASE_WIDTH) * app.config.MODEL_BASE_WIDTH;
    app.config.SCENE_HEIGHT = Math.floor(app.config.SCENE_HEIGHT / app.config.MODEL_BASE_HEIGHT) * app.config.MODEL_BASE_HEIGHT;

    var initCamera = function () {
        // Camera: Y up, X right, Z up
        app.camera = new THREE.OrthographicCamera(
            app.config.SCENE_LEFT,
            app.config.SCENE_WIDTH,
            app.config.SCENE_TOP,
            app.config.SCENE_HEIGHT,
            app.config.SCENE_NEAR,
            app.config.SCENE_FAR
        );
        app.camera.position.set(0, 0, 1);
    };

    var initApp = function () {
        initCamera();
        // scene
        app.scene = new THREE.Scene();
        app.renderer = new THREE.WebGLRenderer({ antialias: true });
        app.renderer.setSize(app.config.SCENE_WIDTH, app.config.SCENE_HEIGHT);
        document.getElementById('root').appendChild(app.renderer.domElement);
    };

    var render = function () {
        app.renderer.render(app.scene, app.camera);
    };

    var animate = function () {
        requestAnimationFrame(animate);
        render();
    };

    initApp();
    animate();

    return app;
});
