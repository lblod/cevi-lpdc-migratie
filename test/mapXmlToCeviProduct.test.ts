import {expect, test} from 'vitest';
import {beforeAll} from "vitest";
import {CeviProduct} from "../src/ceviProduct";
import {readCeviXml} from "../src/readCeviXml";
import {mapToABBProduct} from "../src/mapToABBProduct";

let ceviProducts: CeviProduct[] = [];

const gemeente_URL = "http://data.lblod.info/id/bestuurseenheden/6025a5d1ca2262a784f002edd8ce9ca9073ae3d5ebc6b6b5531f05a29e9250af";

beforeAll(async () => {
    ceviProducts = await readCeviXml('src/resources/LPDC_CEVI.xml');


})

test('The mapXmlToCeviProduct function should generate as 2nd instance an object with id 210001', () => {
    expect(ceviProducts[1].id).toEqual('210001');
    expect(ceviProducts[1].bringToApply).toEqual("&lt;ul&gt;\r\n&lt;li&gt;Het document waarop de handtekening staat en gewettigd moet worden&lt;/li&gt;\r\n&lt;li&gt;De identiteitskaart van diegene wiens handtekening gewettigd moet worden&lt;/li&gt;\r\n&lt;/ul&gt;");
})

test('map xml to ceviProduct', async () => {
    expect(ceviProducts[0]).toEqual(new CeviProduct(
        "210043",
        {id: "0", value: "Cevi"},
        [],
        {id: "0", value: "Algemeen"},
        [],
        [{
            id: "210", name: "Burgerzaken",
            address: {
                id: "40f3bed2-3cf4-4927-bbd5-7ceed31ae341",
                name: "Stadionstraat 2",
                street: "Stadionstraat",
                houseNumber: "2",
                boxNumber: undefined,
                zipCode: "9190",
                municipality: "Stekene",
                phone: "03 790 02 12",
                fax: "03 790 02 10",
                website: "www.stekene.be",
                email: "Bevolking&amp;BS@stekene.be",
                facebook: undefined,
                twitter: undefined,
                openingHours: "&lt;p&gt;Maandag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Dinsdag&amp;nbsp;&amp;nbsp;08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Woensdag 08:30-12;00; 13:30-16:30;&lt;/p&gt;\r\n&lt;p&gt;Donderdag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Vrijdag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Zaterdag 09:00-12:00&lt;/p&gt;\r\n&lt;p&gt;&amp;nbsp;&lt;/p&gt;"
            }
        }],
        [{
            id: "210", name: "Burgerzaken",
            address: {
                id: "40f3bed2-3cf4-4927-bbd5-7ceed31ae341",
                name: "Stadionstraat 2",
                street: "Stadionstraat",
                houseNumber: "2",
                boxNumber: undefined,
                zipCode: "9190",
                municipality: "Stekene",
                phone: "03 790 02 12",
                fax: "03 790 02 10",
                website: "www.stekene.be",
                email: "Bevolking&amp;BS@stekene.be",
                facebook: undefined,
                twitter: undefined,
                openingHours: "&lt;p&gt;Maandag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Dinsdag&amp;nbsp;&amp;nbsp;08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Woensdag 08:30-12;00; 13:30-16:30;&lt;/p&gt;\r\n&lt;p&gt;Donderdag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Vrijdag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Zaterdag 09:00-12:00&lt;/p&gt;\r\n&lt;p&gt;&amp;nbsp;&lt;/p&gt;"
            }
        }],
        [],
        "Doodgeboren kind/foetus - begraving",
        "Levenloos geboren kind/foetus",
        "&lt;p&gt;Sterft je kindje tijdens de zwangerschap? Dan voelen we in de eerste plaats heel erg met je mee.&lt;/p&gt;\r\n&lt;p&gt;De registratie van kindjes kan vrijblijvend vanaf 140 dagen zwangerschap met toekenning van een voornaam of voornamen. Vanaf 180 dagen zwangerschap is registratie verplicht. Vanaf dat moment kunnen ouders ook een familienaam toekennen als ze dit wensen.&lt;/p&gt;",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        "&lt;p&gt;Jij of de begrafenisondernemer doet aangifte bij de ambtenaar van de burgerlijke stand van de gemeente waar het overlijden plaatsvond. Hiervoor heb je een medisch attest met vermelding van de zwangerschapsduur nodig.&lt;/p&gt;",
        undefined,
        undefined,
        [],
        [],
        undefined,
        {id: undefined, value: undefined},
        {id: undefined, title: undefined, source: {id: undefined, value: undefined}},
        undefined,
        {
            federalApplicationAreas: undefined,
            regionalApplicationAreas: undefined,
            provincialApplicationAreas: undefined,
            municipalApplicationAreas: undefined
        },
        undefined,
        [],
        "2020-10-02T13:21:31.7",
        "false"
    ));
});

