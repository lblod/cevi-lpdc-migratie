import {LegalResource} from "./legal-resource";
//@ts-ignore
import SparqlClient from "sparql-client-2";
import {v4 as uuid} from 'uuid';

async function executeQuery(sparqlClientUrL: string, query: any) {
    const sparqlClient = new SparqlClient(sparqlClientUrL);
    const response = await sparqlClient.query(query).executeRaw();
    return JSON.parse(response.body)?.results?.bindings;
}

export async function findAllLegalResourcesForConcept(conceptUri: string, sparqlClientUrl: string): Promise<LegalResource[]> {
    const query = `
        SELECT DISTINCT ?legalResource ?url ?order
        WHERE {
          GRAPH <http://mu.semte.ch/graphs/public> {
             <${conceptUri}> <http://data.europa.eu/m8g/hasLegalResource> ?legalResource.
             ?legalResource a <http://data.europa.eu/eli/ontology#LegalResource>.
             ?legalResource <http://schema.org/url> ?url.
             ?legalResource <http://www.w3.org/ns/shacl#order> ?order.
           }
        }  
        `;

    const response = await executeQuery(sparqlClientUrl, query);

    return response.map((item: any) => {
        return new LegalResource(
            uuid(),
            item.url.value,
            item.order.value);
    });

}
