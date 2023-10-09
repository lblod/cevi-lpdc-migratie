export class ContactPointAddress {

    uuid?: string;
    street?: string;
    houseNumber?: string;
    boxNumber?: string;
    zipCode?: string;
    municipality?: string;
    country?: string;

    constructor(uuid?: string, street?: string, houseNumber?: string, boxNumber?: string, zipCode?: string, municipality?: string, country?: string) {
        this.uuid = uuid;
        this.street = street;
        this.houseNumber = houseNumber;
        this.boxNumber = boxNumber;
        this.zipCode = zipCode;
        this.municipality = municipality;
        this.country = country;
    }
}