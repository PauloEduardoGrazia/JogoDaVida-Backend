"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.House = void 0;
class House {
    constructor(name, price) {
        this._name = name;
        this._price = price;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
}
exports.House = House;
