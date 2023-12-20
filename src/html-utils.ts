import he from "he";

export function unescapeOptionalHtmlEntities(input: string | undefined): string | undefined {
    return input ? unescapeHtmlEntities(input) : undefined;
}

export function unescapeHtmlEntities(input: string): string {
    return he.decode(input);
}

export function escapeNbsp(input: string | undefined): string | undefined {
    return input?.replace(/&nbsp;/g, ' ');
}

export function removeExtraSpaces(input: string | undefined): string | undefined {
    return input?.replace(/ +/g, ' ');
}

export function removeEmptyParagraphs(input: string | undefined): string | undefined {
    return input?.replace(/<p> <\/p>/g, '');
}

export function carefullyCleanUpSomeHtmlTags(input: string | undefined): string | undefined {
    return input?.replace(/<p>/g, '')
                 .replace(/<\/p>/g, ' ')
                 .replace(/<br \/>/g, '; ');
}