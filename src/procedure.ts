import {Website} from "./website";

export class Procedure {
    constructor(
        private uuid: string,
        private description: string | undefined,
        private websites: Website[] | undefined) {
    }
}