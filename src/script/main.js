requirejs.config({
    baseUrl: './script/',
    catchError: false,
    nodeRequire: require,
    paths: {
        jquery: '../../node_modules/jquery/dist/jquery',
        three: '../../node_modules/three/build/three',
        text: '../../node_modules/requirejs-plugins/lib/text',
        json: '../../node_modules/requirejs-plugins/src/json'
    },
    shim: {
        three: {
            exports: 'THREE'
        },
    }
});

requirejs(
    [
        'init'
    ],
    function (app) {
        new app.model.car('active', { x: 0, y: 0 }, { x: 2, y: 2 });
        new app.model.car(2, { x: 500, y: 500 });
    }
);
