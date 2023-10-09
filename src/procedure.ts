import {Website} from "./website";

export class Procedure {

    uuid?: string;
    title?: string;
    description?: string;
    website?: Website[];

    constructor(uuid?: string, title?: string, description?: string, website?: Website[]) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.website = website;
    }
}