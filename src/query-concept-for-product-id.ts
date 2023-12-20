//@ts-ignore
import SparqlClient from "sparql-client-2";
import {Logger} from "./logger";

async function executeQuery(sparqlClientUrL: string, query: any) {
    const sparqlClient = new SparqlClient(sparqlClientUrL);
    const response = await sparqlClient.query(query).executeRaw();
    return JSON.parse(response.body)?.results?.bindings;
}

export async function findUniqueConceptIdForProductId(productId: string, sparqlClientUrl: string): Promise<string | undefined> {
    if (!productId) {
        throw Error("Provide a productId...");
    }
    const response = await executeQuery(sparqlClientUrl, `
        SELECT ?conceptId
            WHERE {
                GRAPH <http://mu.semte.ch/graphs/public> {
                    ?conceptId <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#ConceptualPublicService> .
                    ?conceptId <http://schema.org/productID> ?o . 
                    FILTER(?o = "${productId}" || ?o = "${productId}"^^<http://www.w3.org/2001/XMLSchema#string>)
                }
            } 
        `);

    const conceptUrls =
        response.map((item: any) => item.conceptId.value);

    if(conceptUrls.length > 1) {
        Logger.log(`Multiple conceptUrls [${conceptUrls}] found for '${productId}'.`);
        return undefined;
    }
    if(conceptUrls.length === 1) {
        return conceptUrls[0];
    }
    Logger.log(`No conceptId found for productId '${productId}'`);
    return undefined;
}