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
            this.damage = this.damage || 50;
            this.step = this.step || 6;
            this.direction = config.direction;
            ModelBase.call(this, this.id, {
                startPosition: config.startPosition
            });
        }

        ModelBullet.prototype = Object.create(ModelBase.prototype);

        ModelBullet.prototype.getScenePosition = function () {
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

        ModelBullet.prototype.blockCollision = function () {
            var blocker = app.elements.grid.getBlocker(this.mesh.position.x, this.mesh.position.y, this.width, this.height);
            if (typeof blocker !== 'undefined') {
                var deltaHealth = app.blockers[blocker].health - this.damage;
                if (deltaHealth <= 0) {
                    if (blocker) {
                        app.elements[blocker].remove();
                    }
                } else {
                    app.blockers[blocker].health = deltaHealth;
                }
                this.remove();
            }
        };

        ModelBullet.prototype.move = function () {
            var self = this;
            var go = function () {
                switch (this.direction) {
                    case 'left':
                        this.mesh.position.x -= this.step;
                        ModelBullet.prototype.blockCollision.call(self);
                        if (this.mesh.position.x <= 0) {
                            this.remove();
                        }
                        break;
                    case 'right':
                        this.mesh.position.x += this.step;
                        ModelBullet.prototype.blockCollision.call(self);
                        if (this.mesh.position.x >= app.config.SCENE_WIDTH) {
                            this.remove();
                        }
                        break;
                    case 'top':
                        this.mesh.position.y -= this.step;
                        ModelBullet.prototype.blockCollision.call(self);
                        if (this.mesh.position.y <= 0) {
                            this.remove();
                        }
                        break;
                    case 'bottom':
                        this.mesh.position.y += this.step;
                        ModelBullet.prototype.blockCollision.call(self);
                        if (this.mesh.position.y >= app.config.SCENE_HEIGHT) {
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
