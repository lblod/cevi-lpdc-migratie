import {ContactPointAddress} from "./contactPointAddress";
import {Literal, Predicates, Triple, Uri} from "./triple-array";
import {v4 as uuid} from "uuid";

export class ContactPoint {
    constructor(
        public uuid: string,
        public url: string | undefined,
        public email: string | undefined,
        public telephone: string | undefined,
        public openingHours: string | undefined,
        public address: ContactPointAddress | undefined) {
    }

    toTriples(abbInstanceId: Uri): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/form-data/nodes/${uuid()}`);

        return [
            Triple.createIfDefined(id, Predicates.type, new Uri('https://schema.org/ContactPoint')),
            Triple.create(id, Predicates.uuid, Literal.create(this.uuid)),
            Triple.createIfDefined(id, Predicates.url, Literal.createIfDefined(this.url)),
            Triple.createIfDefined(id, Predicates.email, Literal.createIfDefined(this.email)),
            Triple.createIfDefined(id, Predicates.telephone, Literal.createIfDefined(this.telephone)),
            Triple.createIfDefined(id, Predicates.openingHours, Literal.createIfDefined(this.openingHours)),
            Triple.create(abbInstanceId, Predicates.hasContactPoint, id)
        ].concat(this.address?.toTriples(id));
    }
}