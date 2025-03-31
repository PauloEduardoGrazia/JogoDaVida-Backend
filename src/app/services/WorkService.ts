import { Work } from "../models/player/Work";

export class WorkService {
    private readonly _works: Work[] = []

    addWork(work: Work): void {
        try {
            this._works.push(work);
        } catch (err) {
            throw new Error(`Inner error. ${err}`);
        }
    }

    findWorkById(id: string): Work {
        const workEntity = this._works.find(work => work.id === id)
        if (!workEntity) {
            throw new Error(`Work not found`);
        }
        return workEntity;
    }
}