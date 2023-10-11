import {ContactPointAddress} from "./contactPointAddress";
import {Literal, Predicates, Triple, TripleArray, Uri} from "./triple-array";
import {v4 as uuid} from "uuid";

export class ContactPoint {
    constructor(
        public uuid: string,
        public url?: string,
        public email?: string,
        public telephone?: string,
        public openingHours?: string,
        public address?: ContactPointAddress) {
    }

    toTriples(): TripleArray {
        const id: Uri = new Uri(`http://data.lblod.info/form-data/nodes/${uuid()}`);  // TODO correct uri?

        return new TripleArray([
            Triple.createIfDefined(id, Predicates.type, new Uri('https://schema.org/ContactPoint')), // TODO correct uri?
            Triple.create(id, Predicates.uuid, Literal.create(this.uuid)),
            Triple.createIfDefined(id, Predicates.url, Literal.createIfDefined(this.url)),
            Triple.createIfDefined(id, Predicates.email, Literal.createIfDefined(this.email)),
            Triple.createIfDefined(id, Predicates.telephone, Literal.createIfDefined(this.telephone)),
            Triple.createIfDefined(id, Predicates.openingHours, Literal.createIfDefined(this.openingHours)),
            Triple.createIfDefined(id, Predicates.address, )
            //TODO add ContactPointAddress
        ]);
    }
}