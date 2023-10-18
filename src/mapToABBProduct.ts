import {v4 as uuid} from 'uuid';
import {CeviProduct} from "./ceviProduct";
import {
    AbbProduct,
    CompetentAuthorityLevel,
    ExecutingAuthorityLevel,
    PublicServiceType,
    TargetAudience,
    Theme
} from "./abbProduct";
import {Evidence, Requirement} from "./requirement";
import {Procedure} from "./procedure";
import {CeviTheme, Department, Form, Keyword, ProductType, Source, TargetGroup, Url} from "./types";
import {Website} from "./website";
import {Cost} from "./cost";
import {ContactPoint} from "./contactPoint";
import {ContactPointAddress} from "./contactPointAddress";
import {findUniqueConceptIdForProductId} from "./query-concept-for-product-id";
import {Logger} from "./logger";

export async function mapToABBProduct(product: CeviProduct, migrationDate: Date, lokaalBestuurUrl: string, lokaalBestuurNis2019Url: string, sparqlClientUrl: string): Promise<AbbProduct> {

    if (product.title?.toLowerCase().includes('te verwijderen')) {
        throw Error(`Title of cevi product contains \'te verwijderen\'`);
    }

    const instanceUuid = uuid();
    const competentAuthorityLevel: CompetentAuthorityLevel[] = mapAuthorisedDepartmentsToCompetentAuthorityLevel(product.authorisedDepartments);
    const competentAuthority: string[] = mapCompetentAuthorityBasedOnCompetentAuthorityLevel(competentAuthorityLevel, lokaalBestuurUrl);
    const executingAuthorityLevel: ExecutingAuthorityLevel[] = mapDeliveringDepartmentsToExecutingAuthorityLevel(product.deliveringDepartments);
    const executingAuthority: string[] = mapExecutingAuthorityBasedOnExecutingAuthorityLevel(executingAuthorityLevel, lokaalBestuurUrl);
    const productId: string | undefined = mapProductId(product.id, product.source);

    return new AbbProduct(
        `http://data.lblod.info/id/public-service/${instanceUuid}`,
        mapTargetGroupsToTargetAudience(product.targetGroups),
        instanceUuid,
        migrationDate,
        migrationDate,
        mapContactPoints(product.deliveringDepartments, product.authorisedDepartments),
        mapKeywords(product.keywords),
        product.title,
        product.description,
        product.additionalInfo,
        product.exceptions,
        undefined,
        mapCeviThemesToTheme(product.themes),
        competentAuthorityLevel,
        competentAuthority,
        executingAuthorityLevel,
        executingAuthority,
        undefined,
        mapProductType(product.productType),
        product.startDate ? new Date(product.startDate) : undefined,
        product.endDate ? new Date(product.endDate) : undefined,
        productId,
        await mapConceptUrl(productId, sparqlClientUrl),
        undefined,
        undefined,
        mapConditionsToRequirement(product.conditions, product.bringToApply),
        mapProcedureAndForms(product.procedure, product.forms),
        mapInfoUrlsToMoreInfo(product.infoUrls),
        mapAmountToApplyToCost(product.amountToApply),
        undefined,
        lokaalBestuurNis2019Url,
        lokaalBestuurUrl,
    )
}


export function mapConditionsToRequirement(conditions: string | undefined, bringToApply: string | undefined): Requirement | undefined {
    if (bringToApply || conditions) {
        return new Requirement(
            uuid(),
            conditions || 'Bewijsstukken mee te brengen',
            bringToApply ? new Evidence(uuid(), bringToApply) : undefined);
    }
    Logger.log(`No requirement nor evidence information`);
    return undefined;
}

export function mapProcedureAndForms(procedure: string | undefined, forms: Form[] | undefined): Procedure | undefined {
    if (procedure || forms) {
        return new Procedure(
            uuid(),
            procedure,
            mapFormsToWebsite(forms));
    }
    Logger.log(`No Procedure nor Forms information"`);
    return undefined;
}

function mapFormsToWebsite(forms: Form[] | undefined): Website[] {
    if (forms) {
        return forms?.map((form: Form) => new Website(
            uuid(),
            undefined,
            form.title,
            prependHttpsIfNeeded(form.location)));
    }
    return [];
}

export function mapInfoUrlsToMoreInfo(infoUrls: Url[] | undefined): Website[] {
    if (infoUrls) {
        return infoUrls?.map((infoUrl: Url) => new Website(
            uuid(),
            infoUrl.title,
            undefined,
            prependHttpsIfNeeded(infoUrl.location)));
    }
    return [];
}

function prependHttpsIfNeeded(url: string): string {
    if (url.startsWith("http://")
        || url.startsWith("https://")) {
        return url;
    } else {
        Logger.log(`prepending 'https//' in front of url ${url}`);
        return 'https://' + url;
    }
}

