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
        'init',
        'model/grid'
    ],
    function (app) {
        new app.model.car('player1', { x: 0, y: 1 }, null, { color: 0xFF8528 });
        new app.model.car('player2', { x: 0, y: 2 }, null, { color: 0x00ffec });
        new app.model.car(2, { x: 5, y: 5 });
    }
);
