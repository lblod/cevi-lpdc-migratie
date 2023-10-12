import {Literal, Predicates, Triple, Uri} from "./triple";
import {Language} from "./language";

export class ContactPointAddress {
    constructor(
        public uuid: string,
        public street: string | undefined,
        public houseNumber: string | undefined,
        public boxNumber: string | undefined,
        public zipCode: string | undefined,
        public municipality: string | undefined,
        public country: string | undefined
    ) {
    }

    toTriples(contactPointId: Uri): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/form-data/nodes/${this.uuid}`);

        return [
            Triple.createIfDefined(id, Predicates.type, new Uri('http://www.w3.org/ns/locn#Address')),
            Triple.create(id, Predicates.uuid, Literal.create(this.uuid)),
            Triple.createIfDefined(id, Predicates.straatnaam, Literal.createIfDefined(this.street, Language.NL)),
            Triple.createIfDefined(id, Predicates.huisnummer, Literal.createIfDefined(this.houseNumber)),
            Triple.createIfDefined(id, Predicates.busnummer, Literal.createIfDefined(this.boxNumber)),
            Triple.createIfDefined(id, Predicates.postcode, Literal.createIfDefined(this.zipCode)),
            Triple.createIfDefined(id, Predicates.gemeentenaam, Literal.createIfDefined(this.municipality, Language.NL)),
            Triple.createIfDefined(id, Predicates.land, Literal.createIfDefined(this.country, Language.NL)),
            Triple.create(contactPointId, Predicates.address, id)
        ];
    }
}