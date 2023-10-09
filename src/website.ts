export class Website {
    uuid?: string;
    title?: string;
    description?: string;
    location?: string;

    constructor(uuid?: string, title?: string, description?: string, location?: string) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.location = location;
    }
}