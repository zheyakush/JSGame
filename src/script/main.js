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
        new app.model.car('player1', { x: 0, y: 1 }, { x: 10, y: 10 }, { color: 0xFF8528 });
        new app.model.car('player2', { x: 0, y: 2 }, null, { color: 0x00ffec });

        var blocks = [
            { x: 5, y: 5 },
            { x: 5, y: 6 },
            { x: 5, y: 7 },
            { x: 5, y: 8 },
            { x: 5, y: 9 },
            { x: 6, y: 7 },
            { x: 7, y: 7 },
            { x: 8, y: 7 },

            { x: 10, y: 7 },
            { x: 11, y: 7 },
            { x: 12, y: 7 },
            { x: 13, y: 7 },
            { x: 13, y: 5 },
            { x: 13, y: 6 },
            { x: 13, y: 9 },
            { x: 13, y: 8 },

            { x: 15, y: 5 },
            { x: 15, y: 6 },
            { x: 15, y: 7 },
            { x: 15, y: 8 },
            { x: 15, y: 9 },
            { x: 16, y: 7 },
            { x: 17, y: 7 },
            { x: 18, y: 7 }
        ];
        for (var k = 0; k < blocks.length; k++) {
            new app.model.block('block', blocks[k]);
        }
    }
);
