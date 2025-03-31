import { Car } from "../player/Car";
import { House } from "../player/House";

export interface BuyPropertyDto{
    car?: Car;
    house?: House;
}