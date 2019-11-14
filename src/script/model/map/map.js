define(
    [
        'app',
        './element/brickWall',
        './element/concreteWall'
    ],
    function (app) {
        function ModelMap(mapName) {
            requirejs(['json!./config/map/' + mapName + '.json'], function (map) {
                var blocks = map.blocks;
                for (var k = 0; k < blocks.length; k++) {
                    var type = blocks[k].hasOwnProperty('type') ? blocks[k].type : 'brick';
                    switch (type) {
                        case 'concrete':
                            new app.model.concreteWall('block-' + blocks[k].x + '-' + blocks[k].y, {
                                startPosition: blocks[k]
                            });
                            break;
                        case 'brick':
                        default:
                            new app.model.brickWall('block-' + blocks[k].x + '-' + blocks[k].y, {
                                startPosition: blocks[k]
                            });
                            break;
                    }
                }
            });
        }

        app.model.map = ModelMap;

        return ModelMap;
    }
);
