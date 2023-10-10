import {Literal, Predicates, Triple, TripleArray, Uri} from "./triple-array";

export class Requirement {
    constructor(
        private uuid: string,
        private description: string,
        private evidence?: Evidence) {
    }

    toTriples(): TripleArray {
        const id: Uri = new Uri(`http:// /uuid`);

        return new TripleArray([
            Triple.createIfDefined(id, Predicates.type, new Uri('http://data.europa.eu/m8g/Requirement')),
            Triple.createIfDefined(id, Predicates.uuid, Literal.createIfDefined(this.uuid)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description)),
            // TODO add evidence
        ]);
    }
}

export class Evidence {

    constructor(
        private uuid: string,
        private description: string) {
    }
}