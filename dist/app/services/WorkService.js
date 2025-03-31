"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkService = void 0;
class WorkService {
    constructor() {
        this._works = [];
    }
    addWork(work) {
        try {
            this._works.push(work);
        }
        catch (err) {
            throw new Error(`Inner error. ${err}`);
        }
    }
    findWorkById(id) {
        const workEntity = this._works.find(work => work.id === id);
        if (!workEntity) {
            throw new Error(`Work not found`);
        }
        return workEntity;
    }
}
exports.WorkService = WorkService;
