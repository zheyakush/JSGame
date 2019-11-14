define(
    [
        'three',
        'app',
        'model/character/tank',
        'model/character/bullet1'
    ],
    function (THREE, app, ModelBase) {
        function ModelBotTank(id, config) {

            ModelBase.call(this, id, config);
            this.setDirection('right');
            this.shot();
        }

        ModelBotTank.prototype = Object.create(ModelBase.prototype);
        app.model.bot1 = ModelBotTank;


        ModelBotTank.prototype.shot = function () {
            var self = this;
            this.shotInterval = setInterval(function () {
                ModelBase.prototype.shot.call(self)
            }, 650);
        };

        ModelBotTank.prototype.remove = function () {
            clearInterval(this.shotInterval);
            ModelBase.prototype.remove.call(this);
        };


        return ModelBotTank;
    }
);
