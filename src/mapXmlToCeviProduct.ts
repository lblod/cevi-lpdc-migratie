import {CeviProduct} from "./ceviProduct";
import {Form, Keyword, TargetGroup, CeviTheme, UploadedAttachment, Url, Department, Address} from "./types";

export function mapXmlToCeviProduct(product: any): CeviProduct {

    const keyword: Keyword[] = verifyKeywordsValueInXml(product.Keywords?.Keyword);
    const uploadedAttachment: UploadedAttachment[] = verifyUploadedAttachmentsValueInXml(product.UploadedAttachments?.UploadedAttachment);
    const url: Url[] = verifyInfoUrlsValueInXml(product.InfoUrls?.Url);
    const form: Form[] = verifyFormsValueInXml(product.Forms?.Form);
    const targetGroup: TargetGroup[] = verifyTargetGroupsValueInXml(product.TargetGroups?.TargetGroup);
    const theme: CeviTheme[] = verifyThemesValueInXml(product.Themes?.Theme);
    const deliveringDepartments: Department[] = verifyDeliveringDepartmentsValueInXml(product.DeliveringDepartments?.Department);
    const authorisedDepartments: Department[] = verifyAuthorisedDepartmentsValueInXml(product.AuthorisedDepartments?.Department);

    return new CeviProduct(
        product.Id?._text,
        {
            id: product.Source?.Id?._text,
            value: product.Source?.Value?._text
        },
        targetGroup,
        {
            id: product.ProductType!.Id!._text,
            value: product.ProductType!.Value!._text
        },
        theme,
        deliveringDepartments,
        authorisedDepartments,
        keyword,
        product.Name?._text,
        product.Title?._text,
        product.Description?._text,
        product.StartDate?._text,
        product.EndDate?._text,
        product.Conditions?._text,
        product.BringToApply?._text,
        product.LegalText?._text,
        product.AmountToApply?._text,
        product.Procedure?._text,
        product.Exceptions?._text,
        product.AdditionalInfo?._text,
        url,
        form,
        product.EnrichedLinks?._text,
        {
            id: product.DefaultTheme?.Id?._text,
            value: product.DefaultTheme?.Value?._text,
        },
        {
                id: product.RelatedProducts?.ProductReference?.Id?._text,
                title: product.RelatedProducts?.ProductReference?.Title?._text,
                source: {
                    id: product.RelatedProducts?.ProductReference?.Source?.Id?._text,
                    value: product.RelatedProducts?.ProductReference?.Source?.Value?._text,
                }
        },
        product.Attachments?._text,
        {
            federalApplicationAreas: product.GeographicalApplicationAreas?.FederalApplicationAreas?._text,
            regionalApplicationAreas: product.GeographicalApplicationAreas?.RegionalApplicationAreas?._text,
            provincialApplicationAreas: product.GeographicalApplicationAreas?.ProvincialApplicationAreas?._text,
            municipalApplicationAreas: product.GeographicalApplicationAreas?.MunicipalApplicationAreas?._text,
        },
        product.Clusters._text,
        uploadedAttachment,
        product.TimeStampLastUpdate?._text,
        product.IsInternal?._text
    )
}

//TODO: niet gebruiken, escape charachters nakijken in virtuoso
function cleanXml(text: string): string | undefined {
    if (text) {
        return text.replace(/&lt;.+?&gt;/g, '');
    }
    return undefined;
}

function cleanEmail(emailAddress: string): string | undefined {
    if (emailAddress) {
        return emailAddress.replace(/&amp;BS/g, '');
    }
    return undefined;
}

function verifyKeywordsValueInXml(keywordsValue: any) {
    if (Array.isArray(keywordsValue)) {
        return keywordsValue.map(keywordValue => ({
            id: keywordValue.Id?._text,
            value: keywordValue.Value?._text
        }));
    } else if (keywordsValue) {
        return [{
            id: keywordsValue.Id?._text,
            value: keywordsValue.Value?._text
        }]
    } else {
        return []
    }
}

function verifyUploadedAttachmentsValueInXml(uploadedAttachmentsValue: any) {
    if (Array.isArray(uploadedAttachmentsValue)) {
        return uploadedAttachmentsValue.map((uploadedAttachmentValue) => ({
                id: uploadedAttachmentValue.Id?._text,
                title: uploadedAttachmentValue.Title?._text,
                sequenceNumber: uploadedAttachmentValue.SequenceNumber?._text,
                isInternal: uploadedAttachmentValue.IsInternal?._text,
        }));
    } else if (uploadedAttachmentsValue) {
        return [{
            id: uploadedAttachmentsValue.Id?._text,
            title: uploadedAttachmentsValue.Title?._text,
            sequenceNumber: uploadedAttachmentsValue.SequenceNumber?._text,
            isInternal: uploadedAttachmentsValue.IsInternal?._text,
        }]
    } else {
        return []
    }
}

