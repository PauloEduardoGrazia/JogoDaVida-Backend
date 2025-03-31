import { IPlayerStatus } from "../../interfaces/player/IPlayerStatus";
import { Car } from "./Car";
import { Insurance } from "./Insurance";

export class PlayerStatus implements IPlayerStatus {
    private _chooseUniversity: boolean;
    private _isMarried: boolean;
    private _childrenCount: number;
    private _insurances: Insurance[];

    public constructor(chooseUniversity: boolean, playerCar: Car, isMarried: boolean, childrenCount: number, insurances: Insurance[]){
        this._chooseUniversity = chooseUniversity;
        this._isMarried = isMarried;
        this._childrenCount = childrenCount;
        this._insurances = insurances;
    }
    public get chooseUniversity(): boolean {
        return this._chooseUniversity;
    }
    public set chooseUniversity(value: boolean) {
        this._chooseUniversity = value;
    }
    public get isMarried(): boolean {
        return this._isMarried;
    }
    public set isMarried(value: boolean) {
        this._isMarried = value;
    }
    public get childrenCount(): number {
        return this._childrenCount;
    }
    public set childrenCount(value: number) {
        this._childrenCount = value;
    }
    public get insurances(): Insurance[] {
        return this._insurances;
    }
    public set insurances(value: Insurance[]) {
        this._insurances = value;
    }
}