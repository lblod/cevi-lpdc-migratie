import {beforeAll, describe, expect, test} from 'vitest';
import {CeviProduct} from "../src/ceviProduct";
import {readCeviXml} from "../src/readCeviXml";
import {
    mapAmountToApplyToCost, mapAuthorisedDepartmentsToCompetentAuthorityLevel,
    mapCeviThemesToTheme, mapCompetentAuthorityBasedOnCompetentAuthorityLevel,
    mapConditionsToRequirement, mapContactPoints,
    mapDeliveringDepartmentsToExecutingAuthorityLevel, mapDepartmentAddressToContactPoint,
    mapExecutingAuthorityBasedOnExecutingAuthorityLevel,
    mapInfoUrlsToMoreInfo,
    mapKeywords,
    mapProcedureAndForms,
    mapProductType,
    mapTargetGroupsToTargetAudience,
    mapToABBProduct
} from "../src/mapToABBProduct";
import {Form, Keyword, ProductType, Url} from "../src/types";
import {Predicates, Triple, Uri} from "../src/triple-array";
import {AbbProduct} from "../src/abbProduct";
import {CompetentAuthorityLevel, ExecutingAuthorityLevel, TargetAudience, Theme} from "../src/abbProduct";

let ceviProducts: CeviProduct[] = [];

const gemeente_URL = "http://data.lblod.info/id/bestuurseenheden/6025a5d1ca2262a784f002edd8ce9ca9073ae3d5ebc6b6b5531f05a29e9250af";

beforeAll(async () => {
    ceviProducts = await readCeviXml('src/resources/LPDC_CEVI.xml');
})

describe("map xml to ceviproduct", () => {
    test('The mapXmlToCeviProduct function should generate as 2nd instance an object with id 210001', () => {
        expect(ceviProducts[1].id).toEqual('210001');
        expect(ceviProducts[1].bringToApply).toEqual("&lt;ul&gt;\r\n&lt;li&gt;Het document waarop de handtekening staat en gewettigd moet worden&lt;/li&gt;\r\n&lt;li&gt;De identiteitskaart van diegene wiens handtekening gewettigd moet worden&lt;/li&gt;\r\n&lt;/ul&gt;");
    })

    test('map xml to ceviProduct', async () => {
        //TODO LPDC-718: sometimes, the &amp; from the xml are escaped, sometimes they are not ?
        //TODO LPDC-718: no example for Attachments (which to take over if they are in the form of an URL), so skipping for now; mapping code not done either ...
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
                value: "Advies en begeleiding",
            },
            [{
                id: "403050",
                value: "Horeca",
            }, {
                id: "108030",
                value: "Cultuur, Sport en Vrije Tijd",
            },
                {
                    id: "108031",
                    value: "Mobiliteit en Openbare Werken",
                }],
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
            }, {
                address: {},
                id: "ddfc31ff-909b-439d-a4d6-66c6b17801ed",
                name: "Vlaamse overheid",
            }, {
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
                    openingHours: `&lt;p&gt;Maandag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Dinsdag&amp;nbsp;&amp;nbsp;08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Woensdag 08:30-12;00; 13:30-16:30;&lt;/p&gt;\r\n&lt;p&gt;Donderdag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Vrijdag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Zaterdag 09:00-12:00&lt;/p&gt;\r\n&lt;p&gt;&amp;nbsp;&lt;/p&gt;`
                }
            }, {
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
                {
                    sequenceNumber: "1",
                    title: "Geboortepremie - Aanvraagformulier",
                    location: "http://start.cevi.be/ELoket/Formulier.aspx?tnr_site=91&amp;FormId=874684"
                }
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
});


