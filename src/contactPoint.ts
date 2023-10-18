import {ContactPointAddress} from "./contactPointAddress";
import {Literal, Predicates, Triple, Uri} from "./triple";
import {Language} from "./language";

export class ContactPoint {
    constructor(
        private _uuid: string,
        private url: string | undefined,
        private email: string | undefined,
        private telephone: string | undefined,
        private openingHours: string | undefined,
        private _address: ContactPointAddress | undefined) {
    }

    get uuid(): string {
        return this._uuid;
    }

    get address(): ContactPointAddress | undefined {
        return this._address;
    }

    toTriples(abbInstanceId: Uri, index: number, languageVersion: Language): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/form-data/nodes/${this._uuid}`);

        return [
            Triple.createIfDefined(id, Predicates.type, new Uri('http://schema.org/ContactPoint')),
            Triple.create(id, Predicates.uuid, Literal.create(this._uuid)),
            Triple.createIfDefined(id, Predicates.url, Literal.createIfDefined(this.url)),
            Triple.createIfDefined(id, Predicates.email, Literal.createIfDefined(this.email)),
            Triple.createIfDefined(id, Predicates.telephone, Literal.createIfDefined(this.telephone)),
            Triple.createIfDefined(id, Predicates.openingHours, Literal.createIfDefined(this.openingHours)),
            Triple.create(id, Predicates.order, Literal.create(index + 1)),
            Triple.create(abbInstanceId, Predicates.hasContactPoint, id),
        ].concat(this._address?.toTriples(id, 0, languageVersion));
    }
}