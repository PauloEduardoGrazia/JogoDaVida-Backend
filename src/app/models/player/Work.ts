import { IWork } from "../../interfaces/player/IWork";

export class Work implements IWork {
    private _id: string;
    private _name: string;
    private _wageValue: number;

    constructor(id: string, name: string, wageValue: number) {
        this._id = id;
        this._name = name;
        this._wageValue = wageValue;
    }

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value
    }
    public get wageValue(): number {
        return this._wageValue;
    }
    public set wageValue(value: number) {
        this._wageValue = value;
    }
}