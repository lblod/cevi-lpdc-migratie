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

    toTriples(abbInstanceId: Uri, index: number): (Triple | undefined)[] {
        const procedureId: Uri = new Uri(`http://data.lblod.info/id/rule/${this._uuid}`);

        return [
            Triple.create(procedureId, Predicates.type, new Uri('http://purl.org/vocab/cpsv#Rule')),
            Triple.create(procedureId, Predicates.uuid, Literal.create(this._uuid)),
            Triple.createIfDefined(procedureId, Predicates.description, Literal.createIfDefined(this.description, Language.NL)),
            Triple.create(procedureId, Predicates.order, Literal.create(index + 1)),
            Triple.create(abbInstanceId, Predicates.follows, procedureId)
        ].concat(...this._websites.map(
            ((aWebsite, index) => aWebsite.toTriples(procedureId, Predicates.hasWebsite, index))
        ));
    }
}