import {AbbProduct} from "./abbProduct";
import {Literal, Predicates, Triple, TripleArray, Uri} from "./triple-array";
import {Language} from "./language";
import {Requirement} from "./requirement";

export const PublicServiceType = 'http://purl.org/vocab/cpsv#PublicService';
export function mapAbbProductToTriples(abbProduct: AbbProduct): TripleArray {
    const id = new Uri(abbProduct.id);
    const triples = [
        new Triple(id, Predicates.type, new Uri(PublicServiceType)),
        new Triple(id, Predicates.uuid, new Literal(abbProduct.uuid)),
        abbProduct.title ? new Triple(id, Predicates.title, new Literal(abbProduct.title, Language.NL)) : undefined,
        abbProduct.description ? new Triple(id, Predicates.description, new Literal(abbProduct.description, Language.NL)) : undefined,
        abbProduct.additionalDescription ? new Triple(id, Predicates.additionalDescription, new Literal(abbProduct.additionalDescription, Language.NL)) : undefined,
        abbProduct.exception ? new Triple(id, Predicates.exception, new Literal(abbProduct.exception, Language.NL)) : undefined,
        abbProduct.regulation ? new Triple(id, Predicates.regulation, new Literal(abbProduct.regulation, Language.NL)) : undefined,
        abbProduct.theme ? abbProduct.theme.map(aTheme => new Triple(id, Predicates.thematicArea, new Uri(aTheme))) : undefined,
        abbProduct.targetAudience ? abbProduct.targetAudience.map(aTargetAudience => new Triple(id, Predicates.targetAudience, new Uri(aTargetAudience))) : undefined,
        abbProduct.competentAuthorityLevel ? abbProduct.competentAuthorityLevel.map(aCompetentAuthorityLevel => new Triple(id, Predicates.competentAuthorityLevel, new Uri(aCompetentAuthorityLevel))) : undefined,
        abbProduct.executingAuthorityLevel ? abbProduct.executingAuthorityLevel.map(anExecutingAuthorityLevel => new Triple(id, Predicates.executingAuthorityLevel, new Uri(anExecutingAuthorityLevel))) : undefined,
        abbProduct.resourceLanguage ? abbProduct.resourceLanguage.map(aResourceLanguage => new Triple(id, Predicates.language, new Uri(aResourceLanguage))) : undefined ,
        abbProduct.keywords ? abbProduct.keywords.map(aKeyword => new Triple(id, Predicates.keyword, new Literal(aKeyword, Language.NL))) : undefined,
        abbProduct.productType ? new Triple(id, Predicates.productType, new Uri(abbProduct.productType)) : undefined,
        abbProduct.created ? new Triple(id, Predicates.created, new Literal(abbProduct.created.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')) : undefined,
        abbProduct.modified ? new Triple(id, Predicates.modified, new Literal(abbProduct.created.toISOString(), undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')) : undefined,
        abbProduct.startDate ? new Triple(id, Predicates.startDate, new Literal(abbProduct.startDate, undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')) : undefined,
        abbProduct.endDate ? new Triple(id, Predicates.endDate, new Literal(abbProduct.endDate, undefined, 'http://www.w3.org/2001/XMLSchema#dateTime')) : undefined,
        abbProduct.productId ? new Triple(id, Predicates.productId, new Literal(abbProduct.productId)) : undefined,
        abbProduct.yourEuropeCategory ? abbProduct.yourEuropeCategory.map(aYourEuropeCategory => new Triple(id, Predicates.yourEuropeCategory, new Uri(aYourEuropeCategory))) : undefined,
        abbProduct.publicationMedium ? new Triple(id, Predicates.publicationMedium, new Uri(abbProduct.publicationMedium)) : undefined,
        abbProduct.requirement ? abbProduct.requirement.toTriples() : undefined,
        new Triple(id, Predicates.follows, this.procedure),
        new Triple(id, Predicates.hasMoreInfo, this.moreInfo),
        new Triple(id, Predicates.hasCost, this.cost),
        new Triple(id, Predicates.hasFinancialAdvantage, this.financialAdvantage),
        ...this.contactPoints.map(contactPoint => new Triple(id, Predicates.hasContactPoint, contactPoint)),
        new Triple(id, Predicates.spatial, this.spatial),
    ];


    return new TripleArray(triples);

    async buildAndPersist(request, organisationId: string): Promise<any> {
        const publicService = this.buildTripleArray();
        await insertTriples(request, `http://mu.semte.ch/graphs/organizations/${organisationId}/LoketLB-LPDCGebruiker`, publicService.asStringArray());
        return publicService;
    }
}