define([
    'json!./config/app.json',
], function (config) {
    return {
        elements: {},
        model: {},
        scene: null,
        camera: null,
        renderer: null,
        blockers: [],
        config: config
    };
});
