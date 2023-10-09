import {Requirement} from "./requirement";
import {Procedure} from "./procedure";
import {Website} from "./website";
import {Cost} from "./cost";
import {ContactPoint} from "./contactPoint";

export class AbbProduct {
    id: string;
    targetAudience: TargetAudience[];
    uuid: string;
    created: Date;
    modified: Date;
    contactPoints: ContactPoint[];
    keywords?: string[];
    title?: string;
    description?: string;
    additionalDescription?: string;
    exception?: string;
    regulation?: string;
    theme?: Theme[];
    competentAuthorityLevel?: CompetentAuthorityLevel[];
    competentAuthority?: string[];
    executingAuthorityLevel?: ExecutingAuthorityLevel[];
    executingAuthority?: string[];
    resourceLanguage?: ResourceLanguage[];
    productType?: PublicServiceType;
    startDate?: string;
    endDate?: string;
    productId?: string;
    yourEuropeCategory?: YourEuropeCategory[];
    publicationMedium?: PublicationMedium;
    requirement?: Requirement;
    procedure?: Procedure;
    moreInfo?: Website[];
    cost?: Cost[];
    financialAdvantage?: string;
    spatial?: string;
    createdBy?: string;
    status?: StatusPublicService;

    constructor(id: string, targetAudience: TargetAudience[], uuid: string, created: Date, modified: Date, contactPoints: ContactPoint[], keywords: string[], title?: string, description?: string, additionalDescription?: string, exception?: string, regulation?: string, theme?: Theme[], competentAuthorityLevel?: CompetentAuthorityLevel[], competentAuthority?: string[], executingAuthorityLevel?: ExecutingAuthorityLevel[], executingAuthority?: string[], resourceLanguage?: ResourceLanguage[], productType?: PublicServiceType, startDate?: string, endDate?: string, productId?: string, yourEuropeCategory?: YourEuropeCategory[], publicationMedium?: PublicationMedium, requirement?: Requirement, procedure?: Procedure, moreInfo?: Website[], cost?: Cost[], financialAdvantage?: string, spatial?: string, createdBy?: string, status?: StatusPublicService) {
        this.id = id;
        this.targetAudience = targetAudience;
        this.uuid = uuid;
        this.created = created;
        this.modified = modified;
        this.contactPoints = contactPoints;
        this.keywords = keywords;
        this.title = title;
        this.description = description;
        this.additionalDescription = additionalDescription;
        this.exception = exception;
        this.regulation = regulation;
        this.theme = theme;
        this.competentAuthorityLevel = competentAuthorityLevel;
        this.competentAuthority = competentAuthority;
        this.executingAuthorityLevel = executingAuthorityLevel;
        this.executingAuthority = executingAuthority;
        this.resourceLanguage = resourceLanguage;
        this.productType = productType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.productId = productId;
        this.yourEuropeCategory = yourEuropeCategory;
        this.publicationMedium = publicationMedium;
        this.requirement = requirement;
        this.procedure = procedure;
        this.moreInfo = moreInfo;
        this.cost = cost;
        this.financialAdvantage = financialAdvantage;
        this.spatial = spatial;
        this.createdBy = createdBy;
        this.status = status;
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