"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(name, space, work, playerStatus, playerFinance) {
        this._name = name;
        this._space = space;
        this._work = work;
        this._playerStatus = playerStatus;
        this._playerFinance = playerFinance;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get space() {
        return this._space;
    }
    set space(value) {
        this._space = value;
    }
    get work() {
        return this._work;
    }
    set work(value) {
        this._work = value;
    }
    get playerStatus() {
        return this._playerStatus;
    }
    set playerStatus(value) {
        this._playerStatus = value;
    }
    get playerFinance() {
        return this._playerFinance;
    }
    set playerFinance(value) {
        this._playerFinance = value;
    }
}
exports.Player = Player;
