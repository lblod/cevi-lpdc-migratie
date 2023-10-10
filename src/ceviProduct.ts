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

    constructor(public id: string,
                public source: Source,
                public targetGroups: TargetGroup[],
                public productType: ProductType,
                public themes: CeviTheme[],
                public deliveringDepartments: Department[],
                public authorisedDepartments: Department[],
                public keywords: Keyword[],
                public name?: string,
                public title?: string,
                public description?: string,
                public startDate?: string,
                public endDate?: string,
                public conditions?: string,
                public bringToApply?: string,
                public legalText?: string,
                public amountToApply?: string,
                public procedure?: string,
                public exceptions?: string,
                public additionalInfo?: string,
                public infoUrls?: Url[],
                public forms?: Form[],
                public enrichedLinks?: string,
                public defaultTheme?: DefaultTheme,
                public relatedProducts?: ProductReference,
                public attachments?: string,
                public geographicalApplicationAreas?: {
                    federalApplicationAreas?: string;
                    regionalApplicationAreas?: string;
                    provincialApplicationAreas?: string;
                    municipalApplicationAreas?: string
                },
                public clusters?: string,
                public uploadedAttachments?: UploadedAttachment[],
                public timestampLastUpdate?: string,
                public isInternal?: string) {
    }
}