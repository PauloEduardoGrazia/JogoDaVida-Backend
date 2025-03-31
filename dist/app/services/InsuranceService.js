"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsuranceService = void 0;
class InsuranceService {
    constructor() {
        this._insurances = [];
    }
    addInsurance(insurance) {
        try {
            this._insurances.push(insurance);
        }
        catch (err) {
            throw new Error(`Inner error. ${err}`);
        }
    }
    findInsuranceById(id) {
        const insuranceEntity = this._insurances.find(insurance => insurance.id === id);
        if (!insuranceEntity) {
            throw new Error(`Insurance not found`);
        }
        return insuranceEntity;
    }
}
exports.InsuranceService = InsuranceService;
