import {CeviProduct} from "./ceviProduct";
import {readCeviXml} from "./readCeviXml";
import {mapToABBProduct} from "./mapToABBProduct";
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import {AbbProduct} from "./abbProduct";
import {Language} from "./language";

async function main() {

    const timestamp = new Date();

    const logStream = fs.createWriteStream(`src/migration-results/LPDC_CEVI-${timestamp.toISOString()}-migration.log`);

    console.log = function(message?: any, ...optionalParams: any[]) {
        logStream.write(`${message}\n`);
    };

    console.error = function(message?: any, ...optionalParams: any[]) {
        logStream.write(`    ${message}\n`);
    };

    const ceviProducts: CeviProduct[] = await readCeviXml('src/resources/LPDC_CEVI.xml');
    fs.copyFileSync('src/resources/LPDC_CEVI.xml', `src/migration-results/LPDC_CEVI-${timestamp.toISOString()}.xml`)
    const abbProducts = ceviProducts.map((ceviProduct: CeviProduct): AbbProduct | undefined => {
        try {
            console.log(`\n--- Mapping cevi Product ${ceviProduct.id} ---`);
            return mapToABBProduct(ceviProduct, timestamp, 'http://data.lblod.info/id/bestuurseenheden/6025a5d1ca2262a784f002edd8ce9ca9073ae3d5ebc6b6b5531f05a29e9250af', 'http://vocab.belgif.be/auth/refnis2019/46024');
        }
        catch (error) {
            console.error(`Cevi product ${ceviProduct.id} with name ${ceviProduct.name} could not be mapped to an ABB Product at ${timestamp}`, error);
            return undefined;
        }
    });

    const triples = abbProducts[0]?.toTriples(Language.INFORMAL).map(trip => trip.toString()).join('\n');
    triples ? await fsp.writeFile(`src/migration-results/LPDC_CEVI-${timestamp.toISOString()}-migration.ttl`, triples) : console.error(`No triples to write to .ttl file`);
    await fsp.writeFile(`src/migration-results/LPDC_CEVI-${timestamp.toISOString()}-migration.graph`, `http://mu.semte.ch/graphs/organizations/6025a5d1ca2262a784f002edd8ce9ca9073ae3d5ebc6b6b5531f05a29e9250af/LoketLB-LPDCGebruiker`);

}

main();
