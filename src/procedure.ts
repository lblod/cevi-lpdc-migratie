import {Website} from "./website";
import {Literal, Predicates, Triple, TripleArray, Uri} from "./triple-array";
import {v4 as uuid} from 'uuid';


export class Procedure {
    constructor(
        private uuid: string,
        private description: string | undefined,
        private websites: Website[] | undefined) {
    }

    toTriples(): TripleArray {
        const id: Uri = new Uri(`http://data.lblod.info/id/rule/${uuid()}`);

        return new TripleArray([
            Triple.createIfDefined(id, Predicates.type, new Uri('http://purl.org/vocab/cpsv#Rule')),
            Triple.create(id, Predicates.uuid, Literal.create(this.uuid)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description)),
            //TODO add website
        ]);
    }
}