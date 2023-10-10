import {expect, test, describe} from 'vitest';
import {beforeAll} from "vitest";
import {CeviProduct} from "../src/ceviProduct";
import {readCeviXml} from "../src/readCeviXml";
import {mapProductType, mapToABBProduct} from "../src/mapToABBProduct";
import {ProductType} from "../src/types";

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
    //TODO LPDC-718: sometimes, the &amp; from the xml are escaped, sometimes they are not ?
    //TODO LPDC-718: no example for Attachments (which to take over if they are in the form of an URL), so skipping for now
    //TODO LPDC-718: no example for UploadedAttachments (which to take over if they are in the form of an URL), so skipping for now
    //TODO LPDC-718: On one or more fields, in the mapping from xml to ceviproduct, we have a construct like if (Array.isArray( ... .else => only one branch so far is tested right now.
    expect(ceviProducts[0]).toEqual(new CeviProduct(
        "210043",
        {id: "0", value: "Cevi"},
        [{
            id: "6d606a0f-a4f5-4976-90ee-c8884fe1846b",
            value: "Burger",
        }, {
            id: "fabba05c-ad35-48e3-ba03-a8947852c38e",
            value: "Onderneming",
        }],
        {
            id: "39376414-2a3a-4c64-8e26-93b3048c41ef",
            value: "Advies en begeleiding",},
        [{
            id: "403050",
            value: "Horeca",
        }, {
            id: "108030",
            value: "Vergunningen",
        },],
        [{
            address: {},
            id: "c2e69322-6ec4-4786-b05a-3ebc8beed3f5",
            name: "Federale overheid",
        }, {
            address: {},
            id: "ddfc31ff-909b-439d-a4d6-66c6b17801ed",
            name: "Vlaamse overheid",
        },
            {
                id: "210",
                name: "Burgerzaken",
                address: {
                    id: "40f3bed2-3cf4-4927-bbd5-7ceed31ae341",
                    name: "Stadionstraat 2",
                    street: "Stadionstraat",
                    houseNumber: "2",
                    boxNumber: "B",
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
            },
            {
                address: {},
                id: "12",
                name: "Team Cultuur, Sport en Vrije tijd",
            }],
        [{
            address: {},
            id: "10",
            name: "Team Lokale economie, Toerisme en Werk",
        },{
            address: {},
            id: "ddfc31ff-909b-439d-a4d6-66c6b17801ed",
            name: "Vlaamse overheid",
        },{
            id: "200",
            name: "Burger &amp; Welzijnszaken",
            address: {
                id: "40f3bed2-3cf4-4927-bbd5-7ceed31ae341",
                name: "Stadionstraat 2",
                street: "Stadionstraat",
                houseNumber: "2",
                boxNumber: "D",
                zipCode: "9190",
                municipality: "Stekene",
                phone: "03 790 02 12",
                fax: "03 790 02 10",
                website: "www.stekene.be",
                email: "Bevolking&amp;BS@stekene.be",
                facebook: undefined,
                twitter: undefined,
                openingHours: `&lt;p&gt;Maandag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Dinsdag&amp;nbsp;&amp;nbsp;08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Woensdag 08:30-12;00; 13:30-16:30;&lt;/p&gt;\r\n&lt;p&gt;Donderdag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Vrijdag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Zaterdag 09:00-12:00&lt;/p&gt;\r\n&lt;p&gt;&amp;nbsp;&lt;/p&gt;`}
        },{
            address: {},
            id: "c2e69322-6ec4-4786-b05a-3ebc8beed3f5",
            name: "Federale overheid",
        },],
        [{
            id: "120032b",
            value: "luier",
        }, {
            id: "604ca901-1fb5-4ec2-b37f-a68d4a4b2041",
            value: "luiers",
        }, {
            id: "120032c",
            value: "pamper",
        }, {
            id: "120032a",
            value: "herbruikbaar",
        },],
        "Doodgeboren kind/foetus - begraving",
        "Levenloos geboren kind/foetus",
        "&lt;p&gt;Sterft je kindje tijdens de zwangerschap? Dan voelen we in de eerste plaats heel erg met je mee.&lt;/p&gt;\r\n&lt;p&gt;De registratie van kindjes kan vrijblijvend vanaf 140 dagen zwangerschap met toekenning van een voornaam of voornamen. Vanaf 180 dagen zwangerschap is registratie verplicht. Vanaf dat moment kunnen ouders ook een familienaam toekennen als ze dit wensen.&lt;/p&gt;",
        "2023-09-10",
        "2023-10-12",
        `&lt;ul&gt;\r\n&lt;li&gt;De persoon van wie de handtekening moet gewettigd worden, moet zijn woonplaats hebben in de gemeente&lt;/li&gt;\r\n&lt;li&gt;Het document mag niet bestemd zijn voor immorele, bedrieglijke of strafbare oogmerken&lt;/li&gt;\r\n&lt;li&gt;De formaliteit moet nuttig of nodig zijn. Het mag bijgevolg niet gaan om een louter private akte (een eigenhandig geschreven testament bijvoorbeeld)&lt;/li&gt;\r\n&lt;/ul&gt;`,
        `&lt;p&gt;Wat meebrengen indien je geen begrafenisonderneming zou hebben&lt;/p&gt;\r\n&lt;ul&gt;\r\n&lt;li&gt;Overlijdensattest en medische attesten afgeleverd door de geneesheer die het overlijden vaststelde.&lt;/li&gt;\r\n&lt;li&gt;De identiteitskaart en eventueel het rijbewijs van de overledene.&lt;/li&gt;\r\n&lt;li&gt;Eventueel het huwelijksboekje van de overledene.&lt;/li&gt;\r\n&lt;li&gt;Van niet-inwoners die overleden zijn te Stekene: attest inzake de laatste wilsbeschikking, afgeleverd door het gemeentebestuur van de laatste woonplaats.&lt;/li&gt;\r\n&lt;li&gt;voor begravingen buiten het grondgebied van Stekene: &amp;lsquo;toelating tot begraven&amp;rsquo; afgeleverd door het gemeentebestuur op wiens grondgebied de begraafplaats gelegen is.&lt;/li&gt;\r\n&lt;/ul&gt;`,
        `Some Legal Text`,
        `&lt;p&gt;Zowel een voorlopig rijbewijs (18 maanden), een voorlopig rijbewijs (36 maanden) als een voorlopig rijbewijs model 3 kost 24 euro.&lt;/p&gt;\r\n&lt;p&gt;&amp;nbsp;&lt;/p&gt;`,
        "&lt;p&gt;Jij of de begrafenisondernemer doet aangifte bij de ambtenaar van de burgerlijke stand van de gemeente waar het overlijden plaatsvond. Hiervoor heb je een medisch attest met vermelding van de zwangerschapsduur nodig.&lt;/p&gt;",
        `&lt;p&gt;&lt;b&gt;Vellen van bomen wegens acuut gevaar&lt;/b&gt;&lt;/p&gt;\r\n&lt;p&gt;Vormt er een boom een acuut gevaar? Dan kan deze gekapt worden met een machtiging van de burgemeester.&lt;/p&gt;\r\n&lt;p&gt;Hiervoor vul je het formulier in bijlage in en bezorg je dit ingevuld aan de dienst Natuur en Milieu. Deze machtiging, eens goedgekeurd, geldt als kapmachtiging.&lt;/p&gt;\r\n&lt;p&gt;De te vellen boom (bomen) moeten wel volgens het Natuurdecreet gecompenseerd worden door nieuwe aanplantingen van streekeigen loofbomen op het eigen perceel.&lt;/p&gt;\r\n&lt;p&gt;&amp;nbsp;&lt;/p&gt;`,
        `&lt;p&gt;Er wordt een herfstsportkamp georganiseerd tijdens de herfstvakantie voor kinderen van het eerste tot en met het zesde leerjaar en dit telkens van&amp;nbsp;9 tot 16 uur in sportcentrum De Sportstek.&amp;nbsp;Voorzie sportieve kledij en een lunchpakket.&lt;/p&gt;\r\n&lt;p&gt;De folder met inschrijvingsformulier wordt&amp;nbsp;tijdig ter beschikking gesteld via de Stekense scholen en de gemeentelijke website (&lt;a href="https://www.stekene.be/thema/6504/thwebwinkel"&gt;activiteitenloket&lt;/a&gt;).&lt;/p&gt;`,
        [{
            location: "http://www.inburgering.be",
            sequenceNumber: "1",
            title: "Inburgering.be",
        }, {
            location: "https://integratie-inburgering.be/contact",
            sequenceNumber: "2",
            title: "Contactgegevens voor een inburgeringstraject",
        },],
        [
            {sequenceNumber: "1",
            title: "Geboortepremie - Aanvraagformulier",
            location: "http://start.cevi.be/ELoket/Formulier.aspx?tnr_site=91&amp;FormId=874684"}
        ],
        `Enriched links`,
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
    const migrationDate = new Date();
    const abbProduct = mapToABBProduct(ceviProducts[0], migrationDate, gemeente_URL);

    expect(abbProduct).toMatchObject({
        productId: undefined,
        //TODO LPDC-718: hoe de product Id te koppelen?
        //TODO LPDC-718: hoe de link naar het ipdc concept te koppelen?
        title: "Levenloos geboren kind/foetus",
        description: "&lt;p&gt;Sterft je kindje tijdens de zwangerschap? Dan voelen we in de eerste plaats heel erg met je mee.&lt;/p&gt;\r\n&lt;p&gt;De registratie van kindjes kan vrijblijvend vanaf 140 dagen zwangerschap met toekenning van een voornaam of voornamen. Vanaf 180 dagen zwangerschap is registratie verplicht. Vanaf dat moment kunnen ouders ook een familienaam toekennen als ze dit wensen.&lt;/p&gt;",
        startDate: "2023-09-10",
        endDate: "2023-10-12",
        productType: "AdviesBegeleiding",
        targetAudience: [],
        keywords: [],
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

describe('mapProductType', () => {

    test('Advies en begeleiding', () => {
       const ceviProductType: ProductType = {id: "ignored", value: "Advies en begeleiding"};
       expect(mapProductType(ceviProductType)).toEqual("AdviesBegeleiding");
    });

    test('Algemeen', () => {
        const ceviProductType: ProductType = {id: "ignored", value: "Algemeen"};
        expect(mapProductType(ceviProductType)).toBeUndefined();
    });

    test('Beschikbaar stellen van infrastructuur en materiaal', () => {
        const ceviProductType: ProductType = {id: "ignored", value: "Beschikbaar stellen van infrastructuur en materiaal"};
        expect(mapProductType(ceviProductType)).toEqual("InfrastructuurMateriaal");
    });

    test('Bewijs', () => {
        const ceviProductType: ProductType = {id: "ignored", value: "Bewijs"};
        expect(mapProductType(ceviProductType)).toEqual("Bewijs");
    });

    test('Digitaal sociaal huis', () => {
        const ceviProductType: ProductType = {id: "ignored", value: "Digitaal sociaal huis"};
        expect(mapProductType(ceviProductType)).toBeUndefined();
    });

    test('Financieel voordeel', () => {
        const ceviProductType: ProductType = {id: "ignored", value: "Financieel voordeel"};
        expect(mapProductType(ceviProductType)).toEqual("FinancieelVoordeel");
    });

    test('Financiële verplichting', () => {
        const ceviProductType: ProductType = {id: "ignored", value: "Financiële verplichting"};
        expect(mapProductType(ceviProductType)).toEqual("FinancieleVerplichting");
    });

    test('Infrastructuur en materiaal', () => {
        const ceviProductType: ProductType = {id: "ignored", value: "Infrastructuur en materiaal"};
        expect(mapProductType(ceviProductType)).toEqual("InfrastructuurMateriaal");
    });

    test('Toelating', () => {
        const ceviProductType: ProductType = {id: "ignored", value: "Toelating"};
        expect(mapProductType(ceviProductType)).toEqual("Toelating");
    });

    test('Something otherwise unknown', () => {
        const ceviProductType: ProductType = {id: "ignored", value: "Something otherwise unknown"};
        expect(mapProductType(ceviProductType)).toBeUndefined();
    });

});

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