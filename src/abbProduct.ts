import {Requirement} from "./requirement";
import {Procedure} from "./procedure";
import {Website} from "./website";
import {Cost} from "./cost";
import {ContactPoint} from "./contactPoint";
import {Literal, Predicates, Triple, Uri} from "./triple-array";
import {Language} from "./language";
export class AbbProduct {

    constructor(
        private _id: string,
        private targetAudience: TargetAudience[],
        private _uuid: string,
        private created: Date,
        private modified: Date,
        private contactPoints: ContactPoint[],
        private keywords: string[] | undefined,
        private title: string | undefined,
        private description: string | undefined,
        private additionalDescription: string | undefined,
        private exception: string | undefined,
        private regulation: undefined,
        private theme: Theme[],
        private competentAuthorityLevel: CompetentAuthorityLevel[],
        private competentAuthority: string[],
        private executingAuthorityLevel: ExecutingAuthorityLevel[],
        private executingAuthority: string[],
        private resourceLanguage: undefined,
        private productType: PublicServiceType | undefined,
        private startDate: string | undefined,
        private endDate: string | undefined,
        private productId: string | undefined,
        private yourEuropeCategory: undefined,
        private publicationMedium: undefined,
        private requirement: Requirement | undefined,
        private procedure: Procedure | undefined,
        private moreInfo: Website[],
        private cost: Cost | undefined,
        private financialAdvantage: undefined,
        private spatial: undefined,
        private createdBy: string) {
    }

    get id(): string {
        return this._id;
    }

    get uuid(): string {
        return this._uuid;
    }

    toTriples(): Triple[] {
        const id = new Uri(this._id);
        const publicServiceType = 'http://purl.org/vocab/cpsv#PublicService';

        const triples: (Triple | undefined)[] = [
            Triple.createIfDefined(id, Predicates.type, Uri.createIfDefined(publicServiceType)),
            Triple.createIfDefined(id, Predicates.uuid, Literal.createIfDefined(this._uuid)),
            Triple.createIfDefined(id, Predicates.title, Literal.createIfDefined(this.title, Language.NL)),
            Triple.createIfDefined(id, Predicates.description, Literal.createIfDefined(this.description, Language.NL)),
            Triple.createIfDefined(id, Predicates.additionalDescription, Literal.createIfDefined(this.additionalDescription, Language.NL)),
            Triple.createIfDefined(id, Predicates.exception, Literal.createIfDefined(this.exception, Language.NL)),
            Triple.createIfDefined(id, Predicates.regulation, Literal.createIfDefined(this.regulation, Language.NL)),
                ...this.theme.map(aTheme => Triple.createIfDefined(id, Predicates.thematicArea, Uri.createIfDefined(`https://productencatalogus.data.vlaanderen.be/id/concept/Thema/${aTheme}`))),
                ...this.targetAudience.map(aTargetAudience => Triple.createIfDefined(id, Predicates.targetAudience, Uri.createIfDefined(`https://productencatalogus.data.vlaanderen.be/id/concept/Doelgroep/${aTargetAudience}`))),
                ...this.competentAuthorityLevel.map(aCompetentAuthorityLevel => Triple.createIfDefined(id, Predicates.competentAuthorityLevel, Uri.createIfDefined(`https://productencatalogus.data.vlaanderen.be/id/concept/BevoegdBestuursniveau/${aCompetentAuthorityLevel}`))),
                ...this.competentAuthority.map(aCompetentAuthority => Triple.createIfDefined(id, Predicates.hasCompetentAuthority, Uri.createIfDefined(aCompetentAuthority))),
                ...this.executingAuthorityLevel.map(anExecutingAuthorityLevel => Triple.createIfDefined(id, Predicates.executingAuthorityLevel, Uri.createIfDefined(`https://productencatalogus.data.vlaanderen.be/id/concept/BevoegdBestuursniveau/${anExecutingAuthorityLevel}`))),
                ...this.executingAuthority.map(anExecutingAuthority => Triple.createIfDefined(id, Predicates.hasExecutingAuthority, Uri.createIfDefined(anExecutingAuthority))),
            Triple.createIfDefined(id, Predicates.language, Uri.createIfDefined(this.resourceLanguage)), // TODO verify in Excel
                ...this.keywords.map(aKeyword => Triple.createIfDefined(id, Predicates.keyword, Literal.createIfDefined(aKeyword, Language.NL))), //TODO LPDC-718: keywords might be undefined
            Triple.createIfDefined(id, Predicates.productType, Uri.createIfDefined(this.productType)),
            Triple.createIfDefined(id, Predicates.created, Literal.createIfDefined(this.created.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')),
            Triple.createIfDefined(id, Predicates.modified, Literal.createIfDefined(this.modified.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')),
            Triple.createIfDefined(id, Predicates.startDate, Literal.createIfDefined(this.startDate, undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')),
            Triple.createIfDefined(id, Predicates.endDate, Literal.createIfDefined(this.endDate, undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')),
            Triple.createIfDefined(id, Predicates.productId, Literal.createIfDefined(this.productId)),
            Triple.createIfDefined(id, Predicates.yourEuropeCategory, Uri.createIfDefined(this.yourEuropeCategory)), // TODO verify in Excel
            Triple.createIfDefined(id, Predicates.publicationMedium, Uri.createIfDefined(this.publicationMedium)),
            ...(this.requirement ? this.requirement.toTriples(id) : []),
            ...(this.procedure ? this.procedure.toTriples(id) : []),
                ...this.moreInfo?.map(aMoreInfo => aMoreInfo.toTriples(id)).flat(), // TODO verify if this is correct
            ...(this.cost ? this.cost.toTriples(id) : []),
            Triple.createIfDefined(id, Predicates.hasFinancialAdvantage, Uri.createIfDefined(this.financialAdvantage)),
                ...this.contactPoints?.map(aContactPoint => aContactPoint.toTriples(id)).flat(), // TODO verify if this is correct
            Triple.createIfDefined(id, Predicates.spatial, Uri.createIfDefined(this.spatial)),
            Triple.createIfDefined(id, Predicates.createdBy, Uri.createIfDefined(this.createdBy)),
            // TODO add status
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
