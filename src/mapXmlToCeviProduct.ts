import {CeviProduct} from "./ceviProduct";
import {Address, Department} from "./types";
import {JSDOM} from 'jsdom';

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
        unescapeOptionalHtmlEntities(product.Description?._text),
        product.StartDate?._text,
        product.EndDate?._text,
        unescapeOptionalHtmlEntities(product.Conditions?._text),
        unescapeOptionalHtmlEntities(product.BringToApply?._text),
        product.LegalText?._text,
        unescapeOptionalHtmlEntities(product.AmountToApply?._text),
        unescapeOptionalHtmlEntities(product.Procedure?._text),
        unescapeOptionalHtmlEntities(product.Exceptions?._text),
        unescapeOptionalHtmlEntities(product.AdditionalInfo?._text),
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

//TODO LPDC-718: no example for UploadedAttachments (which to take over if they are in the form of an URL), so skipping for now
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
            title: unescapeHtmlEntities(formValue.Title?._text),
            location: unescapeHtmlEntities(formValue.Location?._text)
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

function verifyDepartmentsValueInXml(departmentsValue: object | any[] | undefined): Department[] {
    return toArray(departmentsValue)
        .map(departmentsValue => ({
            id: departmentsValue.Id?._text,
            name: departmentsValue.Name?._text,
            addresses: mapDepartmentAddress(toArray(departmentsValue.Addresses?.Address))
        }));
}

function mapDepartmentAddress(addressesValueInXml: any[]): Address[] {
    return addressesValueInXml.map(addressValueInXml => {
        return {
            id: addressValueInXml.Id?._text,
            name: addressValueInXml.Name?._text,
            street: addressValueInXml.Street?._text?.trim(),
            houseNumber: addressValueInXml.HouseNumber?._text?.trim(),
            boxNumber: addressValueInXml.BoxNumber?._text?.trim(),
            zipCode: addressValueInXml.ZipCode?._text?.trim(),
            municipality: addressValueInXml.Municipality?._text?.trim(),
            phone: addressValueInXml.Phone?._text?.trim(),
            fax: addressValueInXml.Fax?._text?.trim(),
            website: addressValueInXml.Website?._text?.trim(),
            email: unescapeOptionalHtmlEntities(addressValueInXml.Email?._text?.trim()),
            facebook: addressValueInXml.Facebook?._text?.trim(),
            twitter: addressValueInXml.Twitter?._text?.trim(),
            openingHours: removeEmptyParagraphs(removeExtraSpaces(escapeNbsp(unescapeOptionalHtmlEntities(addressValueInXml.OpeningHours?._text?.trim())))),
        }
    });

}

function toArray(value: object | any[] | undefined) {
    if (Array.isArray(value)) {
        return value;
    } else if (value) {
        return [value];
    }
    return [];
}

function unescapeOptionalHtmlEntities(input: string | undefined): string | undefined {
    return input ? unescapeHtmlEntities(input) : undefined;
}

function unescapeHtmlEntities(input: string): string {
    const dom = new JSDOM(`<!DOCTYPE html>`);
    const domParser = new dom.window.DOMParser();
    const doc = domParser.parseFromString(input, "text/html");
    return doc.documentElement.textContent || "";
}

function escapeNbsp(input: string | undefined): string | undefined {
    return input?.replace(/&nbsp;/g, ' ');
}

function removeExtraSpaces(input: string | undefined): string | undefined {
    return input?.replace(/ +/g, ' ');
}

function removeEmptyParagraphs(input: string | undefined): string | undefined {
    return input?.replace(/<p> <\/p>/g, '');
}

