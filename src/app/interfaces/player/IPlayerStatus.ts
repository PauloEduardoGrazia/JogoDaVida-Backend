import { Car } from "../../models/player/Car";
import { Insurance } from "../../models/player/Insurance";

export interface IPlayerStatus{
    chooseUniversity: boolean;
    playerCar?: Car;
    isMarried: boolean;
    childrenCount: number; 
    insurances: Insurance[];
}