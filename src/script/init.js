define([
    'three',
    'app',
    'model/car',
], function (THREE, app) {
    initApp();
    animate();

    function initCamera() {
        // Camera: Y up, X right, Z up
        app.camera = new THREE.OrthographicCamera(app.config.SCENE_LEFT, app.config.SCENE_WIDTH, app.config.SCENE_TOP, app.config.SCENE_HEIGHT, app.config.SCENE_NEAR, app.config.SCENE_FAR);
        app.camera.position.set(0, 0, 1);
    }

    function initApp() {
        initCamera();
        //  Set up some parameters
        var canvasWidth = window.innerWidth / 2;
        var canvasHeight = window.innerHeight * 0.985;
        // scene
        app.scene = new THREE.Scene();
        app.renderer = new THREE.WebGLRenderer({ antialias: true });
        app.renderer.setSize(canvasWidth, canvasHeight);
        document.getElementById('root').appendChild(app.renderer.domElement);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        app.renderer.render(app.scene, app.camera);
    }

    return app;
});
