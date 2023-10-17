import fs from "fs";
import {CeviProduct} from "./ceviProduct";
import {readCeviXml} from "./readCeviXml";
import {AbbProduct} from "./abbProduct";
import {mapToABBProduct} from "./mapToABBProduct";
import {Language} from "./language";
import fsp from "fs/promises";

export async function runProcess(xmlFileName: string, bestuurseenheidUuid: string, lokaalBestuurNis2019Url: string) {

    if(!fs.existsSync(xmlFileName)) {
        console.error(`"${xmlFileName}" not found ... stopping`);
        return 1;
    }

    // @ts-ignore
    const baseName = xmlFileName.match(/([^/]+)\.xml$/)[1];
    const timestamp = new Date();
    const logStream = fs.createWriteStream(`src/migration-results/${baseName}-${timestamp.toISOString()}-migration.log`);

    console.log = function(message?: any, ...optionalParams: any[]) {
        logStream.write(`${message}\n`);
    };

    console.error = function(message?: any, ...optionalParams: any[]) {
        logStream.write(`    ${message}\n`);
    };

    const ceviProducts: CeviProduct[] = await readCeviXml(xmlFileName);
    fs.copyFileSync(xmlFileName, `src/migration-results/${baseName}-${timestamp.toISOString()}.xml`)
    const abbProducts = ceviProducts.map((ceviProduct: CeviProduct): AbbProduct | undefined => {
        try {
            console.log(`\n--- Mapping cevi Product ${ceviProduct.id} ---`);
            return mapToABBProduct(ceviProduct, timestamp, `http://data.lblod.info/id/bestuurseenheden/${bestuurseenheidUuid}`, lokaalBestuurNis2019Url);
        }
        catch (error) {
            console.error(`Cevi product ${ceviProduct.id} with name ${ceviProduct.name} could not be mapped to an ABB Product at ${timestamp}`, error);
            return undefined;
        }
    });

    const triples = abbProducts[0]?.toTriples(Language.INFORMAL).map(trip => trip.toString()).join('\n');
    triples ? await fsp.writeFile(`src/migration-results/${baseName}-${timestamp.toISOString()}-migration.ttl`, triples) : console.error(`No triples to write to .ttl file`);
    await fsp.writeFile(`src/migration-results/${baseName}-${timestamp.toISOString()}-migration.graph`, `http://mu.semte.ch/graphs/organizations/${bestuurseenheidUuid}/LoketLB-LPDCGebruiker`);

}