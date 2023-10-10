import {Requirement} from "./requirement";
import {Procedure} from "./procedure";
import {Website} from "./website";
import {Cost} from "./cost";
import {ContactPoint} from "./contactPoint";

export class AbbProduct {

    constructor(
        private id: string,
        private targetAudience: TargetAudience[],
        private uuid: string,
        private created: Date,
        private modified: Date,
        private contactPoints: ContactPoint[],
        private keywords: string[],
        private title: string | undefined,
        private description: string | undefined,
        private additionalDescription: string | undefined,
        private exception: string | undefined,
        private regulation: undefined,
        private theme: Theme[],
        private competentAuthorxityLevel: CompetentAuthorityLevel[],
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