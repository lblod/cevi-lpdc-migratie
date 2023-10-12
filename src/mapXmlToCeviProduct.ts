import {CeviProduct} from "./ceviProduct";
import {Address, Department} from "./types";

export function mapXmlToCeviProduct(product: any): CeviProduct {

    return new CeviProduct(
        product.Id?._text,
        {
            id: product.Source?.Id?._text,
            value: product.Source?.Value?._text
        },
        verifyTargetGroupsValueInXml(product.TargetGroups?.TargetGroup),
        {
            id: product.ProductType!.Id!._text,
            value: product.ProductType!.Value!._text
        },
        verifyThemesValueInXml(product.Themes?.Theme),
        verifyDepartmentsValueInXml(product.DeliveringDepartments?.Department),
        verifyDepartmentsValueInXml(product.AuthorisedDepartments?.Department),
        verifyKeywordsValueInXml(product.Keywords?.Keyword),
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
        verifyInfoUrlsValueInXml(product.InfoUrls?.Url),
        verifyFormsValueInXml(product.Forms?.Form),
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
        product.Clusters?._text,
        verifyUploadedAttachmentsValueInXml(product.UploadedAttachments?.UploadedAttachment),
        product.TimeStampLastUpdate?._text,
        product.IsInternal?._text
    )
}


function verifyKeywordsValueInXml(keywordsValue: object | any[] | undefined) {
    return toArray(keywordsValue)
        .map(keywordValue => ({
            id: keywordValue.Id?._text,
            value: keywordValue.Value?._text
        }));
}

//TODO LPDC-718: not used for stekene, so not tested ...
function verifyUploadedAttachmentsValueInXml(uploadedAttachmentsValue: object | any[] | undefined) {
    return toArray(uploadedAttachmentsValue)
        .map(uploadedAttachmentValue => ({
            id: uploadedAttachmentValue.Id?._text,
            title: uploadedAttachmentValue.Title?._text,
            sequenceNumber: uploadedAttachmentValue.SequenceNumber?._text,
            isInternal: uploadedAttachmentValue.IsInternal?._text,
        }));
}

function verifyInfoUrlsValueInXml(infoUrlsValue: object | any[] | undefined) {
    return toArray(infoUrlsValue)
        .map(infoUrlValue => ({
            sequenceNumber: infoUrlValue.SequenceNumber?._text,
            title: infoUrlValue.Title?._text,
            location: infoUrlValue.Location?._text,
        }));
}

function verifyFormsValueInXml(formsValue: object | any[] | undefined) {
    return toArray(formsValue)
        .map(formValue => ({
            sequenceNumber: formValue.SequenceNumber?._text,
            title: formValue.Title?._text,
            location: formValue.Location?._text
        }));
}

function verifyTargetGroupsValueInXml(targetGroupsValue: object | any[] | undefined) {
    return toArray(targetGroupsValue)
        .map(targetGroupValue => ({
            id: targetGroupValue.Id!._text,
            value: targetGroupValue.Value!._text
        }));
}

function verifyThemesValueInXml(themesValue: object | any[] | undefined) {
    return toArray(themesValue)
        .map(themeValue => ({
            id: themeValue.Id?._text,
            value: themeValue.Value?._text
        }));
}

function verifyDepartmentsValueInXml(departmentsValue: object | any[] | undefined) {
    return toArray(departmentsValue)
        .map(departmentsValue => ({
            id: departmentsValue.Id?._text,
            name: departmentsValue.Name?._text,
            address: mapDepartmentAddress(departmentsValue.Addresses?.Address)
        }));
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

function toArray(value: object | any[] | undefined) {
    if (Array.isArray(value)) {
        return value;
    } else if (value) {
        return [value];
    }
    return [];
}
