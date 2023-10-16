import {Literal, Predicates, Triple, Uri} from "./triple";
import {Language} from "./language";

export class Cost {
    constructor(
        private _uuid: string,
        private description: string) {
    }

    get uuid(): string {
        return this._uuid;
    }

    toTriples(abbInstanceId: Uri, index: number): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/id/cost/${this._uuid}`);

        return [
            Triple.createIfDefined(id, Predicates.type, new Uri('http://data.europa.eu/m8g/Cost')),
            Triple.create(id, Predicates.uuid, Literal.create(this._uuid)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description, Language.NL)),
            Triple.create(id, Predicates.order, Literal.create(index + 1)),
            Triple.create(abbInstanceId, Predicates.hasCost, id)
        ];
    }
}