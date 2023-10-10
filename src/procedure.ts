import {Website} from "./website";

export class Procedure {
    constructor(
        private uuid: string,
        private description: string,
        private website?: Website[]) { //TODO LPDC-718: do we need this?
    }
}