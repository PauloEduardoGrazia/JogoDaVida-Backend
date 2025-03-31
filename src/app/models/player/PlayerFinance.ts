import { IPlayerFinance } from "../../interfaces/player/IPlayerFinance";
import { Car } from "./Car";
import { House } from "./House";

export class PlayerFinance implements IPlayerFinance {
    private _playerCar: Car;
    private _playerHouse: House;
    private _wallet: number;
    private _debts: number;

    public constructor(playerCar: Car, playerHouse: House, wallet: number, debt: number) {
        this._playerCar = playerCar;
        this._playerHouse = playerHouse;
        this._wallet = wallet;
        this._debts = debt;
    }
    public get playerCar(): Car {
        return this._playerCar;
    }
    public set playerCar(value: Car) {
        this._playerCar = value;
    }
    public get playerHouse(): House {
        return this._playerHouse;
    }
    public set playerHouse(value: House) {
        this._playerHouse = value;
    }
    public get wallet(): number {
        return this._wallet;
    }
    public set wallet(value: number) {
        this._wallet = value;
    }
    public get debts(): number {
        return this._debts;
    }
    public set debts(value: number) {
        this._debts = value;
    }
}