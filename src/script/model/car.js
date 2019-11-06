define(['app', './base'], function (app, modelBase) {
    function modelCar(id, startPosition, speed, options) {
        modelBase.call(this, id, startPosition, speed, options)
    }
    modelCar.prototype = Object.create(modelBase.prototype);
    app.model.car = modelCar;

    return modelCar;
});
