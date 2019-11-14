define(
    [
        'three',
        'app',
        'model/character/bulletBase'
    ],
    function (THREE, app, ModelBase) {
        app.bullet = {};

        function ModelBullet(config) {
            this.damage = 1;
            ModelBase.call(this, config);
        }

        ModelBullet.prototype = Object.create(ModelBase.prototype);
        app.model.bullet1 = ModelBullet;

        return ModelBullet;
    }
);
