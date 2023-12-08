import {Literal, Predicates, Triple, Uri} from "./triple";
import {Language} from "./language";

export class Website {

    constructor(
        private _uuid: string,
        private title: string | undefined,
        private description: string | undefined,
        private location: string) {
    }

    get uuid(): string {
        return this._uuid;
    }

    toTriples(owningId: Uri, owningLinkPredicate: Uri, index: number, languageVersion: Language): (Triple | undefined)[] {
        const websiteId: Uri = new Uri(`http://data.lblod.info/form-data/nodes/${this._uuid}`);

        return [
            Triple.create(websiteId, Predicates.type, new Uri('http://schema.org/WebSite')),
            Triple.create(websiteId, Predicates.uuid, Literal.create(this._uuid)),
            Triple.createIfDefined(websiteId, Predicates.title, Literal.createIfDefined(this.title, languageVersion)),
            Triple.createIfDefined(websiteId, Predicates.description, Literal.createIfDefined(this.description, languageVersion)),
            Triple.create(websiteId, Predicates.url, Literal.create(this.location)),
            Triple.create(websiteId, Predicates.order, Literal.create(index + 1)),
            Triple.create(owningId, owningLinkPredicate, websiteId),
        ];
    }
}