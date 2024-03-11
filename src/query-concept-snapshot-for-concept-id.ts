//@ts-ignore
import SparqlClient from "sparql-client-2";
import {Logger} from "./logger";

async function executeQuery(sparqlClientUrL: string, query: any) {
    const sparqlClient = new SparqlClient(sparqlClientUrL);
    const response = await sparqlClient.query(query).executeRaw();
    return JSON.parse(response.body)?.results?.bindings;
}

export async function findLastConceptSnapshotForConceptId(conceptUrl: string, sparqlClientUrl: string): Promise<string | undefined> {
    if (!conceptUrl) {
        throw Error("Provide a conceptUrl...");
    }
    const response = await executeQuery(sparqlClientUrl, `
        SELECT ?conceptSnapshotId
            WHERE {
                GRAPH <http://mu.semte.ch/graphs/public> {
                    <${conceptUrl}> <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> <https://productencatalogus.data.vlaanderen.be/ns/ipdc-lpdc#ConceptualPublicService> .
                    <${conceptUrl}> <http://mu.semte.ch/vocabularies/ext/hasVersionedSource> ?conceptSnapshotId . 
                }
            } 
        `);

    const conceptSnapshotUrl = response.map((item: any) => item.conceptSnapshotId.value);
    if (!conceptSnapshotUrl) {
        Logger.log(`No conceptSnapshotId found for conceptId '${conceptUrl}`)
        return undefined;
    }
    return conceptSnapshotUrl;
}