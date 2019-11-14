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
    packages : [{
        name : "lodash",
        location : "../../node_modules/lodash",
        main : "lodash.min"
    }],
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
            app.config.PLAYER_1.ID,
            {
                startPosition: { x: 5, y: 15 },
                color: 0xff8528
            }
        );

        // new app.model.tank(
        //     app.config.PLAYER_2.ID,
        //     {
        //         startPosition: { x: 11, y: 15 },
        //         color: 0xff8528
        //     }
        // );

        // new app.model.bot1(
        //     null,
        //     {
        //         startPosition: { x: 1, y: 15 }
        //     }
        // );

        new app.model.map('map2');
        window.app = app;
    }
);
