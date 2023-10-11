import {Literal, Predicates, Triple, TripleArray, Uri} from "./triple-array";
import {v4 as uuid} from 'uuid';

export class Requirement {
    constructor(
        private uuid: string,
        private description: string,
        private evidence?: Evidence) {
    }

    toTriples(abbInstanceId: Uri): TripleArray {
        const id: Uri = new Uri(`http://data.lblod.info/id/requirement/${uuid()}`);

        return new TripleArray([
            Triple.createIfDefined(id, Predicates.type, new Uri('http://data.europa.eu/m8g/Requirement')),
            Triple.createIfDefined(id, Predicates.uuid, Literal.createIfDefined(this.uuid)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description)),
            Triple.create(abbInstanceId, Predicates.hasRequirement, id),
        ]).join(this.evidence?.toTriples(id));
    }
}

export class Evidence {

    constructor(
        private uuid: string,
        private description: string) {
    }

    toTriples(requirementId: Uri): TripleArray {
        const id: Uri = new Uri(`http://data.lblod.info/form-data/nodes/${uuid()}`);

        return new TripleArray([
            Triple.createIfDefined(id, Predicates.type, new Uri('http://data.europa.eu/m8g/Evidence')),
            Triple.create(id, Predicates.uuid, Literal.create(this.uuid)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description)),
            Triple.create(requirementId, Predicates.hasSupportingEvidence, id),
        ]);
    }
}