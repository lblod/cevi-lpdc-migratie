import {beforeAll, describe, expect, test} from 'vitest';
import {CeviProduct} from "../src/ceviProduct";
import {readCeviXml} from "../src/readCeviXml";
import {
    mapAmountToApplyToCost,
    mapAuthorisedDepartmentsToCompetentAuthorityLevel,
    mapCeviThemesToTheme,
    mapCompetentAuthorityBasedOnCompetentAuthorityLevel,
    mapConditionsToRequirement,
    mapContactPoints,
    mapDeliveringDepartmentsToExecutingAuthorityLevel,
    mapDepartmentAddressToContactPoint,
    mapExecutingAuthorityBasedOnExecutingAuthorityLevel,
    mapInfoUrlsToMoreInfo,
    mapKeywords,
    mapProcedureAndForms,
    mapProductId,
    mapProductType,
    mapTargetGroupsToTargetAudience,
    mapToABBProduct
} from "../src/mapToABBProduct";
import {Form, Keyword, ProductType, Url} from "../src/types";
import {CompetentAuthorityLevel, ExecutingAuthorityLevel, TargetAudience, Theme} from "../src/abbProduct";
import {Language} from "../src/language";

const gemeente_URL = "http://data.lblod.info/id/bestuurseenheden/6025a5d1ca2262a784f002edd8ce9ca9073ae3d5ebc6b6b5531f05a29e9250af";
const gemeente_nis2019_URL = "http://vocab.belgif.be/auth/refnis2019/46024";
const sparqlClientUrL = `http://localhost:8896/sparql`;


