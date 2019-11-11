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
        'model/common/grid'
    ],
    function (app) {
        new app.model.tank(
            'player1',
            {
                startPosition: { x: 5, y: 15 },
                color: 0xff8528
            }
        );
        new app.model.map('map1');

        // new app.model.tank(
        //     'player2',
        //     {
        //         startPosition: { x: 1, y: 2 },
        //         stepSize: null,
        //         color: 0x00ffec
        //     }
        // );

        window.app = app;
    }
);
