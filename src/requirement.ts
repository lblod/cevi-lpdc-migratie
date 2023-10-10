import {Evidence} from "./evidence";
import {Literal, Predicates, Triple, TripleArray, Uri} from "./triple-array";

export class Requirement {

    uuid: string;
    title?: string;
    description?: string;
    evidence?: Evidence;

    constructor(uuid: string, title?: string, description?: string, evidence?: Evidence) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.evidence = evidence
    }

    toTriples(): TripleArray {
        const id: Uri = new Uri(`http:// /uuid`);

        return new TripleArray([
            Triple.createIfDefined(id, Predicates.type, new Uri('http://data.europa.eu/m8g/Requirement')),
            Triple.createIfDefined(id, Predicates.uuid, Literal.createIfDefined(this.uuid)),
            Triple.createIfDefined(id, Predicates.title, Literal.createIfDefined(this.title)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description)),
            // TODO add evidence
        ]);
    }
}