"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerStatus = void 0;
class PlayerStatus {
    constructor(chooseUniversity, playerCar, isMarried, childrenCount, insurances) {
        this._chooseUniversity = chooseUniversity;
        this._isMarried = isMarried;
        this._childrenCount = childrenCount;
        this._insurances = insurances;
    }
    get chooseUniversity() {
        return this._chooseUniversity;
    }
    set chooseUniversity(value) {
        this._chooseUniversity = value;
    }
    get isMarried() {
        return this._isMarried;
    }
    set isMarried(value) {
        this._isMarried = value;
    }
    get childrenCount() {
        return this._childrenCount;
    }
    set childrenCount(value) {
        this._childrenCount = value;
    }
    get insurances() {
        return this._insurances;
    }
    set insurances(value) {
        this._insurances = value;
    }
}
exports.PlayerStatus = PlayerStatus;
