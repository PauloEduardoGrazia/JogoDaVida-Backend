"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Work = void 0;
class Work {
    constructor(id, name, wageValue) {
        this._id = id;
        this._name = name;
        this._wageValue = wageValue;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get wageValue() {
        return this._wageValue;
    }
    set wageValue(value) {
        this._wageValue = value;
    }
}
exports.Work = Work;
