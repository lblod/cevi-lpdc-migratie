import {Evidence} from "./evidence";

export class Requirement {

    uuid?: string;
    title?: string;
    description?: string;
    evidence?: Evidence;

    constructor(uuid?: string, title?: string, description?: string, evidence?: Evidence) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.evidence = evidence
    }
}