export function mapAmountToApplyToCost(amountToApply: string | undefined): Cost | undefined {
    return amountToApply ? new Cost(uuid(), amountToApply) : undefined;
}

export function mapContactPoints(deliveringDepartments: Department[], authorisedDepartments: Department[]): ContactPoint[] {
    const contactPointsForDeliveringDepartments = mapDepartmentAddressesToContactPoints(deliveringDepartments);
    if (contactPointsForDeliveringDepartments.length > 0) {
        return contactPointsForDeliveringDepartments;
    } else {
        return mapDepartmentAddressesToContactPoints(authorisedDepartments);
    }
}

function mapDepartmentAddressesToContactPoints(departments: Department[]): ContactPoint[] {
    return departments.map(mapDepartmentAddressToContactPoint)
        .filter((contactPoint): contactPoint is ContactPoint => !!contactPoint);
}

export function mapDepartmentAddressToContactPoint(department: Department): ContactPoint | undefined {
    if (!department.address?.website
        && !department.address?.email
        && !department.address?.phone
        && !department.address?.openingHours
        && !department.address?.street
        && !department.address?.houseNumber
        && !department.address?.boxNumber
        && !department.address?.zipCode
        && !department.address?.municipality) {
        Logger.log(`No ContactPoint information for Department "${department.name}"`);
        return undefined;
    }
    return new ContactPoint(
        uuid(),
        department.address?.website ? prependHttpsIfNeeded(department.address?.website) : undefined,
        department.address?.email,
        department.address?.phone,
        department.address?.openingHours,
        new ContactPointAddress(
            uuid(),
            department.address?.street,
            department.address?.houseNumber,
            department.address?.boxNumber,
            department.address?.zipCode,
            department.address?.municipality,
            'België'
        )
    );
}

function mapTargetGroupToTargetAudience(ceviTargetGroup: TargetGroup): TargetAudience | undefined {
    const targetAudienceMapping: Record<string, TargetAudience> = {
        'Andere organisatie': TargetAudience.Organisatie,
        'Burger': TargetAudience.Burger,
        'Lokaal bestuur': TargetAudience.LokaalBestuur,
        'Lokale besturen': TargetAudience.LokaalBestuur,
        'Nieuwe inwoner': TargetAudience.Burger,
        'Onderneming': TargetAudience.Onderneming,
        'Organisatie': TargetAudience.Organisatie,
        'Vereniging': TargetAudience.Vereniging,
        'Vlaamse overheid': TargetAudience.VlaamseOverheid
    }
    const abbTargetAudience = targetAudienceMapping[ceviTargetGroup.value];
    if (abbTargetAudience) {
        return abbTargetAudience;
    } else {
        Logger.log(`Cevi TargetGroup value '${ceviTargetGroup.value}' cannot be mapped`);
        return undefined;
    }
}

export function mapTargetGroupsToTargetAudience(targetGroups: TargetGroup[]): TargetAudience[] {
    return targetGroups
        .map(mapTargetGroupToTargetAudience)
        .filter((targetAudience): targetAudience is TargetAudience => !!targetAudience);
}

export function mapProductType(ceviProductType: ProductType): PublicServiceType | undefined {
    const publicServiceTypeMapping: Record<string, PublicServiceType> = {
        'Advies en begeleiding': PublicServiceType.AdviesBegeleiding,
        'Beschikbaar stellen van infrastructuur en materiaal': PublicServiceType.InfrastructuurMateriaal,
        'Bewijs': PublicServiceType.Bewijs,
        'Financieel voordeel': PublicServiceType.FinancieelVoordeel,
        'Financiële verplichting': PublicServiceType.FinancieleVerplichting,
        'Infrastructuur en materiaal': PublicServiceType.InfrastructuurMateriaal,
        'Toelating': PublicServiceType.Toelating,
        'Voorwerp': PublicServiceType.Voorwerp
    }
    const abbProductType: PublicServiceType = publicServiceTypeMapping[ceviProductType.value];
    if (abbProductType) {
        return abbProductType;
    } else {
        Logger.log(`Cevi ProductType value '${ceviProductType.value}' cannot be mapped`);
        return undefined;
    }
}

