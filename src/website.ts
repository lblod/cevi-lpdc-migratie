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

    toTriples(owningId: Uri, owningLinkPredicate: Uri): (Triple | undefined)[] {
        const websiteId: Uri = new Uri(`http://data.lblod.info/form-data/nodes/${this._uuid}`);

        return [
            Triple.create(websiteId, Predicates.type, new Uri('https://schema.org/WebSite')),
            Triple.create(websiteId, Predicates.uuid, Literal.create(this._uuid)),
            Triple.createIfDefined(websiteId, Predicates.title, Literal.createIfDefined(this.title, Language.NL)),
            Triple.createIfDefined(websiteId, Predicates.description, Literal.createIfDefined(this.description, Language.NL)),
            Triple.create(websiteId, Predicates.url, Uri.create(this.location)),
            Triple.create(owningId, owningLinkPredicate, websiteId),
        ];
    }
}