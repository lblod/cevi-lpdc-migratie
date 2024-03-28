import {Literal, Predicates, Triple, Uri} from "./triple";
import {Language} from "./language";

export class LegalResource {

    constructor(
        private _uuid: string,
        private title: string | undefined,
        private description: string | undefined,
        private location: string) {
    }

    get uuid(): string {
        return this._uuid;
    }

    toTriples(abbInstanceId: Uri, index: number, languageVersion: Language): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/id/legal-resource/${this._uuid}`);

        return [
            Triple.create(id, Predicates.type, new Uri('http://data.europa.eu/eli/ontology#LegalResource')),
            Triple.create(id, Predicates.uuid, Literal.create(this._uuid)),
            Triple.createIfDefined(id, Predicates.title, Literal.createIfDefined(this.title, languageVersion)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description, languageVersion)),
            Triple.create(id, Predicates.url, Literal.create(this.location)),
            Triple.create(id, Predicates.order, Literal.create(index + 1)),
            Triple.create(abbInstanceId, Predicates.hasLegalResource, id),
        ];
    }


}