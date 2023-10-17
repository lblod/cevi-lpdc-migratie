import fs from "fs";
import {CeviProduct} from "./ceviProduct";
import {readCeviXml} from "./readCeviXml";
import {AbbProduct} from "./abbProduct";
import {mapToABBProduct} from "./mapToABBProduct";
import {Language} from "./language";
import fsp from "fs/promises";

export async function runProcess(xmlFileName: string, bestuurseenheidUuid: string, lokaalBestuurNis2019Url: string, language: Language, sparqlClientUrl: string) {

    if (!fs.existsSync(xmlFileName)) {
        console.error(`"${xmlFileName}" not found ... stopping`);
        return 1;
    }

    // @ts-ignore
    const baseName = xmlFileName.match(/([^/]+)\.xml$/)[1];
    const timestamp = new Date();
    const logs:string[] = [];

    console.log = function (message?: any, exception?: Error) {
        let logMessage = message;
        if (exception) {
            logMessage += ' Exception: ' + exception.stack;
        }
        logs.push(logMessage);
    };

    console.error = function (message?: any, exception?: Error) {
        let errorMessage = message;
        if (exception) {
            errorMessage += ' Exception: ' + exception.stack;
        }
        logs.push(errorMessage);
    };

    const ceviProducts: CeviProduct[] = await readCeviXml(xmlFileName);
    fs.copyFileSync(xmlFileName, `src/migration-results/${baseName}-${timestamp.toISOString()}.xml`)

    let abbProducts = [];
    for(let index = 0; index < ceviProducts.length; index ++) {
        const ceviProduct = ceviProducts[index];
        try {
            console.log(`\n--- Mapping cevi Product '${ceviProduct.id || '(none specified)'}' ---`);
            abbProducts.push(await mapToABBProduct(ceviProduct, timestamp, `http://data.lblod.info/id/bestuurseenheden/${bestuurseenheidUuid}`, lokaalBestuurNis2019Url, sparqlClientUrl));
        } catch (error) {
            console.error(`Cevi product ${ceviProduct.id} with name ${ceviProduct.name} could not be mapped to an ABB Product.`, error);
        }
    }

    const triples = abbProducts.flatMap(abbProduct => abbProduct?.toTriples(language)).map(trip => trip?.toString()).join('\n');
    await fsp.writeFile(`src/migration-results/${baseName}-${timestamp.toISOString()}-migration.ttl`, triples);
    await fsp.writeFile(`src/migration-results/${baseName}-${timestamp.toISOString()}-migration.graph`, `http://mu.semte.ch/graphs/organizations/${bestuurseenheidUuid}/LoketLB-LPDCGebruiker`);
    await fsp.writeFile(`src/migration-results/${baseName}-${timestamp.toISOString()}-migration.log`, `${logs.join('\n')}`);

}
