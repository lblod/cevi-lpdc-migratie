import {Literal, Predicates, Triple, Uri} from "./triple";
import {v4 as uuid} from 'uuid';
import {Language} from "./language";

export class Requirement {
    constructor(
        private uuid: string,
        private description: string,
        private evidence?: Evidence) {
    }

    toTriples(abbInstanceId: Uri): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/id/requirement/${uuid()}`);

       return [
            Triple.createIfDefined(id, Predicates.type, new Uri('http://data.europa.eu/m8g/Requirement')),
            Triple.createIfDefined(id, Predicates.uuid, Literal.createIfDefined(this.uuid)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description, Language.NL)),
            Triple.create(abbInstanceId, Predicates.hasRequirement, id),
        ].concat(this.evidence?.toTriples(id));

    }
}

export class Evidence {

    constructor(
        private uuid: string,
        private description: string) {
    }

    toTriples(requirementId: Uri): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/form-data/nodes/${uuid()}`);

        return [
            Triple.createIfDefined(id, Predicates.type, new Uri('http://data.europa.eu/m8g/Evidence')),
            Triple.create(id, Predicates.uuid, Literal.create(this.uuid)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description, Language.NL)),
            Triple.create(requirementId, Predicates.hasSupportingEvidence, id),
        ];
    }
}