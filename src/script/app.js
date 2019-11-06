define([
    'json!config.json',
], function (config) {
    return {
        elements: {},
        model: {},
        scene: null,
        camera: null,
        renderer: null,
        config: config
    };
});
