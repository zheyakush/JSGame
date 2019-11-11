define(
    [
        'three',
        'app',
        'model/base'
    ],
    function (THREE, app, ModelBase) {
        app.bullet = {};

        function ModelBullet(config) {
            this.id = Math.random().toString(36).substring(7);
            app.bullet[this.id] = {};
            this.width = 10;
            this.height = 10;
            this.direction = config.direction;
            ModelBase.call(this, this.id, {
                startPosition: config.startPosition
            });
        }

        ModelBullet.prototype = Object.create(ModelBase.prototype);
        app.model.bullet = ModelBullet;

        ModelBullet.prototype.getScenePosition = function (config) {
            return {
                x: this.position.x,
                y: this.position.y
            }
        };

        ModelBullet.prototype.remove = function () {
            ModelBase.prototype.remove.call(this);
            clearInterval(app.bullet[this.id].interval);
            delete app.bullet[this.id];
        };

        ModelBullet.prototype.move = function () {
            var self = this;
            var go = function () {
                var step = 5;
                var blocker;
                switch (this.direction) {
                    case 'left':
                        this.mesh.position.x -= step;
                        blocker = app.elements.grid.getBlocker(this.mesh.position.x, this.mesh.position.y, this.width, this.height);
                        if (this.mesh.position.x <= 0 || typeof blocker !== 'undefined') {
                            if (blocker) {
                                app.elements[blocker].remove();
                            }
                            this.remove();
                        }
                        break;
                    case 'right':
                        this.mesh.position.x += step;
                        blocker = app.elements.grid.getBlocker(this.mesh.position.x, this.mesh.position.y, this.width, this.height);
                        if (this.mesh.position.x >= app.config.SCENE_WIDTH || typeof blocker !== 'undefined') {
                            if (blocker) {
                                app.elements[blocker].remove();
                            }
                            this.remove();
                        }
                        break;
                    case 'top':
                        this.mesh.position.y -= step;
                        blocker = app.elements.grid.getBlocker(this.mesh.position.x, this.mesh.position.y, this.width, this.height);
                        if (this.mesh.position.y <= 0 || typeof blocker !== 'undefined') {
                            if (blocker) {
                                app.elements[blocker].remove();
                            }
                            this.remove();
                        }
                        break;
                    case 'bottom':
                        this.mesh.position.y += step;
                        blocker = app.elements.grid.getBlocker(this.mesh.position.x, this.mesh.position.y, this.width, this.height);
                        if (this.mesh.position.y >= app.config.SCENE_HEIGHT || typeof blocker !== 'undefined') {
                            if (blocker) {
                                app.elements[blocker].remove();
                            }
                            this.remove();
                        }
                        break;
                }
            };
            app.bullet[self.id].interval = setInterval(function () {
                go.call(self)
            }, 10);
        };

        return ModelBullet;
    }
);