describe("map xml to ceviproduct", () => {
    let ceviProducts: CeviProduct[] = [];

    beforeAll(async () => {
        ceviProducts = await readCeviXml('src/resources/LPDC_CEVI.xml');
    })

    test('The mapXmlToCeviProduct function should generate as 2nd instance an object with id 210001', () => {
        expect(ceviProducts[1].id).toEqual('210001');
        expect(ceviProducts[1].bringToApply).toEqual("<ul>\n<li>Het document waarop de handtekening staat en gewettigd moet worden</li>\n<li>De identiteitskaart van diegene wiens handtekening gewettigd moet worden</li>\n</ul>");
    })

    test('map xml to ceviProduct', async () => {
        //TODO LPDC-718: no example for Attachments (which to take over if they are in the form of an URL), so skipping for now; mapping code not done either ...
        //TODO LPDC-718: no example for UploadedAttachments (which to take over if they are in the form of an URL), so skipping for now
        expect(ceviProducts[0]).toEqual(new CeviProduct(
            "1502",
            {id: "0", value: "IPDC"},
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
            }, {
                id: "108031",
                value: "Mobiliteit en openbare werken",
            }],
            [
                {
                    addresses: [],
                    id: "c2e69322-6ec4-4786-b05a-3ebc8beed3f5",
                    name: "Federale overheid",
                },
                {
                    addresses: [],
                    id: "ddfc31ff-909b-439d-a4d6-66c6b17801ed",
                    name: "Vlaamse overheid",
                },
                {
                    id: "210",
                    name: "Burgerzaken",
                    addresses: [
                        {
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
                            email: "Bevolking&BS@stekene.be",
                            facebook: undefined,
                            twitter: undefined,
                            openingHours: "<p>Maandag 08:30-12:00;</p>\n<p>Dinsdag 08:30-12:00;</p>\n<p>Woensdag 08:30-12;00; 13:30-16:30;</p>\n<p>Donderdag 08:30-12:00;</p>\n<p>Vrijdag 08:30-12:00;</p>\n<p>Zaterdag 09:00-12:00</p>\n"
                        },
                        {
                            id: "88625e70-5356-44a1-b7b0-63f5c5b1c895",
                            name: "Kerkstraat 35",
                            street: "Kerkstraat",
                            houseNumber: "35",
                            boxNumber: "C",
                            zipCode: "9190",
                            municipality: "Stekene",
                            phone: "03 790 02 12",
                            fax: "03 790 02 10",
                            website: "www.stekene.be",
                            email: undefined,
                            facebook: undefined,
                            twitter: undefined,
                            openingHours: undefined
                        }
                    ]
                },
                {
                    addresses: [],
                    id: "12",
                    name: "Team Cultuur, Sport en Vrije tijd",
                }
            ],
            [
                {
                    addresses: [],
                    id: "10",
                    name: "Team Lokale economie, Toerisme en Werk",
                },
                {
                    addresses: [],
                    id: "ddfc31ff-909b-439d-a4d6-66c6b17801ed",
                    name: "Vlaamse overheid",
                },
                {
                    id: "200",
                    name: "Burger &amp; Welzijnszaken",
                    addresses: [{
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
                        email: "Bevolking&BS@stekene.be",
                        facebook: undefined,
                        twitter: undefined,
                        openingHours: `<p>Maandag 08:30-12:00;</p>\n<p>Dinsdag 08:30-12:00;</p>\n<p>Woensdag 08:30-12;00; 13:30-16:30;</p>\n<p>Donderdag 08:30-12:00;</p>\n<p>Vrijdag 08:30-12:00;</p>\n<p>Zaterdag 09:00-12:00</p>\n`
                    }]
                },
                {
                    addresses: [],
                    id: "c2e69322-6ec4-4786-b05a-3ebc8beed3f5",
                    name: "Federale overheid",
                }
            ],
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
            "<p>Sterft je kindje tijdens de zwangerschap? Dan voelen we in de eerste plaats heel erg met je mee.</p>\n<p>De registratie van kindjes kan vrijblijvend vanaf 140 dagen zwangerschap met toekenning van een voornaam of voornamen. Vanaf 180 dagen zwangerschap is registratie verplicht. Vanaf dat moment kunnen ouders ook een familienaam toekennen als ze dit wensen.</p>",
            "2023-09-10",
            "2023-10-12",
            `<ul>\n<li>De persoon van wie de handtekening moet gewettigd worden, moet zijn woonplaats hebben in de gemeente</li>\n<li>Het document mag niet bestemd zijn voor immorele, bedrieglijke of strafbare oogmerken</li>\n<li>De formaliteit moet nuttig of nodig zijn. Het mag bijgevolg niet gaan om een louter private akte (een eigenhandig geschreven testament bijvoorbeeld)</li>\n</ul>`,
            `<p>Wat meebrengen indien je geen begrafenisonderneming zou hebben</p>\n<ul>\n<li>Overlijdensattest en medische attesten afgeleverd door de geneesheer die het overlijden vaststelde.</li>\n<li>De identiteitskaart en eventueel het rijbewijs van de overledene.</li>\n<li>Eventueel het huwelijksboekje van de overledene.</li>\n<li>Van niet-inwoners die overleden zijn te Stekene: attest inzake de laatste wilsbeschikking, afgeleverd door het gemeentebestuur van de laatste woonplaats.</li>\n<li>voor begravingen buiten het grondgebied van Stekene: &lsquo;toelating tot begraven&rsquo; afgeleverd door het gemeentebestuur op wiens grondgebied de begraafplaats gelegen is.</li>\n</ul>`,
            `Some Legal Text`,
            `<p>Zowel een voorlopig rijbewijs (18 maanden), een voorlopig rijbewijs (36 maanden) als een voorlopig rijbewijs model 3 kost 24 euro.</p>\n<p>&nbsp;</p>`,
            "<p>Jij of de begrafenisondernemer doet aangifte bij de ambtenaar van de burgerlijke stand van de gemeente waar het overlijden plaatsvond. Hiervoor heb je een medisch attest met vermelding van de zwangerschapsduur nodig.</p>",
            `<p><b>Vellen van bomen wegens acuut gevaar</b></p>\n<p>Vormt er een boom een acuut gevaar? Dan kan deze gekapt worden met een machtiging van de burgemeester.</p>\n<p>Hiervoor vul je het formulier in bijlage in en bezorg je dit ingevuld aan de dienst Natuur en Milieu. Deze machtiging, eens goedgekeurd, geldt als kapmachtiging.</p>\n<p>De te vellen boom (bomen) moeten wel volgens het Natuurdecreet gecompenseerd worden door nieuwe aanplantingen van streekeigen loofbomen op het eigen perceel.</p>\n<p>&nbsp;</p>`,
            `<p>Er wordt een herfstsportkamp georganiseerd tijdens de herfstvakantie voor kinderen van het eerste tot en met het zesde leerjaar en dit telkens van&nbsp;9 tot 16 uur in sportcentrum De Sportstek.&nbsp;Voorzie sportieve kledij en een lunchpakket.</p>\n<p>De folder met inschrijvingsformulier wordt&nbsp;tijdig ter beschikking gesteld via de Stekense scholen en de gemeentelijke website (<a href="https://www.stekene.be/thema/6504/thwebwinkel">activiteitenloket</a>).</p>`,
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
                    title: "<strong>Geboortepremie - Aanvraagformulier</strong>",
                    location: "http://start.cevi.be/ELoket/Formulier.aspx?tnr_site=91&FormId=874684"
                },
                {
                    sequenceNumber: "2",
                    title: "<strong>Verbruik nutsvoorziening - Aanvraagformulier premie</strong>",
                    location: "http://start.cevi.be/ELoket/Formulier.aspx?tnr_site=91&FormId=688849"
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

    let ceviProducts: CeviProduct[] = [];

    beforeAll(async () => {
        ceviProducts = await readCeviXml('src/resources/LPDC_CEVI.xml');
    })

    test('should throw error when title contains te verwijderen', async () => {
        const migrationDate = new Date();

        await expect(async () => mapToABBProduct(ceviProducts[4], migrationDate, gemeente_URL, gemeente_nis2019_URL, sparqlClientUrL))
            .rejects
            .toThrowError(`Title of cevi product contains 'te verwijderen'`)
    })

    test('map minimal required items from xml to ceviProduct and to abbProduct', async () => {
        const migrationDate = new Date();
        const abbProduct = await mapToABBProduct(ceviProducts[2], migrationDate, gemeente_URL, gemeente_nis2019_URL, sparqlClientUrL);

        expect(abbProduct).toMatchObject({
            productType: "AdviesBegeleiding",
            createdBy: gemeente_URL,
        });
    });

    test('map with arrays of one element xml to ceviProduct and to abbProduct', async () => {
        const migrationDate = new Date();
        const abbProduct = await mapToABBProduct(ceviProducts[3], migrationDate, gemeente_URL, gemeente_nis2019_URL, sparqlClientUrL);

        expect(abbProduct).toMatchObject({
            productType: "AdviesBegeleiding",
            createdBy: gemeente_URL,
            keywords: [
                "luier",
            ],
            moreInfo: [
                {
                    title: "Inburgering.be",
                    location: "http://www.inburgering.be",
                },
            ],
            procedure: {
                websites: [
                    {
                        description: "Verbruik nutsvoorziening - Aanvraagformulier premie",
                        location: "http://start.cevi.be/ELoket/Formulier.aspx?tnr_site=91&FormId=688849",
                    }
                ],
            },
            targetAudience: [
                TargetAudience.Onderneming,
            ],
            theme: [
                Theme.MobiliteitOpenbareWerken,
            ],
            competentAuthorityLevel: [
                CompetentAuthorityLevel.Federaal,
            ],
            competentAuthority: [
                'https://data.vlaanderen.be/id/organisatie/OVO027227',
            ],
            executingAuthorityLevel: [
                ExecutingAuthorityLevel.Lokaal,
                ExecutingAuthorityLevel.Vlaams,
            ],
            executingAuthority: [
                gemeente_URL,
                'https://data.vlaanderen.be/id/organisatie/OVO000001'
            ],
        });
    });

    test('map full item from xml to ceviProduct and to abbProduct', async () => {
        const migrationDate = new Date();
        const abbProduct = await mapToABBProduct(ceviProducts[0], migrationDate, gemeente_URL, gemeente_nis2019_URL, sparqlClientUrL);

        expect(abbProduct).toMatchObject({
            productId: '1502',
            title: "Levenloos geboren kind/foetus",
            description: "<p>Sterft je kindje tijdens de zwangerschap? Dan voelen we in de eerste plaats heel erg met je mee.</p>\n<p>De registratie van kindjes kan vrijblijvend vanaf 140 dagen zwangerschap met toekenning van een voornaam of voornamen. Vanaf 180 dagen zwangerschap is registratie verplicht. Vanaf dat moment kunnen ouders ook een familienaam toekennen als ze dit wensen.</p>",
            startDate: new Date("2023-09-10"),
            endDate: new Date("2023-10-12"),
            productType: "AdviesBegeleiding",
            requirement: {
                description: `<ul>\n<li>De persoon van wie de handtekening moet gewettigd worden, moet zijn woonplaats hebben in de gemeente</li>\n<li>Het document mag niet bestemd zijn voor immorele, bedrieglijke of strafbare oogmerken</li>\n<li>De formaliteit moet nuttig of nodig zijn. Het mag bijgevolg niet gaan om een louter private akte (een eigenhandig geschreven testament bijvoorbeeld)</li>\n</ul>`,
                evidence: {
                    description: `<p>Wat meebrengen indien je geen begrafenisonderneming zou hebben</p>\n<ul>\n<li>Overlijdensattest en medische attesten afgeleverd door de geneesheer die het overlijden vaststelde.</li>\n<li>De identiteitskaart en eventueel het rijbewijs van de overledene.</li>\n<li>Eventueel het huwelijksboekje van de overledene.</li>\n<li>Van niet-inwoners die overleden zijn te Stekene: attest inzake de laatste wilsbeschikking, afgeleverd door het gemeentebestuur van de laatste woonplaats.</li>\n<li>voor begravingen buiten het grondgebied van Stekene: &lsquo;toelating tot begraven&rsquo; afgeleverd door het gemeentebestuur op wiens grondgebied de begraafplaats gelegen is.</li>\n</ul>`,
                },
            },
            cost: {
                description: `<p>Zowel een voorlopig rijbewijs (18 maanden), een voorlopig rijbewijs (36 maanden) als een voorlopig rijbewijs model 3 kost 24 euro.</p>\n<p>&nbsp;</p>`
            },
            procedure: {
                description: "<p>Jij of de begrafenisondernemer doet aangifte bij de ambtenaar van de burgerlijke stand van de gemeente waar het overlijden plaatsvond. Hiervoor heb je een medisch attest met vermelding van de zwangerschapsduur nodig.</p>",
                websites: [
                    {
                        description: "<strong>Geboortepremie - Aanvraagformulier</strong>",
                        location: "http://start.cevi.be/ELoket/Formulier.aspx?tnr_site=91&FormId=874684",
                    },
                    {
                        description: "<strong>Verbruik nutsvoorziening - Aanvraagformulier premie</strong>",
                        location: "http://start.cevi.be/ELoket/Formulier.aspx?tnr_site=91&FormId=688849",
                    }
                ],
            },
            exception: `<p><b>Vellen van bomen wegens acuut gevaar</b></p>\n<p>Vormt er een boom een acuut gevaar? Dan kan deze gekapt worden met een machtiging van de burgemeester.</p>\n<p>Hiervoor vul je het formulier in bijlage in en bezorg je dit ingevuld aan de dienst Natuur en Milieu. Deze machtiging, eens goedgekeurd, geldt als kapmachtiging.</p>\n<p>De te vellen boom (bomen) moeten wel volgens het Natuurdecreet gecompenseerd worden door nieuwe aanplantingen van streekeigen loofbomen op het eigen perceel.</p>\n<p>&nbsp;</p>`,
            additionalDescription: `<p>Er wordt een herfstsportkamp georganiseerd tijdens de herfstvakantie voor kinderen van het eerste tot en met het zesde leerjaar en dit telkens van&nbsp;9 tot 16 uur in sportcentrum De Sportstek.&nbsp;Voorzie sportieve kledij en een lunchpakket.</p>\n<p>De folder met inschrijvingsformulier wordt&nbsp;tijdig ter beschikking gesteld via de Stekense scholen en de gemeentelijke website (<a href="https://www.stekene.be/thema/6504/thwebwinkel">activiteitenloket</a>).</p>`,
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
                    url: "https://www.stekene.be",
                    email: "Bevolking&BS@stekene.be",
                    telephone: "03 790 02 12",
                    openingHours: "Maandag 08:30-12:00; \nDinsdag 08:30-12:00; \nWoensdag 08:30-12;00; 13:30-16:30; \nDonderdag 08:30-12:00; \nVrijdag 08:30-12:00; \nZaterdag 09:00-12:00 \n",
                    address: {
                        street: "Stadionstraat",
                        houseNumber: "2",
                        boxNumber: "B",
                        zipCode: "9190",
                        municipality: "Stekene",
                        country: "België"
                    }
                },
                {
                    url: "https://www.stekene.be",
                    email: undefined,
                    telephone: "03 790 02 12",
                    openingHours: undefined,
                    address: {
                        street: "Kerkstraat",
                        houseNumber: "35",
                        boxNumber: "C",
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
                        location: "https://location1"
                    },
                    {
                        description: "title2",
                        location: "https://location2"
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
                        location: "https://location1"
                    },
                    {
                        description: "title2",
                        location: "https://location2"
                    }
                ]
            });
        });

    });

    describe('mapInfoUrlsToMoreInfo', () => {

        test('Absent InfoUrls, results in No URL', () => {
            const result = mapInfoUrlsToMoreInfo(undefined);
            expect(result).toEqual([]);
        });

        test('Empty InfoUrls, results in Empty URL', () => {
            const result = mapInfoUrlsToMoreInfo([]);
            expect(result).toEqual([]);
        });

        test('Maps InfoUrls to URLs', () => {
            const infoUrl1: Url = {sequenceNumber: "ignored", title: "title1", location: "location1"};
            const infoUrl2: Url = {sequenceNumber: "ignoredagain", title: "title2", location: "location2"};
            const infoUrl3: Url = {sequenceNumber: "ignoredagain", title: "title3", location: "http://location3"};
            const infoUrl4: Url = {sequenceNumber: "ignoredagain", title: "title4", location: "https://location4"};
            const result = mapInfoUrlsToMoreInfo([infoUrl1, infoUrl2, infoUrl3, infoUrl4]);
            expect(result).toMatchObject([
                {
                    title: "title1",
                    location: "https://location1"
                },
                {
                    title: "title2",
                    location: "https://location2"
                },
                {
                    title: "title3",
                    location: "http://location3"
                },
                {
                    title: "title4",
                    location: "https://location4"
                },
            ]);
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

        test('Maps cevi themes to themes case insensitively', () => {
            const result = mapCeviThemesToTheme([
                {id: 'ignored', value: 'Bouwen en wonen'},
                {id: 'ignored', value: 'Burger en overheid'},
                {id: 'ignored', value: 'Cultuur, sport en Vrije Tijd'},
                {id: 'ignored', value: 'Economie en werk'},
                {id: 'ignored', value: 'energie'},
                {id: 'ignored', value: 'energieloket'},
                {id: 'ignored', value: 'milieu en Energie'},
                {id: 'ignored', value: 'Mobiliteit en openbare Werken'},
                {id: 'ignored', value: 'Onderwijs en wetenschap'},
                {id: 'ignored', value: 'Welzijn en gezondheid'},
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

        test('Empty delivering departments themes, results in Executing Authority Level Lokaal', () => {
            const result = mapDeliveringDepartmentsToExecutingAuthorityLevel([]);
            expect(result).toEqual([
                ExecutingAuthorityLevel.Lokaal,
            ]);
        });

        test('Delivering departments themes Only Vlaams, results in Executing Authority Level Vlaams and Lokaal', () => {
            const result = mapDeliveringDepartmentsToExecutingAuthorityLevel([
                {
                    id: 'ignored',
                    name: 'Vlaamse overheid',
                    addresses: []
                },

            ]);
            expect(result).toEqual([
                ExecutingAuthorityLevel.Lokaal,
                ExecutingAuthorityLevel.Vlaams,
            ]);
        });

        test('Delivering departments themes Only Federaal, results in Executing Authority Level Federaal and Lokaal', () => {
            const result = mapDeliveringDepartmentsToExecutingAuthorityLevel([
                {
                    id: 'ignored',
                    name: 'Federale overheid',
                    addresses: []
                },

            ]);
            expect(result).toEqual([
                ExecutingAuthorityLevel.Federaal,
                ExecutingAuthorityLevel.Lokaal,
            ]);
        });

        test('Translates delivering departments themes Vlaamse Overheid directly, Federale Overheid directly, all else becomes Lokale overheid', () => {
            const result = mapDeliveringDepartmentsToExecutingAuthorityLevel([
                {
                    id: 'ignored',
                    name: 'Vlaamse overheid',
                    addresses: []
                },
                {
                    id: 'ignored',
                    name: 'Federale overheid',
                    addresses: []
                },
                {
                    id: 'ignored',
                    name: 'Departement Cultuur',
                    addresses: []
                },
            ]);
            expect(result).toEqual([
                ExecutingAuthorityLevel.Federaal,
                ExecutingAuthorityLevel.Lokaal,
                ExecutingAuthorityLevel.Vlaams,
            ])
        });

        test('Translates delivering departments themes ; and filters duplicates', () => {
            const result = mapDeliveringDepartmentsToExecutingAuthorityLevel([
                {
                    id: 'ignored',
                    name: 'Vlaamse overheid',
                    addresses: []
                },
                {
                    id: 'ignored',
                    name: 'Federale overheid',
                    addresses: []
                },
                {
                    id: 'ignored',
                    name: 'Departement Cultuur',
                    addresses: []
                },
                {
                    id: 'ignored',
                    name: 'Federale overheid',
                    addresses: []
                },
                {
                    id: 'ignored',
                    name: 'Departement Groendienst',
                    addresses: []
                },
                {
                    id: 'ignored',
                    name: 'Vlaamse overheid',
                    addresses: []
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
                    addresses: []
                },
                {
                    id: 'ignored',
                    name: 'Federale overheid',
                    addresses: []
                },
                {
                    id: 'ignored',
                    name: 'Departement Cultuur',
                    addresses: []
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
                    addresses: []
                },
                {
                    id: 'ignored',
                    name: 'Federale overheid',
                    addresses: []
                },
                {
                    id: 'ignored',
                    name: 'Departement Cultuur',
                    addresses: []
                },
                {
                    id: 'ignored',
                    name: 'Federale overheid',
                    addresses: []
                },
                {
                    id: 'ignored',
                    name: 'Departement Groendienst',
                    addresses: []
                },
                {
                    id: 'ignored',
                    name: 'Vlaamse overheid',
                    addresses: []
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
            const result = mapContactPoints([{addresses: []}], []);
            expect(result).toEqual([]);
        });

        test('empty authorisedDepartment > address is not retained', () => {
            const result = mapContactPoints([], [{addresses: []}]);
            expect(result).toEqual([]);
        });

        test('empty deliveringDepartment and authorisedDepartment > address are not retained', () => {
            const result = mapContactPoints([{addresses: [{}]}], [{addresses: []}]);
            expect(result).toEqual([]);
        });

        test('maps an deliveringDepartments address to a ContactPoint', () => {
            const result = mapContactPoints([
                {
                    addresses: [{
                        website: 'website',
                        email: 'email',
                        phone: 'phone',
                        openingHours: 'openingHours',
                        street: 'street',
                        houseNumber: 'houseNumber',
                        boxNumber: 'boxNumber',
                        zipCode: 'zipCode',
                        municipality: 'municipality'
                    }]
                },
                {
                    addresses: [{}]
                }
            ], [
                {addresses: []}
            ]);
            expect(result).toMatchObject([{
                url: 'https://website',
                email: 'email',
                telephone: 'phone',
                openingHours: 'openingHours',
                address: {
                    street: 'street',
                    houseNumber: 'houseNumber',
                    boxNumber: 'boxNumber',
                    zipCode: 'zipCode',
                    municipality: 'municipality',
                    country: 'België',
                }
            }]);
        });

        test('maps an authorisedDepartments address to a ContactPoint', () => {
            const result = mapContactPoints([],
                [
                    {
                        addresses: [{
                            website: 'website',
                            email: 'email',
                            phone: 'phone',
                            openingHours: 'openingHours',
                            street: 'street',
                            houseNumber: 'houseNumber',
                            boxNumber: 'boxNumber',
                            zipCode: 'zipCode',
                            municipality: 'municipality'
                        }]
                    },
                    {
                        addresses: []
                    }

                ]);
            expect(result).toMatchObject([{
                url: 'https://website',
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

        test('a deliveringDepartment address takes precedence over authorised department address', () => {
            const result = mapContactPoints([
                    {
                        addresses: [{
                            website: 'website delivering',
                            email: 'email delivering',
                            phone: 'phone delivering',
                            openingHours: 'openingHours delivering',
                            street: 'street delivering',
                            houseNumber: 'houseNumber delivering',
                            boxNumber: 'boxNumber delivering',
                            zipCode: 'zipCode delivering',
                            municipality: 'municipality delivering'
                        }]
                    },
                    {
                        addresses: []
                    }
                ],
                [
                    {
                        addresses: [{
                            website: 'website authorised',
                            email: 'email authorised',
                            phone: 'phone authorised',
                            openingHours: 'openingHours authorised',
                            street: 'street authorised',
                            houseNumber: 'houseNumber authorised',
                            boxNumber: 'boxNumber authorised',
                            zipCode: 'zipCode authorised',
                            municipality: 'municipality authorised'
                        }]
                    },
                    {
                        addresses: []
                    }
                ]);
            expect(result).toMatchObject([{
                url: 'https://website delivering',
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

        test('authorised department address is taken if there are no addresses in delivering departments', () => {
            const result = mapContactPoints([
                    {
                        addresses: []
                    },
                    {
                        addresses: []
                    }
                ],
                [
                    {
                        addresses: [{
                            website: 'website authorised',
                            email: 'email authorised',
                            phone: 'phone authorised',
                            openingHours: 'openingHours authorised',
                            street: 'street authorised',
                            houseNumber: 'houseNumber authorised',
                            boxNumber: 'boxNumber authorised',
                            zipCode: 'zipCode authorised',
                            municipality: 'municipality authorised'
                        }]
                    },
                    {
                        addresses: []
                    }
                ]);
            expect(result).toMatchObject([{
                url: 'https://website authorised',
                email: 'email authorised',
                telephone: 'phone authorised',
                openingHours: 'openingHours authorised',
                address:
                    {
                        street: 'street authorised',
                        houseNumber: 'houseNumber authorised',
                        boxNumber: 'boxNumber authorised',
                        zipCode: 'zipCode authorised',
                        municipality: 'municipality authorised',
                        country: 'België',
                    },
            }]);
        })

        describe('partially filled in department address creates a ContactPoint', () => {

            test('website', () => {
                const result = mapDepartmentAddressToContactPoint({addresses: [{website: 'website'}]});
                expect(result).toMatchObject([{url: 'https://website'}]);
            });

            test('email', () => {
                const result = mapDepartmentAddressToContactPoint({addresses: [{email: 'email'}]});
                expect(result).toMatchObject([{email: 'email'}]);
            });

            test('phone', () => {
                const result = mapDepartmentAddressToContactPoint({addresses: [{phone: 'phone'}]});
                expect(result).toMatchObject([{telephone: 'phone'}]);
            });

            test('openingHours', () => {
                const result = mapDepartmentAddressToContactPoint({addresses: [{openingHours: 'openingHours'}]});
                expect(result).toMatchObject([{openingHours: 'openingHours'}]);
            });

            test('street', () => {
                const result = mapDepartmentAddressToContactPoint({addresses: [{street: 'street'}]});
                expect(result).toMatchObject([{address: {street: 'street'}}]);
            });

            test('houseNumber', () => {
                const result = mapDepartmentAddressToContactPoint({addresses: [{houseNumber: 'houseNumber'}]});
                expect(result).toMatchObject([{address: {houseNumber: 'houseNumber'}}]);
            });

            test('boxNumber', () => {
                const result = mapDepartmentAddressToContactPoint({addresses: [{boxNumber: 'boxNumber'}]});
                expect(result).toMatchObject([{address: {boxNumber: 'boxNumber'}}]);
            });

            test('boxNumber', () => {
                const result = mapDepartmentAddressToContactPoint({addresses: [{zipCode: 'zipCode'}]});
                expect(result).toMatchObject([{address: {zipCode: 'zipCode'}}]);
            });

            test('municipality', () => {
                const result = mapDepartmentAddressToContactPoint({addresses: [{municipality: 'municipality'}]});
                expect(result).toMatchObject([{address: {municipality: 'municipality'}}]);
            });

        });

        describe('openingHours has html tags removed', () => {

            test('nothing to remove', () => {
                const result = mapDepartmentAddressToContactPoint({addresses: [{openingHours: 'openingHours'}]});
                expect(result).toMatchObject([{openingHours: 'openingHours'}]);
            });

            test('paragraphs removed', () => {
                const result = mapDepartmentAddressToContactPoint({addresses: [{openingHours: '<p>openingHours</p> <p></p>'}]});
                expect(result).toMatchObject([{openingHours: 'openingHours   '}]);
            });

            test('multiple paragraphs and breaks removed', () => {
                const result = mapDepartmentAddressToContactPoint({addresses: [{openingHours: '<p>Enkel op afspraak!</p><p>Maandag: 9-12 uur en 13.30-19 uur<br />Dinsdag: 9-12 uur<br />Woensdag: 9-12 uur en 13.30-16.30 uur<br />Donderdag: 9-12 uur en 13.30-16.30 uur<br />Vrijdag: 9-12 uur</p>'}]});
                expect(result).toMatchObject([{openingHours: 'Enkel op afspraak! Maandag: 9-12 uur en 13.30-19 uur; Dinsdag: 9-12 uur; Woensdag: 9-12 uur en 13.30-16.30 uur; Donderdag: 9-12 uur en 13.30-16.30 uur; Vrijdag: 9-12 uur '}]);
            });

        });

    })

    describe('mapProductId', () => {

        test('IPDC source returns product id', () => {
            expect(mapProductId('productId', {value: 'IPDC'}))
                .toEqual('productId');
        });

        test('non IPDC source returns undefined product id', () => {
            expect(mapProductId('productId', {value: 'non-IPDC'}))
                .toBeUndefined();
        });
    });

});

describe('map abbProduct to Triples', () => {

    let ceviProducts: CeviProduct[] = [];

    beforeAll(async () => {
        ceviProducts = await readCeviXml('src/resources/LPDC_CEVI.xml');
    });

    test('map minimal required items from xml to ceviProduct and to abbProduct', async () => {
        const migrationDate = new Date();
        const abbProduct = await mapToABBProduct(ceviProducts[5], migrationDate, gemeente_URL, gemeente_nis2019_URL, sparqlClientUrL);

        const triplesArrayForAbbProduct = abbProduct.toTriples(Language.INFORMAL);
        const triplesAsStringForAbbProduct = triplesArrayForAbbProduct.map(aTriple => aTriple.toString());

        expect(triplesAsStringForAbbProduct).toMatchObject([
            `<${abbProduct.id}> <http://www.w3.org/ns/shacl#order> 1 .`,
            `<${abbProduct.id}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/vocab/cpsv#PublicService> .`,
            `<${abbProduct.id}> <http://mu.semte.ch/vocabularies/core/uuid> """${abbProduct.uuid}""" .`,
            `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#executingAuthorityLevel> <https://productencatalogus.data.vlaanderen.be/id/concept/UitvoerendBestuursniveau/Lokaal> .`,
            `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#hasExecutingAuthority> <${gemeente_URL}> .`,
            `<${abbProduct.id}> <http://purl.org/dc/terms/created> """${abbProduct.created.toISOString()}"""^^<http://www.w3.org/2001/XMLSchema#dateTime> .`,
            `<${abbProduct.id}> <http://purl.org/dc/terms/modified> """${abbProduct.modified.toISOString()}"""^^<http://www.w3.org/2001/XMLSchema#dateTime> .`,
            `<${abbProduct.id}> <http://purl.org/dc/terms/spatial> <${gemeente_nis2019_URL}> .`,
            `<${abbProduct.id}> <http://purl.org/pav/createdBy> <${gemeente_URL}> .`,
            `<${abbProduct.id}> <http://www.w3.org/ns/adms#status> <http://lblod.data.gift/concepts/79a52da4-f491-4e2f-9374-89a13cde8ecd> .`,
        ]);
    });


    test('map full item from xml to ceviProduct to abbProduct and to a list of triples', async () => {
        const migrationDate = new Date();
        const abbProduct = await mapToABBProduct(ceviProducts[0], migrationDate, gemeente_URL, gemeente_nis2019_URL, sparqlClientUrL);
        const triplesArrayForAbbProduct = abbProduct.toTriples(Language.INFORMAL);
        const triplesAsStringForAbbProduct = triplesArrayForAbbProduct.map(aTriple => aTriple.toString());

        expect(triplesAsStringForAbbProduct).toMatchObject([
                `<${abbProduct.id}> <http://www.w3.org/ns/shacl#order> 1 .`,
                `<${abbProduct.id}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/vocab/cpsv#PublicService> .`,
                `<${abbProduct.id}> <http://mu.semte.ch/vocabularies/core/uuid> """${abbProduct.uuid}""" .`,
                `<${abbProduct.id}> <http://purl.org/dc/terms/title> """Levenloos geboren kind/foetus"""@nl-be-x-informal .`,
                `<${abbProduct.id}> <http://purl.org/dc/terms/description> """<p>Sterft je kindje tijdens de zwangerschap? Dan voelen we in de eerste plaats heel erg met je mee.</p>
<p>De registratie van kindjes kan vrijblijvend vanaf 140 dagen zwangerschap met toekenning van een voornaam of voornamen. Vanaf 180 dagen zwangerschap is registratie verplicht. Vanaf dat moment kunnen ouders ook een familienaam toekennen als ze dit wensen.</p>"""@nl-be-x-informal .`,
                `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#additionalDescription> """<p>Er wordt een herfstsportkamp georganiseerd tijdens de herfstvakantie voor kinderen van het eerste tot en met het zesde leerjaar en dit telkens van&nbsp;9 tot 16 uur in sportcentrum De Sportstek.&nbsp;Voorzie sportieve kledij en een lunchpakket.</p>
<p>De folder met inschrijvingsformulier wordt&nbsp;tijdig ter beschikking gesteld via de Stekense scholen en de gemeentelijke website (<a href=\\"https://www.stekene.be/thema/6504/thwebwinkel\\">activiteitenloket</a>).</p>"""@nl-be-x-informal .`,
                `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#exception> """<p><b>Vellen van bomen wegens acuut gevaar</b></p>
<p>Vormt er een boom een acuut gevaar? Dan kan deze gekapt worden met een machtiging van de burgemeester.</p>
<p>Hiervoor vul je het formulier in bijlage in en bezorg je dit ingevuld aan de dienst Natuur en Milieu. Deze machtiging, eens goedgekeurd, geldt als kapmachtiging.</p>
<p>De te vellen boom (bomen) moeten wel volgens het Natuurdecreet gecompenseerd worden door nieuwe aanplantingen van streekeigen loofbomen op het eigen perceel.</p>
<p>&nbsp;</p>"""@nl-be-x-informal .`,
                `<${abbProduct.id}> <http://data.europa.eu/m8g/thematicArea> <https://productencatalogus.data.vlaanderen.be/id/concept/Thema/CultuurSportVrijeTijd> .`,
                `<${abbProduct.id}> <http://data.europa.eu/m8g/thematicArea> <https://productencatalogus.data.vlaanderen.be/id/concept/Thema/MobiliteitOpenbareWerken> .`,
                `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#targetAudience> <https://productencatalogus.data.vlaanderen.be/id/concept/Doelgroep/Burger> .`,
                `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#targetAudience> <https://productencatalogus.data.vlaanderen.be/id/concept/Doelgroep/Onderneming> .`,
                `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#competentAuthorityLevel> <https://productencatalogus.data.vlaanderen.be/id/concept/BevoegdBestuursniveau/Federaal> .`,
                `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#competentAuthorityLevel> <https://productencatalogus.data.vlaanderen.be/id/concept/BevoegdBestuursniveau/Lokaal> .`,
                `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#competentAuthorityLevel> <https://productencatalogus.data.vlaanderen.be/id/concept/BevoegdBestuursniveau/Vlaams> .`,
                `<${abbProduct.id}> <http://data.europa.eu/m8g/hasCompetentAuthority> <https://data.vlaanderen.be/id/organisatie/OVO027227> .`,
                `<${abbProduct.id}> <http://data.europa.eu/m8g/hasCompetentAuthority> <${gemeente_URL}> .`,
                `<${abbProduct.id}> <http://data.europa.eu/m8g/hasCompetentAuthority> <https://data.vlaanderen.be/id/organisatie/OVO000001> .`,
                `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#executingAuthorityLevel> <https://productencatalogus.data.vlaanderen.be/id/concept/UitvoerendBestuursniveau/Federaal> .`,
                `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#executingAuthorityLevel> <https://productencatalogus.data.vlaanderen.be/id/concept/UitvoerendBestuursniveau/Lokaal> .`,
                `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#executingAuthorityLevel> <https://productencatalogus.data.vlaanderen.be/id/concept/UitvoerendBestuursniveau/Vlaams> .`,
                `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#hasExecutingAuthority> <https://data.vlaanderen.be/id/organisatie/OVO027227> .`,
                `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#hasExecutingAuthority> <${gemeente_URL}> .`,
                `<${abbProduct.id}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#hasExecutingAuthority> <https://data.vlaanderen.be/id/organisatie/OVO000001> .`,
                `<${abbProduct.id}> <http://www.w3.org/ns/dcat#keyword> """luier"""@nl .`,
                `<${abbProduct.id}> <http://www.w3.org/ns/dcat#keyword> """luiers"""@nl .`,
                `<${abbProduct.id}> <http://www.w3.org/ns/dcat#keyword> """pamper"""@nl .`,
                `<${abbProduct.id}> <http://www.w3.org/ns/dcat#keyword> """herbruikbaar"""@nl .`,
                `<${abbProduct.id}> <http://purl.org/dc/terms/type> <https://productencatalogus.data.vlaanderen.be/id/concept/Type/AdviesBegeleiding> .`,
                `<${abbProduct.id}> <http://purl.org/dc/terms/created> """${abbProduct.created.toISOString()}"""^^<http://www.w3.org/2001/XMLSchema#dateTime> .`,
                `<${abbProduct.id}> <http://purl.org/dc/terms/modified> """${abbProduct.modified.toISOString()}"""^^<http://www.w3.org/2001/XMLSchema#dateTime> .`,
                `<${abbProduct.id}> <http://schema.org/startDate> """2023-09-10T00:00:00.000Z"""^^<http://www.w3.org/2001/XMLSchema#dateTime> .`,
                `<${abbProduct.id}> <http://schema.org/endDate> """2023-10-12T00:00:00.000Z"""^^<http://www.w3.org/2001/XMLSchema#dateTime> .`,
                `<${abbProduct.id}> <http://schema.org/productID> """1502""" .`,
                `<${abbProduct.id}> <http://purl.org/dc/terms/source> <https://ipdc.tni-vlaanderen.be/id/concept/705d401c-1a41-4802-a863-b22499f71b84> .`,
                `<http://data.lblod.info/id/requirement/${abbProduct.requirement?.uuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://data.europa.eu/m8g/Requirement> .`,
                `<http://data.lblod.info/id/requirement/${abbProduct.requirement?.uuid}> <http://mu.semte.ch/vocabularies/core/uuid> """${abbProduct.requirement?.uuid}""" .`,
                `<http://data.lblod.info/id/requirement/${abbProduct.requirement?.uuid}> <http://purl.org/dc/terms/description> """<ul>
<li>De persoon van wie de handtekening moet gewettigd worden, moet zijn woonplaats hebben in de gemeente</li>
<li>Het document mag niet bestemd zijn voor immorele, bedrieglijke of strafbare oogmerken</li>
<li>De formaliteit moet nuttig of nodig zijn. Het mag bijgevolg niet gaan om een louter private akte (een eigenhandig geschreven testament bijvoorbeeld)</li>
</ul>"""@nl-be-x-informal .`,
                `<http://data.lblod.info/id/requirement/${abbProduct.requirement?.uuid}> <http://www.w3.org/ns/shacl#order> 1 .`,
                `<${abbProduct.id}> <http://vocab.belgif.be/ns/publicservice#hasRequirement> <http://data.lblod.info/id/requirement/${abbProduct.requirement?.uuid}> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.requirement?.evidence?.uuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://data.europa.eu/m8g/Evidence> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.requirement?.evidence?.uuid}> <http://mu.semte.ch/vocabularies/core/uuid> """${abbProduct.requirement?.evidence?.uuid}""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.requirement?.evidence?.uuid}> <http://purl.org/dc/terms/description> """<p>Wat meebrengen indien je geen begrafenisonderneming zou hebben</p>
<ul>
<li>Overlijdensattest en medische attesten afgeleverd door de geneesheer die het overlijden vaststelde.</li>
<li>De identiteitskaart en eventueel het rijbewijs van de overledene.</li>
<li>Eventueel het huwelijksboekje van de overledene.</li>
<li>Van niet-inwoners die overleden zijn te Stekene: attest inzake de laatste wilsbeschikking, afgeleverd door het gemeentebestuur van de laatste woonplaats.</li>
<li>voor begravingen buiten het grondgebied van Stekene: &lsquo;toelating tot begraven&rsquo; afgeleverd door het gemeentebestuur op wiens grondgebied de begraafplaats gelegen is.</li>
</ul>"""@nl-be-x-informal .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.requirement?.evidence?.uuid}> <http://www.w3.org/ns/shacl#order> 1 .`,
                `<http://data.lblod.info/id/requirement/${abbProduct.requirement?.uuid}> <http://data.europa.eu/m8g/hasSupportingEvidence> <http://data.lblod.info/form-data/nodes/${abbProduct.requirement?.evidence?.uuid}> .`,
                `<http://data.lblod.info/id/rule/${abbProduct.procedure?.uuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://purl.org/vocab/cpsv#Rule> .`,
                `<http://data.lblod.info/id/rule/${abbProduct.procedure?.uuid}> <http://mu.semte.ch/vocabularies/core/uuid> """${abbProduct.procedure?.uuid}""" .`,
                `<http://data.lblod.info/id/rule/${abbProduct.procedure?.uuid}> <http://purl.org/dc/terms/description> """<p>Jij of de begrafenisondernemer doet aangifte bij de ambtenaar van de burgerlijke stand van de gemeente waar het overlijden plaatsvond. Hiervoor heb je een medisch attest met vermelding van de zwangerschapsduur nodig.</p>"""@nl-be-x-informal .`,
                `<http://data.lblod.info/id/rule/${abbProduct.procedure?.uuid}> <http://www.w3.org/ns/shacl#order> 1 .`,
                `<${abbProduct.id}> <http://purl.org/vocab/cpsv#follows> <http://data.lblod.info/id/rule/${abbProduct.procedure?.uuid}> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.procedure?.websites[0].uuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/WebSite> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.procedure?.websites[0].uuid}> <http://mu.semte.ch/vocabularies/core/uuid> """${abbProduct.procedure?.websites[0].uuid}""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.procedure?.websites[0].uuid}> <http://purl.org/dc/terms/description> """<strong>Geboortepremie - Aanvraagformulier</strong>"""@nl-be-x-informal .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.procedure?.websites[0].uuid}> <http://schema.org/url> """http://start.cevi.be/ELoket/Formulier.aspx?tnr_site=91&FormId=874684""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.procedure?.websites[0].uuid}> <http://www.w3.org/ns/shacl#order> 1 .`,
                `<http://data.lblod.info/id/rule/${abbProduct.procedure?.uuid}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#hasWebsite> <http://data.lblod.info/form-data/nodes/${abbProduct.procedure?.websites[0].uuid}> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.procedure?.websites[1].uuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/WebSite> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.procedure?.websites[1].uuid}> <http://mu.semte.ch/vocabularies/core/uuid> """${abbProduct.procedure?.websites[1].uuid}""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.procedure?.websites[1].uuid}> <http://purl.org/dc/terms/description> """<strong>Verbruik nutsvoorziening - Aanvraagformulier premie</strong>"""@nl-be-x-informal .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.procedure?.websites[1].uuid}> <http://schema.org/url> """http://start.cevi.be/ELoket/Formulier.aspx?tnr_site=91&FormId=688849""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.procedure?.websites[1].uuid}> <http://www.w3.org/ns/shacl#order> 2 .`,
                `<http://data.lblod.info/id/rule/${abbProduct.procedure?.uuid}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#hasWebsite> <http://data.lblod.info/form-data/nodes/${abbProduct.procedure?.websites[1].uuid}> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.moreInfo[0].uuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/WebSite> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.moreInfo[0].uuid}> <http://mu.semte.ch/vocabularies/core/uuid> """${abbProduct.moreInfo[0].uuid}""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.moreInfo[0].uuid}> <http://purl.org/dc/terms/title> """Inburgering.be"""@nl-be-x-informal .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.moreInfo[0].uuid}> <http://schema.org/url> """http://www.inburgering.be""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.moreInfo[0].uuid}> <http://www.w3.org/ns/shacl#order> 1 .`,
                `<${abbProduct.id}> <http://www.w3.org/2000/01/rdf-schema#seeAlso> <http://data.lblod.info/form-data/nodes/${abbProduct.moreInfo[0].uuid}> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.moreInfo[1].uuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/WebSite> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.moreInfo[1].uuid}> <http://mu.semte.ch/vocabularies/core/uuid> """${abbProduct.moreInfo[1].uuid}""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.moreInfo[1].uuid}> <http://purl.org/dc/terms/title> """Contactgegevens voor een inburgeringstraject"""@nl-be-x-informal .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.moreInfo[1].uuid}> <http://schema.org/url> """https://integratie-inburgering.be/contact""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.moreInfo[1].uuid}> <http://www.w3.org/ns/shacl#order> 2 .`,
                `<${abbProduct.id}> <http://www.w3.org/2000/01/rdf-schema#seeAlso> <http://data.lblod.info/form-data/nodes/${abbProduct.moreInfo[1].uuid}> .`,
                `<http://data.lblod.info/id/cost/${abbProduct.cost?.uuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://data.europa.eu/m8g/Cost> .`,
                `<http://data.lblod.info/id/cost/${abbProduct.cost?.uuid}> <http://mu.semte.ch/vocabularies/core/uuid> """${abbProduct.cost?.uuid}""" .`,
                `<http://data.lblod.info/id/cost/${abbProduct.cost?.uuid}> <http://purl.org/dc/terms/description> """<p>Zowel een voorlopig rijbewijs (18 maanden), een voorlopig rijbewijs (36 maanden) als een voorlopig rijbewijs model 3 kost 24 euro.</p>
<p>&nbsp;</p>"""@nl-be-x-informal .`,
                `<http://data.lblod.info/id/cost/${abbProduct.cost?.uuid}> <http://www.w3.org/ns/shacl#order> 1 .`,
                `<${abbProduct.id}> <http://data.europa.eu/m8g/hasCost> <http://data.lblod.info/id/cost/${abbProduct.cost?.uuid}> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].uuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/ContactPoint> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].uuid}> <http://mu.semte.ch/vocabularies/core/uuid> """${abbProduct.contactPoints[0].uuid}""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].uuid}> <http://schema.org/url> """https://www.stekene.be""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].uuid}> <http://schema.org/email> """Bevolking&BS@stekene.be""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].uuid}> <http://schema.org/telephone> """03 790 02 12""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].uuid}> <http://schema.org/openingHours> """Maandag 08:30-12:00; 
Dinsdag 08:30-12:00; 
Woensdag 08:30-12;00; 13:30-16:30; 
Donderdag 08:30-12:00; 
Vrijdag 08:30-12:00; 
Zaterdag 09:00-12:00 
""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].uuid}> <http://www.w3.org/ns/shacl#order> 1 .`,
                `<${abbProduct.id}> <http://data.europa.eu/m8g/hasContactPoint> <http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].uuid}> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].address?.uuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/locn#Address> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].address?.uuid}> <http://mu.semte.ch/vocabularies/core/uuid> """${abbProduct.contactPoints[0].address?.uuid}""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].address?.uuid}> <https://data.vlaanderen.be/ns/adres#Straatnaam> """Stadionstraat"""@nl .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].address?.uuid}> <https://data.vlaanderen.be/ns/adres#Adresvoorstelling.huisnummer> """2""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].address?.uuid}> <https://data.vlaanderen.be/ns/adres#Adresvoorstelling.busnummer> """B""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].address?.uuid}> <https://data.vlaanderen.be/ns/adres#postcode> """9190""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].address?.uuid}> <https://data.vlaanderen.be/ns/adres#gemeentenaam> """Stekene"""@nl .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].address?.uuid}> <https://data.vlaanderen.be/ns/adres#land> """België"""@nl .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].address?.uuid}> <http://www.w3.org/ns/shacl#order> 1 .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].uuid}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#address> <http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[0].address?.uuid}> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].uuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://schema.org/ContactPoint> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].uuid}> <http://mu.semte.ch/vocabularies/core/uuid> """${abbProduct.contactPoints[1].uuid}""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].uuid}> <http://schema.org/url> """https://www.stekene.be""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].uuid}> <http://schema.org/telephone> """03 790 02 12""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].uuid}> <http://www.w3.org/ns/shacl#order> 2 .`,
                `<${abbProduct.id}> <http://data.europa.eu/m8g/hasContactPoint> <http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].uuid}> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].address?.uuid}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <http://www.w3.org/ns/locn#Address> .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].address?.uuid}> <http://mu.semte.ch/vocabularies/core/uuid> """${abbProduct.contactPoints[1].address?.uuid}""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].address?.uuid}> <https://data.vlaanderen.be/ns/adres#Straatnaam> """Kerkstraat"""@nl .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].address?.uuid}> <https://data.vlaanderen.be/ns/adres#Adresvoorstelling.huisnummer> """35""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].address?.uuid}> <https://data.vlaanderen.be/ns/adres#Adresvoorstelling.busnummer> """C""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].address?.uuid}> <https://data.vlaanderen.be/ns/adres#postcode> """9190""" .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].address?.uuid}> <https://data.vlaanderen.be/ns/adres#gemeentenaam> """Stekene"""@nl .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].address?.uuid}> <https://data.vlaanderen.be/ns/adres#land> """België"""@nl .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].address?.uuid}> <http://www.w3.org/ns/shacl#order> 1 .`,
                `<http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].uuid}> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#address> <http://data.lblod.info/form-data/nodes/${abbProduct.contactPoints[1].address?.uuid}> .`,
                `<${abbProduct.id}> <http://purl.org/dc/terms/spatial> <${gemeente_nis2019_URL}> .`,
                `<${abbProduct.id}> <http://purl.org/pav/createdBy> <${gemeente_URL}> .`,
                `<${abbProduct.id}> <http://www.w3.org/ns/adms#status> <http://lblod.data.gift/concepts/79a52da4-f491-4e2f-9374-89a13cde8ecd> .`,
            ]
        )
    });

});
