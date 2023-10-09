type Source = {
    id?: string,
    value?: string
}

type ProductType = {
    id: string,
    value: string
}

type Url = {
    sequenceNumber?: string,
    title: string,
    location: string
}

type Form = {
    sequenceNumber?: string,
    title?: string,
    location?: string
}

type Keyword = {
    id?: string,
    value?: string
}

type TargetGroup = {
    id: string,
    value: string
}

type CeviTheme = {
    id?: string,
    value?: string
}

type DefaultTheme = {
    id?: string,
    value?: string
}

type ProductReference = {
    id?: string,
    title?: string,
    source?: {
        id?: string,
        value?: string,
    }
}

type Address = {
    id?: string,
    name?: string,
    street?: string,
    houseNumber?: string,
    boxNumber?: string,
    zipCode?: string,
    municipality?: string,
    phone?: string,
    fax?: string,
    website?: string,
    email?: string,
    facebook?: string,
    twitter?: string,
    openingHours?: string
}

type Department = {
    id?: string,
    name?: string,
    address?: Address
}

type UploadedAttachment = {
    id?: string,
    title?: string,
    sequenceNumber?: string,
    isInternal?: string
}

export {
    Source,
    ProductType,
    Url,
    Form,
    Keyword,
    TargetGroup,
    CeviTheme,
    DefaultTheme,
    ProductReference,
    Address,
    Department,
    UploadedAttachment
}