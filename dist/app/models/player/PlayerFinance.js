"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerFinance = void 0;
class PlayerFinance {
    constructor(playerCar, playerHouse, wallet, debt) {
        this._playerCar = playerCar;
        this._playerHouse = playerHouse;
        this._wallet = wallet;
        this._debts = debt;
    }
    get playerCar() {
        return this._playerCar;
    }
    set playerCar(value) {
        this._playerCar = value;
    }
    get playerHouse() {
        return this._playerHouse;
    }
    set playerHouse(value) {
        this._playerHouse = value;
    }
    get wallet() {
        return this._wallet;
    }
    set wallet(value) {
        this._wallet = value;
    }
    get debts() {
        return this._debts;
    }
    set debts(value) {
        this._debts = value;
    }
}
exports.PlayerFinance = PlayerFinance;