function mapCeviThemeToTheme(ceviTheme: CeviTheme): Theme | undefined {
    const themeMapping: Record<string, Theme> = {
        'Bouwen en Wonen': Theme.BouwenWonen,
        'Burger en Overheid': Theme.BurgerOverheid,
        'Cultuur, Sport en Vrije Tijd': Theme.CultuurSportVrijeTijd,
        'Economie en Werk': Theme.EconomieWerk,
        'Energie': Theme.MilieuEnergie,
        'Energieloket': Theme.MilieuEnergie,
        'Milieu en Energie': Theme.MilieuEnergie,
        'Mobiliteit en Openbare Werken': Theme.MobiliteitOpenbareWerken,
        'Onderwijs en Wetenschap': Theme.OnderwijsWetenschap,
        'Welzijn en Gezondheid': Theme.WelzijnGezondheid
    }
    if (ceviTheme.value) {
        const abbTheme: Theme = themeMapping[ceviTheme.value];
        if (abbTheme) {
            return abbTheme;
        } else {
            Logger.log(`Cevi Theme value '${ceviTheme.value}' cannot be mapped`);
            return undefined;
        }
    } else {
        Logger.log('No ceviTheme value');
        return undefined;
    }
}

export function mapCeviThemesToTheme(ceviThemes: CeviTheme[]): Theme[] {
    return ceviThemes
        .map(mapCeviThemeToTheme)
        .filter((theme): theme is Theme => !!theme);
}

export function mapDeliveringDepartmentsToExecutingAuthorityLevel(ceviDepartments: Department[]): ExecutingAuthorityLevel[] {
    let executingAuthorityLevelsWithAtLeastLokaal: ExecutingAuthorityLevel[] = [...ceviDepartments.map(mapDeliveringDepartmentToExecutingAuthorityLevel), ExecutingAuthorityLevel.Lokaal];
    return [...new Set(executingAuthorityLevelsWithAtLeastLokaal)].sort();
}

function mapDeliveringDepartmentToExecutingAuthorityLevel(ceviDepartment: Department): ExecutingAuthorityLevel {
    switch (ceviDepartment.name) {
        case 'Vlaamse overheid':
            return ExecutingAuthorityLevel.Vlaams;
        case  'Federale overheid':
            return ExecutingAuthorityLevel.Federaal;
        default:
            return ExecutingAuthorityLevel.Lokaal;
    }
}

export function mapExecutingAuthorityBasedOnExecutingAuthorityLevel(abbExecutingAuthorityLevel: ExecutingAuthorityLevel[], lokaalBestuurUrl: string): string[] {
    return abbExecutingAuthorityLevel
        .map((abbExecutingAuthorityLevel: ExecutingAuthorityLevel) => {
            if (abbExecutingAuthorityLevel === ExecutingAuthorityLevel.Vlaams) {
                return 'https://data.vlaanderen.be/id/organisatie/OVO000001';
            } else if (abbExecutingAuthorityLevel === ExecutingAuthorityLevel.Federaal) {
                return 'https://data.vlaanderen.be/id/organisatie/OVO027227';
            } else {
                return lokaalBestuurUrl;
            }
        })
}

export function mapAuthorisedDepartmentsToCompetentAuthorityLevel(ceviDepartments: Department[]): CompetentAuthorityLevel[] {
    return [...new Set(ceviDepartments.map(mapAuthorisedDepartmentToCompetentAuthorityLevel))].sort()
}

function mapAuthorisedDepartmentToCompetentAuthorityLevel(ceviDepartment: Department): CompetentAuthorityLevel {
    switch (ceviDepartment.name) {
        case 'Vlaamse overheid':
            return CompetentAuthorityLevel.Vlaams;
        case  'Federale overheid':
            return CompetentAuthorityLevel.Federaal;
        default:
            return CompetentAuthorityLevel.Lokaal;
    }
}

export function mapCompetentAuthorityBasedOnCompetentAuthorityLevel(abbCompetentAuthorityLevel: CompetentAuthorityLevel[], lokaalBestuurUrl: string): string [] {
    return abbCompetentAuthorityLevel.map((abbCompetentAuthorityLevel: CompetentAuthorityLevel) => {
        if (abbCompetentAuthorityLevel === CompetentAuthorityLevel.Vlaams) {
            return 'https://data.vlaanderen.be/id/organisatie/OVO000001';
        } else if (abbCompetentAuthorityLevel === CompetentAuthorityLevel.Federaal) {
            return 'https://data.vlaanderen.be/id/organisatie/OVO027227';
        } else {
            return lokaalBestuurUrl;
        }
    })
}

export function mapKeywords(ceviKeywords: Keyword[]): string[] {
    return ceviKeywords
        .map((ceviKeyword) => ceviKeyword?.value)
        .filter((string): string is string => !!string);
}

export function mapProductId(ceviProductId: string, ceviProductSource: Source): string | undefined {
    if (ceviProductSource?.value === 'IPDC') {
        return ceviProductId;
    } else {
        return undefined;
    }
}

export async function mapConceptUrl(productId: string | undefined, sparqlClientUrl: string): Promise<string | undefined> {
    if (productId) {
        return await findUniqueConceptIdForProductId(productId, sparqlClientUrl);
    } else {
        return undefined;
    }
}
