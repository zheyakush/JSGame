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
        new app.model.tank(
            'player1',
            {
                startPosition: { x: 1, y: 1.5 },
                color: 0xff8528
            }
        );

        // new app.model.tank(
        //     'player2',
        //     {
        //         startPosition: { x: 1, y: 2 },
        //         stepSize: null,
        //         color: 0x00ffec
        //     }
        // );

        var blocks = [
            { x: 2, y: 1 },
            { x: 2, y: 3 },
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
            new app.model.block('block-' + blocks[k].x + '-' + blocks[k].y, {
                startPosition: blocks[k]
            });
        }

        window.app = app;
        console.log(app.blockers);
    }
);
