import {Website} from "./website";
import {Literal, Predicates, Triple, Uri} from "./triple";
import {Language} from "./language";


export class Procedure {
    constructor(
        private _uuid: string,
        private description: string | undefined,
        private _websites: Website[]) {
    }

    get uuid(): string {
        return this._uuid;
    }

    get websites(): Website[] {
        return this._websites;
    }

    toTriples(abbInstanceId: Uri): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/id/rule/${this._uuid}`);

        return [
            Triple.createIfDefined(id, Predicates.type, new Uri('http://purl.org/vocab/cpsv#Rule')),
            Triple.create(id, Predicates.uuid, Literal.create(this._uuid)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description, Language.NL)),
            Triple.create(abbInstanceId, Predicates.follows, id)
        ].concat(...this._websites.map(
            (aWebsite => aWebsite.toTriples(id))
        ));
    }
}