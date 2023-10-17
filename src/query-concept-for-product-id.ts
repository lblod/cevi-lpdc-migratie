//@ts-ignore
import SparqlClient from "sparql-client-2";

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
                    FILTER(?o = "${productId}")
                }
            } 
        `);

    const conceptUrls =
        response.map((item: any) => item.conceptId.value);

    if(conceptUrls.length > 1) {
        throw Error(`Multiple conceptUrls [${conceptUrls}] found for '${productId}'.`);
    }
    if(conceptUrls.length === 1) {
        console.error(`Found unique conceptId '${conceptUrls[0]}' for productId '${productId}'`)
        return conceptUrls[0];
    }
    console.error(`No conceptId found for productId '${productId}'`);
    return undefined;
}