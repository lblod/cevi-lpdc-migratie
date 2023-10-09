import {
    Source,
    ProductType,
    Url,
    Form,
    Keyword,
    TargetGroup,
    CeviTheme,
    DefaultTheme,
    ProductReference,
    Department,
    UploadedAttachment
} from './types';

export class CeviProduct {
    id: string;
    source: Source;
    targetGroups: TargetGroup[];
    productType: ProductType;
    themes: CeviTheme[];
    deliveringDepartments: Department[];
    authorisedDepartments: Department[];
    keywords: Keyword[];
    name?: string;
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    conditions?: string;
    bringToApply?: string;
    legalText?: string;
    amountToApply?: string;
    procedure?: string;
    exceptions?: string;
    additionalInfo?: string;
    infoUrls?: Url[];
    forms?: Form[];
    enrichedLinks?: string;
    defaultTheme?: DefaultTheme;
    relatedProducts?: ProductReference;
    attachments?: string;
    geographicalApplicationAreas?: {
        federalApplicationAreas?: string,
        regionalApplicationAreas?: string,
        provincialApplicationAreas?: string,
        municipalApplicationAreas?: string,
    }
    clusters?: string;
    uploadedAttachments?: UploadedAttachment[];
    timestampLastUpdate?: string;
    isInternal?: string;


    constructor(id: string, source: Source, targetGroups: TargetGroup[], productType: ProductType, themes: CeviTheme[], deliveringDepartments: Department[], authorisedDepartments: Department[], keywords: Keyword[], name?: string, title?: string, description?: string, startDate?: string, endDate?: string, conditions?: string, bringToApply?: string, legalText?: string, amountToApply?: string, procedure?: string, exceptions?: string, additionalInfo?: string, infoUrls?: Url[], forms?: Form[], enrichedLinks?: string, defaultTheme?: DefaultTheme, relatedProducts?: ProductReference, attachments?: string, geographicalApplicationAreas?: {
        federalApplicationAreas?: string;
        regionalApplicationAreas?: string;
        provincialApplicationAreas?: string;
        municipalApplicationAreas?: string
    }, clusters?: string, uploadedAttachments?: UploadedAttachment[], timestampLastUpdate?: string, isInternal?: string) {
        this.id = id;
        this.source = source;
        this.targetGroups = targetGroups;
        this.productType = productType;
        this.themes = themes;
        this.deliveringDepartments = deliveringDepartments;
        this.authorisedDepartments = authorisedDepartments;
        this.keywords = keywords;
        this.name = name;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.conditions = conditions;
        this.bringToApply = bringToApply;
        this.legalText = legalText;
        this.amountToApply = amountToApply;
        this.procedure = procedure;
        this.exceptions = exceptions;
        this.additionalInfo = additionalInfo;
        this.infoUrls = infoUrls;
        this.forms = forms;
        this.enrichedLinks = enrichedLinks;
        this.defaultTheme = defaultTheme;
        this.relatedProducts = relatedProducts;
        this.attachments = attachments;
        this.geographicalApplicationAreas = geographicalApplicationAreas;
        this.clusters = clusters;
        this.uploadedAttachments = uploadedAttachments;
        this.timestampLastUpdate = timestampLastUpdate;
        this.isInternal = isInternal;
    }
}