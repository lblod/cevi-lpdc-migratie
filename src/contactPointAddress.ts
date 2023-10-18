import {Literal, Predicates, Triple, Uri} from "./triple";
import {Language} from "./language";

export class ContactPointAddress {
    constructor(
        private _uuid: string,
        private street: string | undefined,
        private houseNumber: string | undefined,
        private boxNumber: string | undefined,
        private zipCode: string | undefined,
        private municipality: string | undefined,
        private country: string | undefined
    ) {
    }

    get uuid(): string {
        return this._uuid;
    }

    toTriples(contactPointId: Uri, index: number, languageVersion: Language): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/form-data/nodes/${this._uuid}`);

        return [
            Triple.createIfDefined(id, Predicates.type, new Uri('http://www.w3.org/ns/locn#Address')),
            Triple.create(id, Predicates.uuid, Literal.create(this._uuid)),
            Triple.createIfDefined(id, Predicates.straatnaam, Literal.createIfDefined(this.street, Language.NL)),
            Triple.createIfDefined(id, Predicates.huisnummer, Literal.createIfDefined(this.houseNumber)),
            Triple.createIfDefined(id, Predicates.busnummer, Literal.createIfDefined(this.boxNumber)),
            Triple.createIfDefined(id, Predicates.postcode, Literal.createIfDefined(this.zipCode)),
            Triple.createIfDefined(id, Predicates.gemeentenaam, Literal.createIfDefined(this.municipality, Language.NL)),
            Triple.createIfDefined(id, Predicates.land, Literal.createIfDefined(this.country, Language.NL)),
            Triple.create(id, Predicates.order, Literal.create(index + 1)),
            Triple.create(contactPointId, Predicates.address, id)
        ];
    }
}