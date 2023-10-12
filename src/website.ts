import {Literal, Predicates, Triple, Uri} from "./triple";
import {Language} from "./language";

export class Website {

    constructor(
        private uuid: string,
        private title: string | undefined,
        private description: string | undefined,
        private location: string) {
    }

    toTriples(abbInstanceId?: Uri, procedureId?: Uri): (Triple | undefined)[] {
        const id: Uri = new Uri(`http://data.lblod.info/form-data/nodes/${this.uuid}`);

        return [
            Triple.createIfDefined(id, Predicates.type, new Uri('https://schema.org/WebSite')),
            Triple.create(id, Predicates.uuid, Literal.create(this.uuid)),
            Triple.createIfDefined(id, Predicates.title, Literal.createIfDefined(this.title, Language.NL)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description, Language.NL)),
            Triple.createIfDefined(id, Predicates.url, Uri.createIfDefined(this.location)),
            abbInstanceId ? Triple.create(abbInstanceId, Predicates.hasMoreInfo, id) : undefined,
            procedureId ? Triple.create(procedureId, Predicates.hasWebsite, id) : undefined
        ];
    }
}