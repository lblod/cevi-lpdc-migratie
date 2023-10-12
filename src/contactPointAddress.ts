import {Literal, Predicates, Triple, TripleArray, Uri} from "./triple-array";
import {v4 as uuid} from "uuid";

export class ContactPointAddress {
    constructor(
        public uuid: string,
        public street: string | undefined,
        public houseNumber: string | undefined,
        public boxNumber: string | undefined,
        public zipCode: string | undefined,
        public municipality: string | undefined,
        public country: string | undefined) {
    }

    toTriples(): TripleArray {
        const id: Uri = new Uri(`http://data.lblod.info/form-data/nodes/${uuid()}`);  // TODO correct url?

        return new TripleArray([
            Triple.createIfDefined(id, Predicates.type, new Uri('http://www.w3.org/ns/locn#Address')), // TODO correct url?
            Triple.create(id, Predicates.uuid, Literal.create(this.uuid)),
            Triple.createIfDefined(id, Predicates.straatnaam, Literal.createIfDefined(this.street)),
            Triple.createIfDefined(id, Predicates.huisnummer, Literal.createIfDefined(this.houseNumber)),
            Triple.createIfDefined(id, Predicates.busnummer, Literal.createIfDefined(this.boxNumber)),
            Triple.createIfDefined(id, Predicates.postcode, Literal.createIfDefined(this.zipCode)),
            Triple.createIfDefined(id, Predicates.gemeentenaam, Literal.createIfDefined(this.municipality)),
            Triple.createIfDefined(id, Predicates.land, Literal.createIfDefined(this.country)),
        ]);
    }
}