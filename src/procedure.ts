import {Website} from "./website";
import {Literal, Predicates, Triple, Uri} from "./triple";
import {v4 as uuid} from 'uuid';
import {Language} from "./language";


export class Procedure {
    constructor(
        private uuid: string,
        private description: string | undefined,
        private websites: Website[]) {
    }

    toTriples(abbInstanceId: Uri): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/id/rule/${this.uuid}`);

        return [
            Triple.createIfDefined(id, Predicates.type, new Uri('http://purl.org/vocab/cpsv#Rule')),
            Triple.create(id, Predicates.uuid, Literal.create(this.uuid)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description, Language.NL)),
            Triple.create(abbInstanceId, Predicates.follows, id)
        ].concat(...this.websites.map(
            (aWebsite => aWebsite.toTriples(id))
        ));
    }
}