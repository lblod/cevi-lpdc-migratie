import {Requirement} from "./requirement";
import {Procedure} from "./procedure";
import {Website} from "./website";
import {Cost} from "./cost";
import {ContactPoint} from "./contactPoint";
import {Literal, Predicates, Triple, TripleArray, Uri} from "./triple-array";
import {Language} from "./language";

export class AbbProduct {

    constructor(
        private id: string,
        private targetAudience: TargetAudience[],
        private uuid: string,
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
        private moreInfo: Website[] | undefined,
        private cost: Cost | undefined,
        private financialAdvantage: undefined,
        private spatial: undefined,
        private createdBy: string,
        private status: StatusPublicService) {
    }

    toTriples(): TripleArray {
        const id = new Uri(this.id);
        const triples: (Triple | TripleArray)[] = [
            Triple.createIfDefined(id, Predicates.type, new Uri(PublicServiceType)),
            Triple.createIfDefined(id, Predicates.uuid, new Literal(this.uuid)),
            this.title ? Triple.createIfDefined(id, Predicates.title, new Literal(this.title, Language.NL)) : undefined,
            this.description ? Triple.createIfDefined(id, Predicates.description, new Literal(this.description, Language.NL)) : undefined,
            this.additionalDescription ? Triple.createIfDefined(id, Predicates.additionalDescription, new Literal(this.additionalDescription, Language.NL)) : undefined,
            this.exception ? Triple.createIfDefined(id, Predicates.exception, new Literal(this.exception, Language.NL)) : undefined,
            this.regulation ? Triple.createIfDefined(id, Predicates.regulation, new Literal(this.regulation, Language.NL)) : undefined,
            this.theme ? this.theme.map(aTheme => Triple.createIfDefined(id, Predicates.thematicArea, new Uri(aTheme))) : undefined,
            this.targetAudience ? this.targetAudience.map(aTargetAudience => Triple.createIfDefined(id, Predicates.targetAudience, new Uri(aTargetAudience))) : undefined,
            this.competentAuthorityLevel?.map(aCompetentAuthorityLevel => Triple.createIfDefined(id, Predicates.competentAuthorityLevel, new Uri(`https://productencatalogus.data.vlaanderen.be/id/concept/BevoegdBestuursniveau/${aCompetentAuthorityLevel}`))),
            this.competentAuthority?.map(aCompetentAuthority => Triple.createIfDefined(id, Predicates.hasCompetentAuthority, new Uri(aCompetentAuthority))),
            this.executingAuthorityLevel?.map(anExecutingAuthorityLevel => Triple.createIfDefined(id, Predicates.executingAuthorityLevel, new Uri(`https://productencatalogus.data.vlaanderen.be/id/concept/BevoegdBestuursniveau/${anExecutingAuthorityLevel}`))),
            this.executingAuthority?.map(anExecutingAuthority => Triple.createIfDefined(id, Predicates.hasExecutingAuthority, new Uri(anExecutingAuthority))),
            this.resourceLanguage ? this.resourceLanguage.map(aResourceLanguage => Triple.createIfDefined(id, Predicates.language, new Uri(aResourceLanguage))) : undefined, // TODO verify in Excel
            this.keywords ? this.keywords.map(aKeyword => Triple.createIfDefined(id, Predicates.keyword, new Literal(aKeyword, Language.NL))) : undefined,
            this.productType ? Triple.createIfDefined(id, Predicates.productType, new Uri(this.productType)) : undefined,
            this.created ? Triple.createIfDefined(id, Predicates.created, new Literal(this.created.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')) : undefined,
            this.modified ? Triple.createIfDefined(id, Predicates.modified, new Literal(this.created.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')) : undefined,
            this.startDate ? Triple.createIfDefined(id, Predicates.startDate, new Literal(this.startDate, undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')) : undefined,
            this.endDate ? Triple.createIfDefined(id, Predicates.endDate, new Literal(this.endDate, undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')) : undefined,
            this.productId ? Triple.createIfDefined(id, Predicates.productId, new Literal(this.productId)) : undefined,
            this.yourEuropeCategory ? this.yourEuropeCategory.map(aYourEuropeCategory => Triple.createIfDefined(id, Predicates.yourEuropeCategory, new Uri(aYourEuropeCategory))) : undefined, // TODO verify in Excel
            this.publicationMedium ? Triple.createIfDefined(id, Predicates.publicationMedium, new Uri(this.publicationMedium)) : undefined,
            this.requirement?.toTriples(id),
            // TODO add follows triple
            this.procedure ? this.procedure.toTriples() : undefined,
            this.moreInfo ? this.moreInfo.map(aMoreInfo => aMoreInfo.toTriples()) : undefined,
            this.cost ? this.cost.map(aCost => aCost.toTriples()) : undefined,
            this.financialAdvantage ? Triple.createIfDefined(id, Predicates.hasFinancialAdvantage, new Uri(this.financialAdvantage)) : undefined,
            // TODO add hasContactPoint triple
            this.contactPoints ? this.contactPoints.map(aContactPoint => aContactPoint.toTriples()) : undefined,
            this.spatial ? Triple.createIfDefined(id, Predicates.spatial, new Uri(this.spatial)) : undefined,
            // TODO add createdBy
            // TODO add status
        ];

        return new TripleArray(triples);
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
    Derden = 'Derden',
    Vlaams = 'Vlaams',
    Provinciaal = 'Provinciaal',
    Federaal = 'Federaal',
    Europees = 'Europees',
}

export enum CompetentAuthorityLevel {
    Vlaams = 'Vlaams',
    Federaal = 'Federaal',
    Lokaal = 'Lokaal',
    Provinciaal = 'Provinciaal',
    Europees = 'Europees',
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

export enum StatusPublicService {
    concept = 'CONCEPT',
    sent = 'SENT',
    archived = 'ARCHIVED'
}