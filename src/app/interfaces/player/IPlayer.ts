import { PlayerFinance } from "../../models/player/PlayerFinance";
import { PlayerStatus } from "../../models/player/PlayerStatus";
import { Work } from "../../models/player/Work";

export interface IPlayer {
    name: string;
    space: number;
    work?: Work;
    playerStatus: PlayerStatus;
    playerFinance: PlayerFinance;
    properties?: {
        houses: string[];
        cars: string[];
    };
}