test('map ceviProduct to abbProduct', () => {
    const abbProducts = ceviProducts.map((ceviProduct: CeviProduct) => mapToABBProduct(ceviProduct, new Date(), gemeente_URL));

    expect(abbProducts[0]).toMatchObject({
        targetAudience: [],
        keywords: [],
        title: "Levenloos geboren kind/foetus",
        description: "&lt;p&gt;Sterft je kindje tijdens de zwangerschap? Dan voelen we in de eerste plaats heel erg met je mee.&lt;/p&gt;\r\n&lt;p&gt;De registratie van kindjes kan vrijblijvend vanaf 140 dagen zwangerschap met toekenning van een voornaam of voornamen. Vanaf 180 dagen zwangerschap is registratie verplicht. Vanaf dat moment kunnen ouders ook een familienaam toekennen als ze dit wensen.&lt;/p&gt;",
        productId: undefined,
        theme: [],
        competentAuthorityLevel: ["Lokaal"],
        competentAuthority: [gemeente_URL],
        executingAuthorityLevel: ["Lokaal"],
        executingAuthority: [gemeente_URL],
        contactPoints: [
            {
                url: "www.stekene.be",
                email: "Bevolking&amp;BS@stekene.be",
                telephone: "03 790 02 12",
                openingHours: "&lt;p&gt;Maandag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Dinsdag&amp;nbsp;&amp;nbsp;08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Woensdag 08:30-12;00; 13:30-16:30;&lt;/p&gt;\r\n&lt;p&gt;Donderdag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Vrijdag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Zaterdag 09:00-12:00&lt;/p&gt;\r\n&lt;p&gt;&amp;nbsp;&lt;/p&gt;",
                address: {
                    street: "Stadionstraat",
                    houseNumber: "2",
                    boxNumber: undefined,
                    zipCode: "9190",
                    municipality: "Stekene",
                    country: "België"
                }
            }
        ],
        procedure: {
            description: "&lt;p&gt;Jij of de begrafenisondernemer doet aangifte bij de ambtenaar van de burgerlijke stand van de gemeente waar het overlijden plaatsvond. Hiervoor heb je een medisch attest met vermelding van de zwangerschapsduur nodig.&lt;/p&gt;"
        },
        createdBy: gemeente_URL,
        status: "CONCEPT"
    })
})

// test('mapToABBProduct from a cevi product with title "This is a test cevi product" should generate an abb product with the same title', () => {
//     const ceviProduct: CeviProduct = new CeviProduct(undefined, undefined, undefined, 'This is a test cevi product');
//     const abbProduct: AbbProduct = mapToABBProduct(ceviProduct);
//     expect(abbProduct.title).toEqual(new Literal('This is a test cevi product'));
// })
//
// test('mapToABBProduct from a cevi product without title should generate an abb product without title', () => {
//     const ceviProduct: CeviProduct = new CeviProduct();
//     const abbProduct: AbbProduct = mapToABBProduct(ceviProduct);
//     expect(abbProduct.title).toBeUndefined();
// })
//
// test('mapToABBProduct from a cevi product with conditions "&lt;p&gt;De natuurvergunning moet aangevraagd worden door de eigenaar van het perceel waarop de vegetaties of de kleine landschapselementen aanwezig zijn.&lt;/p&gt;"' +
//     'should generate an abb product with requirement "&lt;p&gt;De natuurvergunning moet aangevraagd worden door de eigenaar van het perceel waarop de vegetaties of de kleine landschapselementen aanwezig zijn.&lt;/p&gt;"', () => {
//     const ceviProduct: CeviProduct = new CeviProduct(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "&lt;p&gt;De natuurvergunning moet aangevraagd worden door de eigenaar van het perceel waarop de vegetaties of de kleine landschapselementen aanwezig zijn.&lt;/p&gt;");
//     const abbProduct: AbbProduct = mapToABBProduct(ceviProduct);
//     expect(abbProduct.requirement?.description).toEqual(new Literal("&lt;p&gt;De natuurvergunning moet aangevraagd worden door de eigenaar van het perceel waarop de vegetaties of de kleine landschapselementen aanwezig zijn.&lt;/p&gt;"));
// })
//
// test('mapToABBProduct from a cevi product without conditions and with BringToApply "&lt;p&gt;Dien het aanvraagdossier in voor 31 mei, 12 uur.&lt;/p&gt;" should generate an abb product with' +
//     'requirement "Bewijsstukken mee te brengen" and with evidence "&lt;p&gt;Dien het aanvraagdossier in voor 31 mei, 12 uur.&lt;/p&gt;"', () => {
//     const ceviProduct: CeviProduct = new CeviProduct(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, "&lt;p&gt;Dien het aanvraagdossier in voor 31 mei, 12 uur.&lt;/p&gt;");
//     const abbProduct: AbbProduct = mapToABBProduct(ceviProduct);
//     expect(abbProduct.requirement?.description).toEqual(new Literal("Bewijsstukken mee te brengen"));
//     expect(abbProduct.requirement?.evidence?.description).toEqual(new Literal("&lt;p&gt;Dien het aanvraagdossier in voor 31 mei, 12 uur.&lt;/p&gt;"));
// })