describe("map ceviProduct to abbProduct", () => {

    test('map minimal item from xml to ceviProduct and to abbProduct', () => {
        //TODO LPDC-718: create a minimal item from xml (almost optional) and test only the really required fields here
    });

    test('map full item from xml to ceviProduct and to abbProduct', () => {
        const migrationDate = new Date();
        const abbProduct = mapToABBProduct(ceviProducts[0], migrationDate, gemeente_URL);

        expect(abbProduct).toMatchObject({
            productId: undefined,
            //TODO LPDC-718: hoe de product Id te koppelen?
            //TODO LPDC-718: hoe de link naar het ipdc concept te koppelen? En is dat wel nodig ? Want soms worden nogal diepe links gemaakt van instantie naar concept ...
            title: "Levenloos geboren kind/foetus",
            description: "&lt;p&gt;Sterft je kindje tijdens de zwangerschap? Dan voelen we in de eerste plaats heel erg met je mee.&lt;/p&gt;\r\n&lt;p&gt;De registratie van kindjes kan vrijblijvend vanaf 140 dagen zwangerschap met toekenning van een voornaam of voornamen. Vanaf 180 dagen zwangerschap is registratie verplicht. Vanaf dat moment kunnen ouders ook een familienaam toekennen als ze dit wensen.&lt;/p&gt;",
            startDate: "2023-09-10",
            endDate: "2023-10-12",
            productType: "AdviesBegeleiding",
            requirement: {
                description: `&lt;ul&gt;\r\n&lt;li&gt;De persoon van wie de handtekening moet gewettigd worden, moet zijn woonplaats hebben in de gemeente&lt;/li&gt;\r\n&lt;li&gt;Het document mag niet bestemd zijn voor immorele, bedrieglijke of strafbare oogmerken&lt;/li&gt;\r\n&lt;li&gt;De formaliteit moet nuttig of nodig zijn. Het mag bijgevolg niet gaan om een louter private akte (een eigenhandig geschreven testament bijvoorbeeld)&lt;/li&gt;\r\n&lt;/ul&gt;`,
                evidence: {
                    description: `&lt;p&gt;Wat meebrengen indien je geen begrafenisonderneming zou hebben&lt;/p&gt;\r\n&lt;ul&gt;\r\n&lt;li&gt;Overlijdensattest en medische attesten afgeleverd door de geneesheer die het overlijden vaststelde.&lt;/li&gt;\r\n&lt;li&gt;De identiteitskaart en eventueel het rijbewijs van de overledene.&lt;/li&gt;\r\n&lt;li&gt;Eventueel het huwelijksboekje van de overledene.&lt;/li&gt;\r\n&lt;li&gt;Van niet-inwoners die overleden zijn te Stekene: attest inzake de laatste wilsbeschikking, afgeleverd door het gemeentebestuur van de laatste woonplaats.&lt;/li&gt;\r\n&lt;li&gt;voor begravingen buiten het grondgebied van Stekene: &amp;lsquo;toelating tot begraven&amp;rsquo; afgeleverd door het gemeentebestuur op wiens grondgebied de begraafplaats gelegen is.&lt;/li&gt;\r\n&lt;/ul&gt;`,
                },
            },
            cost: {
                description: `&lt;p&gt;Zowel een voorlopig rijbewijs (18 maanden), een voorlopig rijbewijs (36 maanden) als een voorlopig rijbewijs model 3 kost 24 euro.&lt;/p&gt;\r\n&lt;p&gt;&amp;nbsp;&lt;/p&gt;`
            },
            procedure: {
                description: "&lt;p&gt;Jij of de begrafenisondernemer doet aangifte bij de ambtenaar van de burgerlijke stand van de gemeente waar het overlijden plaatsvond. Hiervoor heb je een medisch attest met vermelding van de zwangerschapsduur nodig.&lt;/p&gt;",
                websites: [
                    {
                        description: "Geboortepremie - Aanvraagformulier",
                        location: "http://start.cevi.be/ELoket/Formulier.aspx?tnr_site=91&amp;FormId=874684",
                    },
                ],
            },
            exception: `&lt;p&gt;&lt;b&gt;Vellen van bomen wegens acuut gevaar&lt;/b&gt;&lt;/p&gt;\r\n&lt;p&gt;Vormt er een boom een acuut gevaar? Dan kan deze gekapt worden met een machtiging van de burgemeester.&lt;/p&gt;\r\n&lt;p&gt;Hiervoor vul je het formulier in bijlage in en bezorg je dit ingevuld aan de dienst Natuur en Milieu. Deze machtiging, eens goedgekeurd, geldt als kapmachtiging.&lt;/p&gt;\r\n&lt;p&gt;De te vellen boom (bomen) moeten wel volgens het Natuurdecreet gecompenseerd worden door nieuwe aanplantingen van streekeigen loofbomen op het eigen perceel.&lt;/p&gt;\r\n&lt;p&gt;&amp;nbsp;&lt;/p&gt;`,
            additionalDescription: `&lt;p&gt;Er wordt een herfstsportkamp georganiseerd tijdens de herfstvakantie voor kinderen van het eerste tot en met het zesde leerjaar en dit telkens van&amp;nbsp;9 tot 16 uur in sportcentrum De Sportstek.&amp;nbsp;Voorzie sportieve kledij en een lunchpakket.&lt;/p&gt;\r\n&lt;p&gt;De folder met inschrijvingsformulier wordt&amp;nbsp;tijdig ter beschikking gesteld via de Stekense scholen en de gemeentelijke website (&lt;a href="https://www.stekene.be/thema/6504/thwebwinkel"&gt;activiteitenloket&lt;/a&gt;).&lt;/p&gt;`,
            moreInfo: [
                {
                    title: "Inburgering.be",
                    location: "http://www.inburgering.be",
                },
                {
                    title: "Contactgegevens voor een inburgeringstraject",
                    location: "https://integratie-inburgering.be/contact",
                },
            ],
            keywords: [
                "luier",
                "luiers",
                "pamper",
                "herbruikbaar",
            ],
            targetAudience: [
                TargetAudience.Burger,
                TargetAudience.Onderneming,
            ],
            theme: [
                Theme.CultuurSportVrijeTijd,
                Theme.MobiliteitOpenbareWerken,
            ],
            competentAuthorityLevel: [
                CompetentAuthorityLevel.Federaal,
                CompetentAuthorityLevel.Lokaal,
                CompetentAuthorityLevel.Vlaams,
            ],
            competentAuthority: [
                'https://data.vlaanderen.be/id/organisatie/OVO027227',
                gemeente_URL,
                'https://data.vlaanderen.be/id/organisatie/OVO000001',
            ],
            executingAuthorityLevel: [
                ExecutingAuthorityLevel.Federaal,
                ExecutingAuthorityLevel.Lokaal,
                ExecutingAuthorityLevel.Vlaams,
            ],
            executingAuthority: [
                'https://data.vlaanderen.be/id/organisatie/OVO027227',
                gemeente_URL,
                'https://data.vlaanderen.be/id/organisatie/OVO000001'
            ],
            contactPoints: [
                {
                    url: "www.stekene.be",
                    email: "Bevolking&amp;BS@stekene.be",
                    telephone: "03 790 02 12",
                    openingHours: "&lt;p&gt;Maandag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Dinsdag&amp;nbsp;&amp;nbsp;08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Woensdag 08:30-12;00; 13:30-16:30;&lt;/p&gt;\r\n&lt;p&gt;Donderdag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Vrijdag 08:30-12:00;&lt;/p&gt;\r\n&lt;p&gt;Zaterdag 09:00-12:00&lt;/p&gt;\r\n&lt;p&gt;&amp;nbsp;&lt;/p&gt;",
                    address: {
                        street: "Stadionstraat",
                        houseNumber: "2",
                        boxNumber: "B",
                        zipCode: "9190",
                        municipality: "Stekene",
                        country: "België"
                    }
                }
            ],
            createdBy: gemeente_URL
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
            const ceviProductType: ProductType = {
                id: "ignored",
                value: "Beschikbaar stellen van infrastructuur en materiaal"
            };
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

    describe('mapConditionsToRequirement', () => {

        test('Conditions nor BringToApply present, results in no Requirement', () => {
            const result = mapConditionsToRequirement(undefined, undefined);
            expect(result).toBeUndefined();
        });

        test('Conditions But Not BringToApply present, results in Requirement without Evidence', () => {
            const result = mapConditionsToRequirement('conditions', undefined);
            expect(result).toMatchObject({description: `conditions`, evidence: undefined})
        });

        test('Conditions and BringToApply present, results in Requirement with Evidence', () => {
            const result = mapConditionsToRequirement('conditions', 'bringToApply');
            expect(result).toMatchObject({description: `conditions`, evidence: {description: 'bringToApply'}})
        });

        test('BringToApply But Not Conditions present, results in Requirement (with fixed description \'Bewijsstukken mee te brengen\') with Evidence', () => {
            const result = mapConditionsToRequirement(undefined, 'bringToApply');
            expect(result).toMatchObject({
                description: `Bewijsstukken mee te brengen`,
                evidence: {description: 'bringToApply'}
            })
        });

    });

    describe('mapAmountToApplyToCost', () => {

        test('Absent AmountToApply, results in No Cost', () => {
            const result = mapAmountToApplyToCost(undefined);
            expect(result).toBeUndefined();
        });

        test('AmountToApply, results in a Cost', () => {
            const result = mapAmountToApplyToCost('amount to apply');
            expect(result).toMatchObject({
                description: 'amount to apply'
            });
        });

    });

    describe('mapProcedureAndForms', () => {

        test('Procedure and Forms Absent, results in No Procedure', () => {
            const result = mapProcedureAndForms(undefined, undefined);
            expect(result).toBeUndefined();
        });

        test('Procedure Present and Forms Absent, results in a Procedure without websites', () => {
            const result = mapProcedureAndForms('procedure', undefined);
            expect(result).toMatchObject({
                description: 'procedure'
            });
        });

        test('Procedure Present and Forms Empty, results in a Procedure with empty', () => {
            const result = mapProcedureAndForms('procedure', []);
            expect(result).toMatchObject({
                description: 'procedure',
                websites: []
            });
        });

        test('Procedure and Forms Present, results in a Procedure with websites', () => {
            const form1: Form = {sequenceNumber: "ignored", title: "title1", location: "location1"};
            const form2: Form = {sequenceNumber: "ignoredagain", title: "title2", location: "location2"};
            const result = mapProcedureAndForms('procedure', [form1, form2]);
            expect(result).toMatchObject({
                description: 'procedure',
                websites: [
                    {
                        description: "title1",
                        location: "location1"
                    },
                    {
                        description: "title2",
                        location: "location2"
                    }
                ]
            });
        });

        test('Procedure Absent and Forms Present, results in an empty Procedure with websites', () => {
            const form1: Form = {sequenceNumber: "ignored", title: "title1", location: "location1"};
            const form2: Form = {sequenceNumber: "ignoredagain", title: "title2", location: "location2"};
            const result = mapProcedureAndForms(undefined, [form1, form2]);
            expect(result).toMatchObject({
                description: undefined,
                websites: [
                    {
                        description: "title1",
                        location: "location1"
                    },
                    {
                        description: "title2",
                        location: "location2"
                    }
                ]
            });
        });

    });

    describe('mapInfoUrlsToMoreInfo', () => {

        test('Absent InfoUrls, results in No URL', () => {
            const result = mapInfoUrlsToMoreInfo(undefined);
            expect(result).toBeUndefined();
        });

        test('Empty InfoUrls, results in Empty URL', () => {
            const result = mapInfoUrlsToMoreInfo([]);
            expect(result).toEqual([]);
        });

        test('Maps InfoUrls to URLs', () => {
            const infoUrl1: Url = {sequenceNumber: "ignored", title: "title1", location: "location1"};
            const infoUrl2: Url = {sequenceNumber: "ignoredagain", title: "title2", location: "location2"};
            const result = mapInfoUrlsToMoreInfo([infoUrl1, infoUrl2]);
            expect(result).toMatchObject([
                {
                    title: "title1",
                    location: "location1"
                },
                {
                    title: "title2",
                    location: "location2"
                }]);
        });

    });

    describe('mapKeywords', () => {

        test('Empty cevi keywords, results in empty keywords', () => {
            const result = mapKeywords([]);
            expect(result).toEqual([]);
        });

        test('Maps cevi keywords to keywords', () => {
            const keyword1: Keyword = {id: 'ignored', value: 'keyword1'};
            const keyword2: Keyword = {id: 'ignoredagain', value: 'keyword2'};
            const result = mapKeywords([keyword1, keyword2]);
            expect(result).toEqual(['keyword1', 'keyword2']);
        });

        test('Ignores cevi keywords with absent values', () => {
            const keyword1: Keyword = {id: undefined, value: 'keyword1'};
            const keyword2: Keyword = {id: 'ignoredagain', value: undefined};
            const result = mapKeywords([keyword1, keyword2]);
            expect(result).toEqual(['keyword1']);
        });

    });

    describe('mapTargetGroupsToTargetAudience', () => {

        test('Empty cevi targetGroup, results in empty targetAudience', () => {
            const result = mapTargetGroupsToTargetAudience([]);
            expect(result).toEqual([]);
        });

        test('Maps cevi targetgroups to targetAudience values', () => {
            const result = mapTargetGroupsToTargetAudience([
                {id: 'ignored', value: 'Andere organisatie'},
                {id: 'ignored', value: 'Burger'},
                {id: 'ignored', value: 'Lokaal bestuur'},
                {id: 'ignored', value: 'Lokale besturen'},
                {id: 'ignored', value: 'Nieuwe inwoner'},
                {id: 'ignored', value: 'Onderneming'},
                {id: 'ignored', value: 'Organisatie'},
                {id: 'ignored', value: 'Vereniging'},
                {id: 'ignored', value: 'Vlaamse overheid'}
            ]);
            expect(result).toEqual([
                TargetAudience.Organisatie
                , TargetAudience.Burger
                , TargetAudience.LokaalBestuur
                , TargetAudience.LokaalBestuur
                , TargetAudience.Burger
                , TargetAudience.Onderneming
                , TargetAudience.Organisatie
                , TargetAudience.Vereniging
                , TargetAudience.VlaamseOverheid]);
        });

        test('Filters unknown cevi targetgroups', () => {
            const result = mapTargetGroupsToTargetAudience([{id: 'ignored', value: 'Some unknown value'},]);
            expect(result).toEqual([]);
        })

    });

    describe('mapCeviThemesToThemes', () => {

        test('Empty cevi themes, results in empty themes', () => {
            const result = mapCeviThemesToTheme([]);
            expect(result).toEqual([]);
        });

        test('Maps cevi themes to themes', () => {
            const result = mapCeviThemesToTheme([
                {id: 'ignored', value: 'Bouwen en Wonen'},
                {id: 'ignored', value: 'Burger en Overheid'},
                {id: 'ignored', value: 'Cultuur, Sport en Vrije Tijd'},
                {id: 'ignored', value: 'Economie en Werk'},
                {id: 'ignored', value: 'Energie'},
                {id: 'ignored', value: 'Energieloket'},
                {id: 'ignored', value: 'Milieu en Energie'},
                {id: 'ignored', value: 'Mobiliteit en Openbare Werken'},
                {id: 'ignored', value: 'Onderwijs en Wetenschap'},
                {id: 'ignored', value: 'Welzijn en Gezondheid'},
            ]);
            expect(result).toEqual([
                Theme.BouwenWonen
                , Theme.BurgerOverheid
                , Theme.CultuurSportVrijeTijd
                , Theme.EconomieWerk
                , Theme.MilieuEnergie
                , Theme.MilieuEnergie
                , Theme.MilieuEnergie
                , Theme.MobiliteitOpenbareWerken
                , Theme.OnderwijsWetenschap
                , Theme.WelzijnGezondheid]);
        });

        test('Filters unknown cevi themes', () => {
            const result = mapCeviThemesToTheme([{id: 'ignored', value: 'unknown'}]);
            expect(result).toEqual([]);
        });

        test('Filters undefined cevi theme values', () => {
            const result = mapCeviThemesToTheme([{id: 'ignored', value: undefined}]);
            expect(result).toEqual([]);
        });

    });

    describe('mapDeliveringDepartmentsToExecutingAuthorityLevel', () => {

        test('Empty delivering departments themes, results in empty executing authority levels', () => {
            const result = mapDeliveringDepartmentsToExecutingAuthorityLevel([]);
            expect(result).toEqual([]);
        });

        test('Translates delivering departments themes Vlaamse Overheid directly, Federale Overheid directly, all else becomes Lokale overheid', () => {
            const result = mapDeliveringDepartmentsToExecutingAuthorityLevel([
                {
                    id: 'ignored',
                    name: 'Vlaamse overheid',
                    address: {}
                },
                {
                    id: 'ignored',
                    name: 'Federale overheid',
                    address: {}
                },
                {
                    id: 'ignored',
                    name: 'Departement Cultuur',
                    address: {}
                },
            ]);
            expect(result).toEqual([
                ExecutingAuthorityLevel.Federaal,
                ExecutingAuthorityLevel.Lokaal,
                ExecutingAuthorityLevel.Vlaams])
        });

        test('Translates delivering departments themes ; and filters duplicates', () => {
            const result = mapDeliveringDepartmentsToExecutingAuthorityLevel([
                {
                    id: 'ignored',
                    name: 'Vlaamse overheid',
                    address: {}
                },

                {
                    id: 'ignored',
                    name: 'Federale overheid',
                    address: {}
                },
                {
                    id: 'ignored',
                    name: 'Departement Cultuur',
                    address: {}
                },
                {
                    id: 'ignored',
                    name: 'Federale overheid',
                    address: {}
                },
                {
                    id: 'ignored',
                    name: 'Departement Groendienst',
                    address: {}
                },
                {
                    id: 'ignored',
                    name: 'Vlaamse overheid',
                    address: {}
                },
            ]);
            expect(result).toEqual([
                ExecutingAuthorityLevel.Federaal,
                ExecutingAuthorityLevel.Lokaal,
                ExecutingAuthorityLevel.Vlaams,])
        });

    });

    describe('mapExecutingAuthorityBasedOnExecutingAuthorityLevel', () => {

        test('Empty delivering executingAuthorityLevel, results in empty executing authority', () => {
            const result = mapExecutingAuthorityBasedOnExecutingAuthorityLevel([], 'lokaalBestuurUrl');
            expect(result).toEqual([]);
        });

        test('Translates to Vlaamse Overheid url, to Federale Overheid url, all else to lokaalBestuurUrl', () => {
            const result = mapExecutingAuthorityBasedOnExecutingAuthorityLevel([
                    ExecutingAuthorityLevel.Vlaams,
                    ExecutingAuthorityLevel.Federaal,
                    ExecutingAuthorityLevel.Lokaal],
                'lokaalBestuurUrl');

            expect(result).toEqual([
                'https://data.vlaanderen.be/id/organisatie/OVO000001',
                'https://data.vlaanderen.be/id/organisatie/OVO027227',
                'lokaalBestuurUrl'])
        });
    });

    describe('mapAuthorisedDepartmentsToCompetentAuthorityLevel', () => {

        test('Empty Authorised departments themes, results in empty Competent authority levels', () => {
            const result = mapAuthorisedDepartmentsToCompetentAuthorityLevel([]);
            expect(result).toEqual([]);
        });

        test('Translates Authorised departments themes Vlaamse Overheid directly, Federale Overheid directly, all else becomes Lokale overheid', () => {
            const result = mapAuthorisedDepartmentsToCompetentAuthorityLevel([
                {
                    id: 'ignored',
                    name: 'Vlaamse overheid',
                    address: {}
                },
                {
                    id: 'ignored',
                    name: 'Federale overheid',
                    address: {}
                },
                {
                    id: 'ignored',
                    name: 'Departement Cultuur',
                    address: {}
                },
            ]);
            expect(result).toEqual([
                CompetentAuthorityLevel.Federaal,
                CompetentAuthorityLevel.Lokaal,
                CompetentAuthorityLevel.Vlaams])
        });

        test('Translates delivering departments themes ; and filters duplicates', () => {
            const result = mapAuthorisedDepartmentsToCompetentAuthorityLevel([
                {
                    id: 'ignored',
                    name: 'Vlaamse overheid',
                    address: {}
                },

                {
                    id: 'ignored',
                    name: 'Federale overheid',
                    address: {}
                },
                {
                    id: 'ignored',
                    name: 'Departement Cultuur',
                    address: {}
                },
                {
                    id: 'ignored',
                    name: 'Federale overheid',
                    address: {}
                },
                {
                    id: 'ignored',
                    name: 'Departement Groendienst',
                    address: {}
                },
                {
                    id: 'ignored',
                    name: 'Vlaamse overheid',
                    address: {}
                },
            ]);
            expect(result).toEqual([
                CompetentAuthorityLevel.Federaal,
                CompetentAuthorityLevel.Lokaal,
                CompetentAuthorityLevel.Vlaams,])
        });

    });

    describe('mapCompetentAuthorityBasedOnCompetentAuthorityLevel', () => {

        test('Empty delivering competentAuthorityLevel, results in empty competent authority', () => {
            const result = mapCompetentAuthorityBasedOnCompetentAuthorityLevel([], 'lokaalBestuurUrl');
            expect(result).toEqual([]);
        });

        test('Translates to Vlaamse Overheid url, to Federale Overheid url, all else to lokaalBestuurUrl', () => {
            const result = mapCompetentAuthorityBasedOnCompetentAuthorityLevel([
                    CompetentAuthorityLevel.Vlaams,
                    CompetentAuthorityLevel.Federaal,
                    CompetentAuthorityLevel.Lokaal],
                'lokaalBestuurUrl');

            expect(result).toEqual([
                'https://data.vlaanderen.be/id/organisatie/OVO000001',
                'https://data.vlaanderen.be/id/organisatie/OVO027227',
                'lokaalBestuurUrl'])
        });
    });

    describe('mapContactPoints', () => {

        test('empty deliveringDepartments and authorisedDepartments returns empty ContactPoints array', () => {
            const result = mapContactPoints([], []);
            expect(result).toEqual([]);
        });

        test('empty deliveringDepartment > address is not retained', () => {
            const result = mapContactPoints([{}], []);
            expect(result).toEqual([]);
        });

        test('empty authorisedDepartment > address is not retained', () => {
            const result = mapContactPoints([], [{}]);
            expect(result).toEqual([]);
        });

        test('empty deliveringDepartment and authorisedDepartment > address are not retained', () => {
            const result = mapContactPoints([{}], [{}]);
            expect(result).toEqual([]);
        });

        test('maps an authorisedDepartments address to a ContactPoint', () => {
            const result = mapContactPoints([
                {
                    address: {
                        website: 'website',
                        email: 'email',
                        phone: 'phone',
                        openingHours: 'openingHours',
                        street: 'street',
                        houseNumber: 'houseNumber',
                        boxNumber: 'boxNumber',
                        zipCode: 'zipCode',
                        municipality: 'municipality'
                    }
                },
                {
                    address: undefined
                }
            ], [{}]);
            expect(result).toMatchObject([{
                url: 'website',
                email: 'email',
                telephone: 'phone',
                openingHours: 'openingHours',
                address:
                    {
                        street: 'street',
                        houseNumber: 'houseNumber',
                        boxNumber: 'boxNumber',
                        zipCode: 'zipCode',
                        municipality: 'municipality',
                        country: 'België',
                    },
            }]);
        });

        test('maps an deliveringDepartment address to a ContactPoint', () => {
            const result = mapContactPoints([],
                [
                    {
                        address: {
                            website: 'website',
                            email: 'email',
                            phone: 'phone',
                            openingHours: 'openingHours',
                            street: 'street',
                            houseNumber: 'houseNumber',
                            boxNumber: 'boxNumber',
                            zipCode: 'zipCode',
                            municipality: 'municipality'
                        }
                    },
                    {
                        address: undefined
                    }

                ]);
            expect(result).toMatchObject([{
                url: 'website',
                email: 'email',
                telephone: 'phone',
                openingHours: 'openingHours',
                address:
                    {
                        street: 'street',
                        houseNumber: 'houseNumber',
                        boxNumber: 'boxNumber',
                        zipCode: 'zipCode',
                        municipality: 'municipality',
                        country: 'België',
                    },
            }]);
        });

        test('an deliveringDepartment address takes precedence over authorised department address', () => {
            const result = mapContactPoints([
                    {
                        address: {
                            website: 'website delivering',
                            email: 'email delivering',
                            phone: 'phone delivering',
                            openingHours: 'openingHours delivering',
                            street: 'street delivering',
                            houseNumber: 'houseNumber delivering',
                            boxNumber: 'boxNumber delivering',
                            zipCode: 'zipCode delivering',
                            municipality: 'municipality delivering'
                        }
                    },
                    {
                        address: undefined
                    }
                ],
                [
                    {
                        address: {
                            website: 'website authorised',
                            email: 'email authorised',
                            phone: 'phone authorised',
                            openingHours: 'openingHours authorised',
                            street: 'street authorised',
                            houseNumber: 'houseNumber authorised',
                            boxNumber: 'boxNumber authorised',
                            zipCode: 'zipCode authorised',
                            municipality: 'municipality authorised'
                        }
                    },
                    {
                        address: undefined
                    }
                ]);
            expect(result).toMatchObject([{
                url: 'website delivering',
                email: 'email delivering',
                telephone: 'phone delivering',
                openingHours: 'openingHours delivering',
                address:
                    {
                        street: 'street delivering',
                        houseNumber: 'houseNumber delivering',
                        boxNumber: 'boxNumber delivering',
                        zipCode: 'zipCode delivering',
                        municipality: 'municipality delivering',
                        country: 'België',
                    },
            }]);
        });

        describe('partially filled in department address creates a ContactPoint', () => {

            test('website', () => {
                const result = mapDepartmentAddressToContactPoint({address: {website: 'website'}});
                expect(result).toMatchObject({url: 'website'});
            });

            test('email', () => {
                const result = mapDepartmentAddressToContactPoint({address: {email: 'email'}});
                expect(result).toMatchObject({email: 'email'});
            });

            test('phone', () => {
                const result = mapDepartmentAddressToContactPoint({address: {phone: 'phone'}});
                expect(result).toMatchObject({telephone: 'phone'});
            });

            test('openingHours', () => {
                const result = mapDepartmentAddressToContactPoint({address: {openingHours: 'openingHours'}});
                expect(result).toMatchObject({openingHours: 'openingHours'});
            });

            test('street', () => {
                const result = mapDepartmentAddressToContactPoint({address: {street: 'street'}});
                expect(result).toMatchObject({address: {street: 'street'}});
            });

            test('houseNumber', () => {
                const result = mapDepartmentAddressToContactPoint({address: {houseNumber: 'houseNumber'}});
                expect(result).toMatchObject({address: {houseNumber: 'houseNumber'}});
            });

            test('boxNumber', () => {
                const result = mapDepartmentAddressToContactPoint({address: {boxNumber: 'boxNumber'}});
                expect(result).toMatchObject({address: {boxNumber: 'boxNumber'}});
            });

            test('boxNumber', () => {
                const result = mapDepartmentAddressToContactPoint({address: {zipCode: 'zipCode'}});
                expect(result).toMatchObject({address: {zipCode: 'zipCode'}});
            });

            test('municipality', () => {
                const result = mapDepartmentAddressToContactPoint({address: {municipality: 'municipality'}});
                expect(result).toMatchObject({address: {municipality: 'municipality'}});
            });

        });


    })

    describe('map abbProduct to Triples', () => {

        let testAbbProduct: AbbProduct;
        let testTriplesArray: Triple[];
        let testStringArray: string[];

        beforeAll(() => {
            const migrationDate = new Date();
            testAbbProduct = mapToABBProduct(ceviProducts[0], migrationDate, gemeente_URL);
            testTriplesArray = testAbbProduct.toTriples();
            testStringArray = testTriplesArray.map(aTriple => aTriple.toString());
        });

        test('The array of strings should contain a string with the uuid of the abb instance', () => {
            expect(testStringArray).toContainEqual(
                `<${testAbbProduct.id}> <http://mu.semte.ch/vocabularies/core/uuid> "${testAbbProduct.uuid}" .`
            )});

        test('The array of strings should contain a string with PublicService as type', () => {
            expect(testStringArray).toContainEqual(
                `<${testAbbProduct.id}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/vocab/cpsv#PublicService> .`
            )});

        test('The array of strings should contain a string with title value "Levenloos geboren kind/foetus"@nl', () => {
            expect(testStringArray).toContainEqual(
                `<${testAbbProduct.id}> <http://purl.org/dc/terms/title> "Levenloos geboren kind/foetus"@nl .`
            )});

        test('The array of strings should contain a string with the correct description value', () => {
            expect(testStringArray).toContainEqual(
                `<${testAbbProduct.id}> <http://purl.org/dc/terms/description> "&lt;p&gt;Sterft je kindje tijdens de zwangerschap? Dan voelen we in de eerste plaats heel erg met je mee.&lt;/p&gt;
&lt;p&gt;De registratie van kindjes kan vrijblijvend vanaf 140 dagen zwangerschap met toekenning van een voornaam of voornamen. Vanaf 180 dagen zwangerschap is registratie verplicht. Vanaf dat moment kunnen ouders ook een familienaam toekennen als ze dit wensen.&lt;/p&gt;"@nl .`
            )});

        test('This test fails', () => {
            expect(testStringArray).toMatchObject(
                `<${testAbbProduct.id}> <http://mu.semte.ch/vocabularies/core/uuid> "${testAbbProduct.uuid}" .`
            )});

        })
});
