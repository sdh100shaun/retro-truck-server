"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Truck = /** @class */ (function () {
    function Truck(id, type, _owner) {
        this.id = id;
        this.type = type;
        this._owner = _owner;
    }
    Object.defineProperty(Truck.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * save
     */
    Truck.prototype.save = function () { };
    return Truck;
}());
exports.Truck = Truck;
