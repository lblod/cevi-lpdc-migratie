import {ContactPointAddress} from "./contactPointAddress";

export class ContactPoint {

    uuid?: string;
    url?: string;
    email?: string;
    telephone?: string;
    openingHours?: string;
    address?: ContactPointAddress;

    constructor(uuid?: string, url?: string, email?: string, telephone?: string, openingHours?: string, address?: ContactPointAddress) {
        this.uuid = uuid;
        this.url = url;
        this.email = email;
        this.telephone = telephone;
        this.openingHours = openingHours;
        this.address = address;
    }
}