import {AbbProduct} from "./abbProduct";
import {Literal, Predicates, Triple, TripleArray, Uri} from "./triple-array";
import {Language} from "./language";
import {Requirement} from "./requirement";

export const PublicServiceType = 'http://purl.org/vocab/cpsv#PublicService';
export function mapAbbProductToTriples(abbProduct: AbbProduct): TripleArray {
    const id = new Uri(abbProduct.id);
    const triples = [
        Triple.createIfDefined(id, Predicates.type, new Uri(PublicServiceType)),
        Triple.createIfDefined(id, Predicates.uuid, new Literal(abbProduct.uuid)),
        abbProduct.title ? Triple.createIfDefined(id, Predicates.title, new Literal(abbProduct.title, Language.NL)) : undefined,
        abbProduct.description ? Triple.createIfDefined(id, Predicates.description, new Literal(abbProduct.description, Language.NL)) : undefined,
        abbProduct.additionalDescription ? Triple.createIfDefined(id, Predicates.additionalDescription, new Literal(abbProduct.additionalDescription, Language.NL)) : undefined,
        abbProduct.exception ? Triple.createIfDefined(id, Predicates.exception, new Literal(abbProduct.exception, Language.NL)) : undefined,
        abbProduct.regulation ? Triple.createIfDefined(id, Predicates.regulation, new Literal(abbProduct.regulation, Language.NL)) : undefined,
        abbProduct.theme ? abbProduct.theme.map(aTheme => Triple.createIfDefined(id, Predicates.thematicArea, new Uri(aTheme))) : undefined,
        abbProduct.targetAudience ? abbProduct.targetAudience.map(aTargetAudience => Triple.createIfDefined(id, Predicates.targetAudience, new Uri(aTargetAudience))) : undefined,
        abbProduct.competentAuthorityLevel?.map(aCompetentAuthorityLevel => Triple.createIfDefined(id, Predicates.competentAuthorityLevel, new Uri(`https://productencatalogus.data.vlaanderen.be/id/concept/BevoegdBestuursniveau/${aCompetentAuthorityLevel}`))),
        abbProduct.competentAuthority?.map(aCompetentAuthority => Triple.createIfDefined(id, Predicates.hasCompetentAuthority, new Uri(aCompetentAuthority))),
        abbProduct.executingAuthorityLevel?.map(anExecutingAuthorityLevel => Triple.createIfDefined(id, Predicates.executingAuthorityLevel, new Uri(`https://productencatalogus.data.vlaanderen.be/id/concept/BevoegdBestuursniveau/${anExecutingAuthorityLevel}`))),
        abbProduct.executingAuthority?.map(anExecutingAuthority => Triple.createIfDefined(id, Predicates.hasExecutingAuthority, new Uri(anExecutingAuthority))),
        abbProduct.resourceLanguage ? abbProduct.resourceLanguage.map(aResourceLanguage => Triple.createIfDefined(id, Predicates.language, new Uri(aResourceLanguage))) : undefined,
        abbProduct.keywords ? abbProduct.keywords.map(aKeyword => Triple.createIfDefined(id, Predicates.keyword, new Literal(aKeyword, Language.NL))) : undefined,
        abbProduct.productType ? Triple.createIfDefined(id, Predicates.productType, new Uri(abbProduct.productType)) : undefined,
        abbProduct.created ? Triple.createIfDefined(id, Predicates.created, new Literal(abbProduct.created.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')) : undefined,
        abbProduct.modified ? Triple.createIfDefined(id, Predicates.modified, new Literal(abbProduct.created.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')) : undefined,
        abbProduct.startDate ? Triple.createIfDefined(id, Predicates.startDate, new Literal(abbProduct.startDate, undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')) : undefined,
        abbProduct.endDate ? Triple.createIfDefined(id, Predicates.endDate, new Literal(abbProduct.endDate, undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')) : undefined,
        abbProduct.productId ? Triple.createIfDefined(id, Predicates.productId, new Literal(abbProduct.productId)) : undefined,
        abbProduct.yourEuropeCategory ? abbProduct.yourEuropeCategory.map(aYourEuropeCategory => Triple.createIfDefined(id, Predicates.yourEuropeCategory, new Uri(aYourEuropeCategory))) : undefined,
        abbProduct.publicationMedium ? Triple.createIfDefined(id, Predicates.publicationMedium, new Uri(abbProduct.publicationMedium)) : undefined,
        abbProduct.requirement?.toTriples(id),
        // TODO add follows triple
        abbProduct.procedure ? abbProduct.procedure.toTriples() : undefined,
        abbProduct.moreInfo ? abbProduct.moreInfo.map(aMoreInfo => aMoreInfo.toTriples()) : undefined,
        abbProduct.cost ? abbProduct.cost.map(aCost => aCost.toTriples()) : undefined,
        abbProduct.financialAdvantage ? Triple.createIfDefined(id, Predicates.hasFinancialAdvantage, new Uri(abbProduct.financialAdvantage)) : undefined,
        // TODO add hasContactPoint triple
        abbProduct.contactPoints ? abbProduct.contactPoints.map(aContactPoint => aContactPoint.toTriples()) : undefined,
        abbProduct.spatial ? Triple.createIfDefined(id, Predicates.spatial, new Uri(abbProduct.spatial)) : undefined,
        // TODO add createdBy
        // TODO add status
    ];


    return new TripleArray(triples);

    async buildAndPersist(request, organisationId: string): Promise<any> {
        const publicService = this.buildTripleArray();
        await insertTriples(request, `http://mu.semte.ch/graphs/organizations/${organisationId}/LoketLB-LPDCGebruiker`, publicService.asStringArray());
        return publicService;
    }
}