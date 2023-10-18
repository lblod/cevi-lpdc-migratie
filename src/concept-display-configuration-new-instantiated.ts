
export function queryToUpdateConceptDisplayConfigurations(bestuurseenheidGraph: string) {
    return `
WITH <${bestuurseenheidGraph}>
DELETE { 
    ?conceptDisplayConfigurationId <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#conceptInstantiated> ?conceptInstantiated .
    ?conceptDisplayConfigurationId <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#conceptIsNew> ?conceptIsNew . 
}
INSERT {
    ?conceptDisplayConfigurationId <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#conceptInstantiated> "true"^^<http://mu.semte.ch/vocabularies/typed-literals/boolean> .
    ?conceptDisplayConfigurationId <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#conceptIsNew> "false"^^<http://mu.semte.ch/vocabularies/typed-literals/boolean> .
}
WHERE {
    ?conceptDisplayConfigurationId a <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#ConceptDisplayConfiguration> .
    ?conceptDisplayConfigurationId <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#conceptInstantiated> ?conceptInstantiated .
    ?conceptDisplayConfigurationId <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#conceptIsNew> ?conceptIsNew .
    ?conceptId <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#hasConceptDisplayConfiguration> ?conceptDisplayConfigurationId .
    ?instanceId <http://purl.org/dc/terms/source> ?conceptId .
    FILTER(?conceptInstantiated = "false"^^<http://mu.semte.ch/vocabularies/typed-literals/boolean>
           || ?conceptIsNew = "true"^^<http://mu.semte.ch/vocabularies/typed-literals/boolean>)
}
`

}