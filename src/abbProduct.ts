import {Requirement} from "./requirement";
import {Procedure} from "./procedure";
import {Website} from "./website";
import {Cost} from "./cost";
import {ContactPoint} from "./contactPoint";
import {Literal, Predicates, Triple, Uri} from "./triple";
import {Language} from "./language";
import {LegalResource} from "./legal-resource";

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
        private conceptSnapshotUrl: string | undefined,
        private _requirement: Requirement | undefined,
        private _procedure: Procedure | undefined,
        private _moreInfo: Website[],
        private _cost: Cost | undefined,
        private dutchLanguageVariant: Language,
        private spatial: string,
        private createdBy: string,
        private _legalResources: LegalResource[]) {
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

    get legalResources(): LegalResource[] {
        return this._legalResources;
    }

    toTriples(languageVersion: Language): Triple[] {
        const id = new Uri(this._id);
        const publicServiceType = 'https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#InstancePublicService';

        const triples: (Triple | undefined)[] = [
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
            Triple.createIfDefined(id, Predicates.productType, Uri.createIfDefined(this.productType ? `https://productencatalogus.data.vlaanderen.be/id/concept/Type/${this.productType}` : undefined)),
            Triple.createIfDefined(id, Predicates.created, Literal.createIfDefined(this.created.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')),
            Triple.createIfDefined(id, Predicates.modified, Literal.createIfDefined(this.modified.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')),
            Triple.createIfDefined(id, Predicates.startDate, Literal.createIfDefined(this.startDate?.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')),
            Triple.createIfDefined(id, Predicates.endDate, Literal.createIfDefined(this.endDate?.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')),
            Triple.createIfDefined(id, Predicates.productId, Literal.createIfDefined(this.productId)),
            Triple.createIfDefined(id, Predicates.source, Uri.createIfDefined(this.conceptUrl)),
            Triple.createIfDefined(id, Predicates.hasVersionedSource, Uri.createIfDefined(this.conceptSnapshotUrl)),
            ...(this.requirement ? this.requirement.toTriples(id, 0, languageVersion) : []),
            ...(this._procedure ? this._procedure.toTriples(id, 0, languageVersion) : []),
            ...this._moreInfo?.map((aMoreInfo, index) => aMoreInfo.toTriples(id, Predicates.hasMoreInfo, index, languageVersion)).flat(),
            ...(this._cost ? this._cost.toTriples(id, 0, languageVersion) : []),
            ...this._contactPoints?.map((aContactPoint, index) => aContactPoint.toTriples(id, index, languageVersion)).flat(),
            Triple.createIfDefined(id, Predicates.dutchLanguageVariant, Literal.create(this.dutchLanguageVariant)),
            Triple.createIfDefined(id, Predicates.needsConversionFromFormalToInformal, Literal.createIfDefined('false', undefined,'http://www.w3.org/2001/XMLSchema#boolean')),
            Triple.createIfDefined(id, Predicates.forMunicipalityMerger, Literal.createIfDefined('false', undefined,'http://www.w3.org/2001/XMLSchema#boolean')),
            Triple.createIfDefined(id, Predicates.spatial, Uri.createIfDefined(this.spatial)),
            Triple.createIfDefined(id, Predicates.createdBy, Uri.createIfDefined(this.createdBy)),
            Triple.createIfDefined(id, Predicates.status, Uri.createIfDefined('http://lblod.data.gift/concepts/instance-status/ontwerp')), //concept
            ...this._legalResources?.map((legalResource, index) => legalResource.toTriples(id, languageVersion)).flat()
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
