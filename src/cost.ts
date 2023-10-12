import {Literal, Predicates, Triple, Uri} from "./triple";
import {v4 as uuid} from 'uuid';
import {Language} from "./language";

export class Cost {
    constructor(
        private uuid: string,
        private description: string) {
    }

    toTriples(abbInstanceId: Uri): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/id/cost/${this.uuid}`);

        return [
            Triple.createIfDefined(id, Predicates.type, new Uri('http://data.europa.eu/m8g/Cost')),
            Triple.create(id, Predicates.uuid, Literal.create(this.uuid)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description, Language.NL)),
            Triple.create(abbInstanceId, Predicates.hasCost, id)
        ];
    }
}