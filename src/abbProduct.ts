import {Requirement} from "./requirement";
import {Procedure} from "./procedure";
import {Website} from "./website";
import {Cost} from "./cost";
import {ContactPoint} from "./contactPoint";
import {Literal, Predicates, Triple, Uri} from "./triple";
import {Language} from "./language";

export class AbbProduct {

    constructor(
        private _id: string,
        private targetAudience: TargetAudience[],
        private _uuid: string,
        private _created: Date,
        private _modified: Date,
        private _contactPoints: ContactPoint[],
        private keywords: string[],
        private title: string | undefined,
        private description: string | undefined,
        private additionalDescription: string | undefined,
        private exception: string | undefined,
        private theme: Theme[],
        private competentAuthorityLevel: CompetentAuthorityLevel[],
        private competentAuthority: string[],
        private executingAuthorityLevel: ExecutingAuthorityLevel[],
        private executingAuthority: string[],
        private productType: PublicServiceType | undefined,
        private startDate: Date | undefined,
        private endDate: Date | undefined,
        private productId: string | undefined,
        private conceptUrl: string | undefined,
        private _requirement: Requirement | undefined,
        private _procedure: Procedure | undefined,
        private _moreInfo: Website[],
        private _cost: Cost | undefined,
        private spatial: string,
        private createdBy: string) {
    }

    get id(): string {
        return this._id;
    }

    get uuid(): string {
        return this._uuid;
    }

    get created(): Date {
        return this._created;
    }

    get modified(): Date {
        return this._modified;
    }


    get requirement(): Requirement | undefined {
        return this._requirement;
    }


    get procedure(): Procedure | undefined {
        return this._procedure;
    }

    get moreInfo(): Website[] {
        return this._moreInfo;
    }

    get cost(): Cost | undefined {
        return this._cost;
    }

    get contactPoints(): ContactPoint[] {
        return this._contactPoints;
    }

