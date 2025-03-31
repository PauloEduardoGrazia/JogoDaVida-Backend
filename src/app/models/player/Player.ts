import { IPlayer } from "../../interfaces/player/IPlayer";
import { PlayerFinance } from "../player/PlayerFinance";
import { PlayerStatus } from "../player/PlayerStatus";
import { Work } from "../player/Work";

export class Player implements IPlayer {
    private _name: string;
    private _space: number;
    private _work: Work;
    private _playerStatus: PlayerStatus;
    private _playerFinance: PlayerFinance;
    private _properties: { houses: string[], cars: string[] };

    constructor(name: string, space: number, work: Work, playerStatus: PlayerStatus, playerFinance: PlayerFinance) {
        this._name = name;
        this._space = space;
        this._work = work;
        this._playerStatus = playerStatus;
        this._playerFinance = playerFinance;
        this._properties = { houses: [], cars: [] };
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get space(): number {
        return this._space;
    }
    public set space(value: number) {
        this._space = value;
    }
    public get work(): Work {
        return this._work;
    }
    public set work(value: Work) {
        this._work = value;
    }
    public get playerStatus(): PlayerStatus {
        return this._playerStatus;
    }
    public set playerStatus(value: PlayerStatus) {
        this._playerStatus = value;
    }
    public get playerFinance(): PlayerFinance {
        return this._playerFinance;
    }
    public set playerFinance(value: PlayerFinance) {
        this._playerFinance = value;
    }
    public get properties(): { houses: string[], cars: string[] } {
        return this._properties;
    }
    public set properties(value: { houses: string[], cars: string[] }) {
        this._properties = value;
    }
}

