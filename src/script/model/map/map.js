define(
    [
        'app',
        './element/block'
    ],
    function (app) {
        function ModelMap(mapName) {
            requirejs(['json!./config/map/' + mapName + '.json'], function (map) {
                var blocks = map.blocks;
                for (var k = 0; k < blocks.length; k++) {
                    new app.model.block('block-' + blocks[k].x + '-' + blocks[k].y, {
                        startPosition: blocks[k]
                    });
                }
            });
        }

        app.model.map = ModelMap;

        return ModelMap;
    }
);