    //TODO LPDC-718: convert triples to quads (at the output), and don't write out a graph file.
    toTriples(languageVersion: Language): Triple[] {
        const id = new Uri(this._id);
        const publicServiceType = 'http://purl.org/vocab/cpsv#PublicService';

        const triples: (Triple | undefined)[] = [
            //TODO LPDC-718: instructions for use in README.md

            Triple.createIfDefined(id, Predicates.order, Literal.create(1)),
            Triple.createIfDefined(id, Predicates.type, Uri.createIfDefined(publicServiceType)),
            Triple.createIfDefined(id, Predicates.uuid, Literal.createIfDefined(this._uuid)),
            Triple.createIfDefined(id, Predicates.title, Literal.createIfDefined(this.title, languageVersion)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description, languageVersion)),
            Triple.createIfDefined(id, Predicates.additionalDescription, Literal.createIfDefined(this.additionalDescription, languageVersion)),
            Triple.createIfDefined(id, Predicates.exception, Literal.createIfDefined(this.exception, languageVersion)),
            ...this.theme.map(aTheme => Triple.createIfDefined(id, Predicates.thematicArea, Uri.createIfDefined(`https://productencatalogus.data.vlaanderen.be/id/concept/Thema/${aTheme}`))),
            ...this.targetAudience.map(aTargetAudience => Triple.createIfDefined(id, Predicates.targetAudience, Uri.createIfDefined(`https://productencatalogus.data.vlaanderen.be/id/concept/Doelgroep/${aTargetAudience}`))),
            ...this.competentAuthorityLevel.map(aCompetentAuthorityLevel => Triple.createIfDefined(id, Predicates.competentAuthorityLevel, Uri.createIfDefined(`https://productencatalogus.data.vlaanderen.be/id/concept/BevoegdBestuursniveau/${aCompetentAuthorityLevel}`))),
            ...this.competentAuthority.map(aCompetentAuthority => Triple.createIfDefined(id, Predicates.hasCompetentAuthority, Uri.createIfDefined(aCompetentAuthority))),
            ...this.executingAuthorityLevel.map(anExecutingAuthorityLevel => Triple.createIfDefined(id, Predicates.executingAuthorityLevel, Uri.createIfDefined(`https://productencatalogus.data.vlaanderen.be/id/concept/UitvoerendBestuursniveau/${anExecutingAuthorityLevel}`))),
            ...this.executingAuthority.map(anExecutingAuthority => Triple.createIfDefined(id, Predicates.hasExecutingAuthority, Uri.createIfDefined(anExecutingAuthority))),
            ...this.keywords.map(aKeyword => Triple.createIfDefined(id, Predicates.keyword, Literal.createIfDefined(aKeyword, Language.NL))),
            Triple.createIfDefined(id, Predicates.productType, Uri.createIfDefined(this.productId ? `https://productencatalogus.data.vlaanderen.be/id/concept/Type/${this.productType}` : undefined)),
            Triple.createIfDefined(id, Predicates.created, Literal.createIfDefined(this.created.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')),
            Triple.createIfDefined(id, Predicates.modified, Literal.createIfDefined(this.modified.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')),
            Triple.createIfDefined(id, Predicates.startDate, Literal.createIfDefined(this.startDate?.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')),
            Triple.createIfDefined(id, Predicates.endDate, Literal.createIfDefined(this.endDate?.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')),
            Triple.createIfDefined(id, Predicates.productId, Literal.createIfDefined(this.productId)),
            Triple.createIfDefined(id, Predicates.source, Uri.createIfDefined(this.conceptUrl)),
            ...(this.requirement ? this.requirement.toTriples(id, 0, languageVersion) : []),
            ...(this._procedure ? this._procedure.toTriples(id, 0, languageVersion) : []),
            ...this._moreInfo?.map((aMoreInfo, index) => aMoreInfo.toTriples(id, Predicates.hasMoreInfo, index, languageVersion)).flat(),
            ...(this._cost ? this._cost.toTriples(id, 0, languageVersion) : []),
            ...this._contactPoints?.map((aContactPoint, index) => aContactPoint.toTriples(id, index, languageVersion)).flat(),
            Triple.createIfDefined(id, Predicates.spatial, Uri.createIfDefined(this.spatial)),
            Triple.createIfDefined(id, Predicates.createdBy, Uri.createIfDefined(this.createdBy)),
            Triple.createIfDefined(id, Predicates.status, Uri.createIfDefined('http://lblod.data.gift/concepts/79a52da4-f491-4e2f-9374-89a13cde8ecd')) //concept
        ];

        return triples.filter((triple): triple is Triple => triple !== undefined);
    }
}

export enum TargetAudience {
    Onderneming = 'Onderneming',
    Burger = 'Burger',
    Organisatie = 'Organisatie',
    Vereniging = 'Vereniging',
    VlaamseOverheid = 'VlaamseOverheid',
    LokaalBestuur = 'LokaalBestuur',
}

export enum PublicServiceType {
    Toelating = 'Toelating',
    FinancieelVoordeel = 'FinancieelVoordeel',
    InfrastructuurMateriaal = 'InfrastructuurMateriaal',
    Bewijs = 'Bewijs',
    AdviesBegeleiding = 'AdviesBegeleiding',
    Voorwerp = 'Voorwerp',
    FinancieleVerplichting = 'FinancieleVerplichting',
}

export enum Theme {
    EconomieWerk = 'EconomieWerk',
    MilieuEnergie = 'MilieuEnergie',
    OnderwijsWetenschap = 'OnderwijsWetenschap',
    BouwenWonen = 'BouwenWonen',
    WelzijnGezondheid = 'WelzijnGezondheid',
    CultuurSportVrijeTijd = 'CultuurSportVrijeTijd',
    BurgerOverheid = 'BurgerOverheid',
    MobiliteitOpenbareWerken = 'MobiliteitOpenbareWerken'
}

export enum ExecutingAuthorityLevel {
    Lokaal = 'Lokaal',
    Vlaams = 'Vlaams',
    Federaal = 'Federaal',
}

export enum CompetentAuthorityLevel {
    Vlaams = 'Vlaams',
    Federaal = 'Federaal',
    Lokaal = 'Lokaal',
}

export enum ResourceLanguage {
    ENG = 'http://publications.europa.eu/resource/authority/language/ENG',
    FRA = 'http://publications.europa.eu/resource/authority/language/FRA',
    NLD = 'http://publications.europa.eu/resource/authority/language/NLD',
    DEU = 'http://publications.europa.eu/resource/authority/language/DEU',
}

export enum PublicationMedium {
    YourEurope = 'https://productencatalogus.data.vlaanderen.be/id/concept/PublicatieKanaal/YourEurope',
    Rechtenverkenner = 'https://productencatalogus.data.vlaanderen.be/id/concept/PublicatieKanaal/Rechtenverkenner',
}

export enum YourEuropeCategory {
    Gezondheidszorg = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/Gezondheidszorg',
    GezondheidszorgWoonzorgcentrum = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/GezondheidszorgWoonzorgcentrum',
    GezondheidszorgPreventieveOpenbareGezondheidsmaatregelen = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/GezondheidszorgPreventieveOpenbareGezondheidsmaatregelen',
    Overheidsopdrachten = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/Overheidsopdrachten',
    VerblijfVerkiezingen = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/VerblijfVerkiezingen',
    BurgerEnFamilieRechten = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/BurgerEnFamilieRechten',
    BurgerEnFamilieRechtenGenderIdentiteit = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/BurgerEnFamilieRechtenGenderIdentiteit',
    BurgerEnFamilieRechtenKinderen = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/BurgerEnFamilieRechtenKinderen',
    BurgerEnFamilieRechtenPartners = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/BurgerEnFamilieRechtenPartners',
    ProcedurePensioneringAanvraagUitkering = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/ProcedurePensioneringAanvraagUitkering',
    Bedrijf = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/Bedrijf',
    WerkEnPensioneringGaanWerken = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/WerkEnPensioneringGaanWerken',
    WerkEnPensioneringBelastingheffing = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/WerkEnPensioneringBelastingheffing',
    WerkEnPensioneringAansprakelijkheidEnVerzekeringen = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/WerkEnPensioneringAansprakelijkheidEnVerzekeringen',
    ReizenElektronischeGegevens = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/ReizenElektronischeGegevens',
    BelastingenOverigeBelastingen = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/BelastingenOverigeBelastingen',
    Belastingen = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/Belastingen',
    BedrijfPersoonsgegevens = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/BedrijfPersoonsgegevens',
    Diensten = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/Diensten',
    DienstenLicentiesVergunningen = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/DienstenLicentiesVergunningen',
    WerknemersTewerkstelling = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/WerknemersTewerkstelling',
    BedrijfsfinancieringOndernemersInitiatieven = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/BedrijfsfinancieringOndernemersInitiatieven',
    BeschermingPersoonsgegevens = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/BeschermingPersoonsgegevens',
    BeschermingPersoonsgegevensUitoefeningRechten = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/BeschermingPersoonsgegevensUitoefeningRechten',
    Consumentenrechten = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/Consumentenrechten',
    ConsumentenrechtenNutsvoorzieningen = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/ConsumentenrechtenNutsvoorzieningen',
    ConsumentenrechtenAankoop = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/ConsumentenrechtenAankoop',
    BelastingenAccijnzen = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/BelastingenAccijnzen',
    GezondheidVeiligheidWerkVerplichtingen = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/GezondheidVeiligheidWerkVerplichtingen',
    GoederenKeurmerken = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/GoederenKeurmerken',
    VerblijfVerhuizing = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/VerblijfVerhuizing',
    VerblijfOverlijden = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/VerblijfOverlijden',
    VerblijfNaturalisatie = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/VerblijfNaturalisatie',
    VoertuigenVerplichteVerzekering = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/VoertuigenVerplichteVerzekering',
    VoertuigenVerkeersregels = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/VoertuigenVerkeersregels',
    VoertuigenVerleningRijbewijzen = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/VoertuigenVerleningRijbewijzen',
    ReizenOndersteuningBeperkteMobiliteit = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/ReizenOndersteuningBeperkteMobiliteit',
    ReizenDocumenten = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/ReizenDocumenten',
    ReizenGoederen = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/ReizenGoederen',
    ReizenRechtenVerplichtingen = 'https://productencatalogus.data.vlaanderen.be/id/concept/YourEuropeCategorie/ReizenRechtenVerplichtingen',
}
