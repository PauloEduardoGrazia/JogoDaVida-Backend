import { Insurance } from "../models/player/Insurance";

export class InsuranceService {
    private readonly _insurances: Insurance[] = []

    addInsurance(insurance: Insurance): void {
        try {
            this._insurances.push(insurance);
        } catch (err) {
            throw new Error(`Inner error. ${err}`)
        }
    }

    findInsuranceById(id: string): Insurance {
        const insuranceEntity = this._insurances.find(insurance => insurance.id === id);
        if (!insuranceEntity) {
            throw new Error(`Insurance not found`);
        }
        return insuranceEntity;
    }
}