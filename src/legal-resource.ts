import {Literal, Predicates, Triple, Uri} from "./triple";
import {Language} from "./language";

export class LegalResource {

    constructor(
        private _uuid: string,
        private location: string,
        private order: string) {
    }

    get uuid(): string {
        return this._uuid;
    }

    toTriples(abbInstanceId: Uri, languageVersion: Language): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/id/legal-resource/${this._uuid}`);

        return [
            Triple.create(id, Predicates.type, new Uri('http://data.europa.eu/eli/ontology#LegalResource')),
            Triple.create(id, Predicates.uuid, Literal.create(this._uuid)),
            Triple.create(id, Predicates.url, Literal.create(this.location)),
            Triple.create(id, Predicates.order, Literal.create(this.order)),
            Triple.create(abbInstanceId, Predicates.hasLegalResource, id),
        ];
    }


}