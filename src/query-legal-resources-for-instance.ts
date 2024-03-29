import {LegalResource} from "./legal-resource";
//@ts-ignore
import SparqlClient from "sparql-client-2";
import {v4 as uuid} from 'uuid';

async function executeQuery(sparqlClientUrL: string, query: any) {
    const sparqlClient = new SparqlClient(sparqlClientUrL);
    const response = await sparqlClient.query(query).executeRaw();
    return JSON.parse(response.body)?.results?.bindings;
}

export async function findAllLegalResourcesForInstance(instanceUri: string, instanceGraph: string, sparqlClientUrl: string): Promise<LegalResource[]> {
    const response = await executeQuery(sparqlClientUrl, `
        SELECT DISTINCT ?instance ?concept ?legalResource ?url ?order ?title ?description
        WHERE {
          GRAPH <${instanceGraph}> {
                ?instance a <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#InstancePublicService>.
                ?instance <http://purl.org/dc/terms/source> ?concept.
                FILTER(?instance = <${instanceUri}> )
            }  
          GRAPH <http://mu.semte.ch/graphs/public> {
             ?concept <http://data.europa.eu/m8g/hasLegalResource> ?legalResource.
             ?legalResource a <http://data.europa.eu/eli/ontology#LegalResource>.
             ?legalResource <http://schema.org/url> ?url.
             ?legalResource <http://www.w3.org/ns/shacl#order> ?order.
             ?legalResource <http://purl.org/dc/terms/title> ?title.
             ?legalResource <http://purl.org/dc/terms/description> ?description.
           }
        }  
        `);

    return response.map((item: any) => {
        return new LegalResource(
            uuid(),
            item.title.value,
            item.description.value,
            item.url.value,
            item.order.value);
    });

}
