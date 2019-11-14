define(['lodash', 'app'], function (_, app) {
    app.keyBinding = app.keyBinding || {};

    function KeyboardController(keys) {
        // Lookup of key codes to timer ID, or null for no repeat
        //
        app.keyBinding = _.merge(app.keyBinding, keys);
        var timers = {};
        var repeat = app.config.FRAME_LOOP;

        // When key is pressed and we don't already think it's pressed, call the
        // key action callback and set a timer to generate another one after a delay
        //
        document.onkeydown = function (event) {
            var key = (event || window.event).keyCode;
            if (!(key in app.keyBinding)) {
                return true;
            }
            if (!(key in timers)) {
                timers[key] = null;
                app.keyBinding[key].callback();
                if (repeat !== 0 && app.keyBinding[key].hasOwnProperty('speed') && app.keyBinding[key].speed) {
                    if (app.keyBinding[key].hasOwnProperty('speed') && app.keyBinding[key].speed) {
                        repeat = app.keyBinding[key].speed;
                    }
                    timers[key] = setInterval(app.keyBinding[key].callback, repeat);
                }
            }
            return false;
        };

        // Cancel timeout and mark key as released on keyup
        //
        document.onkeyup = function (event) {
            var key = (event || window.event).keyCode;
            if (key in timers) {
                if (timers[key] !== null) {
                    clearInterval(timers[key]);
                }
                delete timers[key];
            }
        };

        // When window is unfocused we may not get key events. To prevent this
        // causing a key to 'get stuck down', cancel all held keys
        //
        window.onblur = function () {
            for (var key in timers) {
                if (timers.hasOwnProperty(key) && timers[key] !== null) {
                    clearInterval(timers[key]);
                }
            }
            timers = {};
        };
    }

    return KeyboardController;
});
