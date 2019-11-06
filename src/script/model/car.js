define(['app', './base'], function (app, modelBase) {
    function modelCar(id, startPosition, speed) {
        modelBase.call(this, id, startPosition, speed)
    }
    modelCar.prototype = Object.create(modelBase.prototype);
    app.model.car = modelCar;

    return modelCar;
});
