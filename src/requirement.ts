import {Literal, Predicates, Triple, Uri} from "./triple";
import {Language} from "./language";

export class Requirement {
    constructor(
        private _uuid: string,
        private description: string,
        private _evidence?: Evidence) {
    }

    get uuid(): string {
        return this._uuid;
    }

    get evidence(): Evidence | undefined {
        return this._evidence;
    }

    toTriples(abbInstanceId: Uri, index: number): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/id/requirement/${this._uuid}`);

       return [
            Triple.createIfDefined(id, Predicates.type, new Uri('http://data.europa.eu/m8g/Requirement')),
            Triple.createIfDefined(id, Predicates.uuid, Literal.createIfDefined(this._uuid)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description, Language.NL)),
            Triple.create(id, Predicates.order, Literal.create(index + 1)),
            Triple.create(abbInstanceId, Predicates.hasRequirement, id),
        ].concat(this._evidence?.toTriples(id, 0));

    }
}

export class Evidence {

    constructor(
        private _uuid: string,
        private description: string) {
    }

    get uuid(): string {
        return this._uuid;
    }

    toTriples(requirementId: Uri, index: number): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/form-data/nodes/${this._uuid}`);

        return [
            Triple.createIfDefined(id, Predicates.type, new Uri('http://data.europa.eu/m8g/Evidence')),
            Triple.create(id, Predicates.uuid, Literal.create(this._uuid)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description, Language.NL)),
            Triple.create(id, Predicates.order, Literal.create(index + 1)),
            Triple.create(requirementId, Predicates.hasSupportingEvidence, id),
        ];
    }
}