function verifyInfoUrlsValueInXml(infoUrlsValue: any) {
    if (Array.isArray(infoUrlsValue)) {
        return infoUrlsValue.map((infoUrlValue) => ({
                sequenceNumber: infoUrlValue.SequenceNumber?._text,
                title: infoUrlValue.Title?._text,
                location: infoUrlValue.Location?._text,
        }));
    } else if (infoUrlsValue) {
        return [{
            sequenceNumber: infoUrlsValue.SequenceNumber?._text,
            title: infoUrlsValue.Title?._text,
            location: infoUrlsValue.Location?._text
        }]
    } else {
        return []
    }
}

function verifyFormsValueInXml(formsValue: any) {
    if (Array.isArray(formsValue)) {
        return formsValue.map((formValue) => ({
                sequenceNumber: formValue.SequenceNumber?._text,
                title: formValue.Title?._text,
                location: formValue.Location?._text
        }));
    } else if (formsValue) {
        return [{
            sequenceNumber: formsValue.SequenceNumber?._text,
            title: formsValue.Title?._text,
            location: formsValue.Location?._text
        }]
    } else {
        return []
    }
}

function verifyTargetGroupsValueInXml(targetGroupsValue: any) {
    if (Array.isArray(targetGroupsValue)) {
        return targetGroupsValue.map((targetGroupValue) => ({
                id: targetGroupValue.Id!._text,
                value: targetGroupValue.Value!._text
        }));
    } else if (targetGroupsValue) {
        return [{
            id: targetGroupsValue.Id!._text,
            value: targetGroupsValue.Value!._text
        }]
    } else {
        return []
    }
}

function verifyThemesValueInXml(themesValue: any) {
    if (Array.isArray(themesValue)) {
        return themesValue.map((themeValue) => ({
                id: themeValue.Id?._text,
                value: themeValue.Value?._text
        }));
    } else if (themesValue) {
        return [{
            id: themesValue.Id?._text,
            value: themesValue.Value?._text
        }];
    } else {
        return []
    }
}

function verifyDeliveringDepartmentsValueInXml(deliveringDepartmentsValue: any) {
    if (Array.isArray(deliveringDepartmentsValue)) {
        return deliveringDepartmentsValue.map((deliveringDepartmentValue) => ({
            id: deliveringDepartmentValue.Id?._text,
            name: deliveringDepartmentValue.Name?._text,
            address: mapDepartmentAddress(deliveringDepartmentValue.Addresses?.Address)
        }));
    } else if (deliveringDepartmentsValue) {
        return [{
            id: deliveringDepartmentsValue.Id?._text,
            name: deliveringDepartmentsValue.Name?._text,
            address: mapDepartmentAddress(deliveringDepartmentsValue.Addresses?.Address)
        }];
    } else {
        return [];
    }
}

function verifyAuthorisedDepartmentsValueInXml(authorisedDepartmentsValue: any) {
    if (Array.isArray(authorisedDepartmentsValue)) {
        return authorisedDepartmentsValue.map((authorisedDepartmentValue) => ({
            id: authorisedDepartmentValue.Id?._text,
            name: authorisedDepartmentValue.Name?._text,
            address: mapDepartmentAddress(authorisedDepartmentValue.Addresses?.Address)
        }));
    } else if (authorisedDepartmentsValue) {
        return [{
            id: authorisedDepartmentsValue.Id?._text,
            name: authorisedDepartmentsValue.Name?._text,
            address: mapDepartmentAddress(authorisedDepartmentsValue.Addresses?.Address)
        }];
    } else {
        return [];
    }
}

function mapDepartmentAddress(addressValueInXml: any): Address {
    if (addressValueInXml) {
        return {
            id: addressValueInXml.Id?._text,
            name: addressValueInXml.Name?._text,
            street: addressValueInXml.Street?._text,
            houseNumber: addressValueInXml.HouseNumber?._text,
            boxNumber: addressValueInXml.BoxNumber?._text,
            zipCode: addressValueInXml.ZipCode?._text,
            municipality: addressValueInXml.Municipality?._text,
            phone: addressValueInXml.Phone?._text,
            fax: addressValueInXml.Fax?._text,
            website: addressValueInXml.Website?._text,
            email: addressValueInXml.Email?._text,
            facebook: addressValueInXml.Facebook?._text,
            twitter: addressValueInXml.Twitter?._text,
            openingHours: addressValueInXml.OpeningHours?._text,
        }
    } else {
        return {};
    }
}