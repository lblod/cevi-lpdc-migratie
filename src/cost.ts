import {Literal, Predicates, Triple, TripleArray, Uri} from "./triple-array";
import {v4 as uuid} from 'uuid';

export class Cost {
    constructor(
        private uuid: string,
        private description: string) {
    }

    toTriples(): TripleArray {
        const id: Uri = new Uri(`http://data.lblod.info/id/cost/${uuid()}`);  //TODO fill in correct uri

        return new TripleArray([
            Triple.createIfDefined(id, Predicates.type, new Uri('http://data.europa.eu/m8g/Cost')),
            Triple.create(id, Predicates.uuid, Literal.create(this.uuid)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description)),
        ]);
    }
}