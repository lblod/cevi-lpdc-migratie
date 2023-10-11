import {Literal, Predicates, Triple, TripleArray, Uri} from "./triple-array";
import {v4 as uuid} from 'uuid';

export class Website {

    constructor(
        private uuid: string,
        private title: string | undefined,
        private description: string | undefined,
        private location: string) {
    }

    toTriples(): TripleArray {
        const id: Uri = new Uri(`http://data.lblod.info/id/rule/${uuid()}`);  //TODO fill in correct uri

        return new TripleArray([
            Triple.createIfDefined(id, Predicates.type, new Uri('http://purl.org/vocab/cpsv#Rule')), //TODO fill in correct uri
            Triple.create(id, Predicates.uuid, Literal.create(this.uuid)),
            Triple.createIfDefined(id, Predicates.title, Literal.createIfDefined(this.title)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description)),
            Triple.createIfDefined(id, Predicates.url, Uri.createIfDefined(this.location)),
        ]);
    }
}