import { Car } from "../../models/player/Car";
import { House } from "../../models/player/House";

export interface IPlayerFinance{
    playerCar: Car;
    playerHouse: House;
    wallet: number;
    debts: number
}