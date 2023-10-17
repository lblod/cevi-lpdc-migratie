import fs from "fs";
import {CeviProduct} from "./ceviProduct";
import {readCeviXml} from "./readCeviXml";
import {AbbProduct} from "./abbProduct";
import {mapToABBProduct} from "./mapToABBProduct";
import {Language} from "./language";
import fsp from "fs/promises";

export async function runProcess(xmlFileName: string, bestuurseenheidUuid: string, lokaalBestuurNis2019Url: string, language: Language) {

    if(!fs.existsSync(xmlFileName)) {
        console.error(`"${xmlFileName}" not found ... stopping`);
        return 1;
    }

    // @ts-ignore
    const baseName = xmlFileName.match(/([^/]+)\.xml$/)[1];
    const timestamp = new Date();
    const logStream = fs.createWriteStream(`src/migration-results/${baseName}-${timestamp.toISOString()}-migration.log`);

    console.log = function(message?: any, exception?: Error) {
        let logMessage = message;
        if (exception) {
            logMessage += ' Exception: ' + exception.stack;
        }
        logStream.write(`${logMessage}\n`);
    };

    console.error = function(message?: any, exception?: Error) {
        let errorMessage = message;
        if (exception) {
            errorMessage += ' Exception: ' + exception.stack;
        }
        logStream.write(`    ${errorMessage}\n`);
    };

    const ceviProducts: CeviProduct[] = await readCeviXml(xmlFileName);
    fs.copyFileSync(xmlFileName, `src/migration-results/${baseName}-${timestamp.toISOString()}.xml`)
    const abbProducts = ceviProducts.map((ceviProduct: CeviProduct): AbbProduct | undefined => {
        try {
            console.log(`\n--- Mapping cevi Product ${ceviProduct.id || '(none specified)'} ---`);
            return mapToABBProduct(ceviProduct, timestamp, `http://data.lblod.info/id/bestuurseenheden/${bestuurseenheidUuid}`, lokaalBestuurNis2019Url);
        }
        catch (error) {
            console.error(`Cevi product ${ceviProduct.id} with name ${ceviProduct.name} could not be mapped to an ABB Product.`, error);
            return undefined;
        }
    });

    const triples = abbProducts.flatMap(abbProduct => abbProduct?.toTriples(language)).map(trip => trip?.toString()).join('\n');
    await fsp.writeFile(`src/migration-results/${baseName}-${timestamp.toISOString()}-migration.ttl`, triples);
    await fsp.writeFile(`src/migration-results/${baseName}-${timestamp.toISOString()}-migration.graph`, `http://mu.semte.ch/graphs/organizations/${bestuurseenheidUuid}/LoketLB-LPDCGebruiker`);

}