import {Language} from "./language";

export class Triple {

    private constructor(
        public subject: Uri,
        public predicate: Uri,
        public object: Literal | Uri) {
    }

    static createIfDefined(subject: Uri, predicate: Uri, object: Literal | Uri | undefined): Triple | undefined {
        return object ? new Triple(subject, predicate, object) : undefined;
    }

    static create(subject: Uri, predicate: Uri, object: Literal | Uri): Triple {
        if (!object) {
            throw new Error('Triple cannot be created!');
        }
        return new Triple(subject, predicate, object);
    }

    toString() {
        return `${this.subject.toString()} ${this.predicate.toString()} ${this.object.toString()} .`
    }

    toQuadString(graph: Uri): string {
        return `${this.subject.toString()} ${this.predicate.toString()} ${this.object.toString()} ${graph.toString()} .`
    }

}

export class Uri {

    constructor(private value: string) {
    }

    static createIfDefined(value?: string): Uri | undefined {
        return value ? new Uri(value) : undefined;
    }

    static create(value: string): Uri {
        return new Uri(value);
    }

    toString(): string {
        return `<${this.value}>`
    }
}

export class Literal {

    constructor(
        private value: string | number,
        private language?: Language,
        private dataType?: string,
    ) {
    }

    static createIfDefined(value: string | undefined, language?: Language, dataType?: string): Literal | undefined {
        return value ? new Literal(value, language, dataType) : undefined;
    }

    static create(value: string | number): Literal {
        if (!value) {
            throw new Error('Literal cannot be created!');
        }
        return new Literal(value);
    }

    toString(): string {
        if (typeof this.value === 'number') {
            return this.value.toString();
        } else {
            const escapedValue = `"""${this.value.replace(/"/g, '\\"')}"""`;
            if (this.language) {
                return `${escapedValue}@${this.language}`
            } else if (this.dataType) {
                return `${escapedValue}^^<${this.dataType}>`
            } else {
                return escapedValue;
            }
        }
    }

}

export const Predicates = {
    type: new Uri('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    uuid: new Uri('http://mu.semte.ch/vocabularies/core/uuid'),
    title: new Uri('http://purl.org/dc/terms/title'),
    description: new Uri('http://purl.org/dc/terms/description'),
    additionalDescription: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#additionalDescription'),
    exception: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#exception'),
    regulation: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#regulation'),
    startDate: new Uri('http://schema.org/startDate'),
    endDate: new Uri('http://schema.org/endDate'),
    productId: new Uri('http://schema.org/productID'),
    created: new Uri('http://schema.org/dateCreated'),
    modified: new Uri('http://schema.org/dateModified'),
    source: new Uri('http://purl.org/dc/terms/source'),
    createdBy: new Uri('http://purl.org/pav/createdBy'),
    status: new Uri('http://www.w3.org/ns/adms#status'),
    hasRequirement: new Uri('http://vocab.belgif.be/ns/publicservice#hasRequirement'),
    chosenForm: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#chosenForm'),
    dateCreated: new Uri('http://schema.org/dateCreated'),
    relation: new Uri('http://purl.org/dc/terms/relation'),
    yourEuropeCategory: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#yourEuropeCategory'),
    publicationMedium: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#publicationMedium'),
    hasSupportingEvidence: new Uri('http://data.europa.eu/m8g/hasSupportingEvidence'),
    hasWebsite: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#hasWebsite'),
    follows: new Uri('http://purl.org/vocab/cpsv#follows'),
    url: new Uri('http://schema.org/url'),
    hasMoreInfo: new Uri('http://www.w3.org/2000/01/rdf-schema#seeAlso'),
    hasCost: new Uri('http://data.europa.eu/m8g/hasCost'),
    hasFinancialAdvantage: new Uri('http://purl.org/vocab/cpsv#produces'),
    conceptInitiated: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#conceptInstantiated'),
    conceptIsNew: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#conceptIsNew'),
    hasDisplayConfiguration: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#hasConceptDisplayConfiguration'),
    thematicArea: new Uri('http://data.europa.eu/m8g/thematicArea'),
    targetAudience: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#targetAudience'),
    language: new Uri('http://publications.europa.eu/resource/authority/language'),
    competentAuthorityLevel: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#competentAuthorityLevel'),
    hasCompetentAuthority: new Uri('http://data.europa.eu/m8g/hasCompetentAuthority'),
    executingAuthorityLevel: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#executingAuthorityLevel'),
    hasExecutingAuthority: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#hasExecutingAuthority'),
    keyword: new Uri('http://www.w3.org/ns/dcat#keyword'),
    productType: new Uri('http://purl.org/dc/terms/type'),
    conceptTag: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#conceptTag'),
    order: new Uri('http://www.w3.org/ns/shacl#order'),
    hasContactPoint: new Uri('http://data.europa.eu/m8g/hasContactPoint'),
    telephone: new Uri('http://schema.org/telephone'),
    openingHours: new Uri('http://schema.org/openingHours'),
    email: new Uri('http://schema.org/email'),
    address: new Uri('https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#address'),
    land: new Uri('https://data.vlaanderen.be/ns/adres#land'),
    gemeentenaam: new Uri('https://data.vlaanderen.be/ns/adres#gemeentenaam'),
    huisnummer: new Uri('https://data.vlaanderen.be/ns/adres#Adresvoorstelling.huisnummer'),
    busnummer: new Uri('https://data.vlaanderen.be/ns/adres#Adresvoorstelling.busnummer'),
    postcode: new Uri('https://data.vlaanderen.be/ns/adres#postcode'),
    straatnaam: new Uri('https://data.vlaanderen.be/ns/adres#Straatnaam'),
    spatial: new Uri('http://purl.org/dc/terms/spatial'),
    hasVersionedSource: new Uri('http://mu.semte.ch/vocabularies/ext/hasVersionedSource'),
}
