import {CeviProduct} from "./ceviProduct";
import {readCeviXml} from "./readCeviXml";
import {mapToABBProduct} from "./mapToABBProduct";
import fs from 'fs/promises';
import {AbbProduct} from "./abbProduct";
import {Language} from "./language";

async function main() {

    const timestamp = new Date();
    const ceviProducts: CeviProduct[] = await readCeviXml('src/resources/LPDC_CEVI.xml');
    const abbProducts = ceviProducts.map((ceviProduct: CeviProduct): AbbProduct | undefined => {
        try {
            console.log(`\n--- Mapping cevi Product ${ceviProduct.id} ---`);
            return mapToABBProduct(ceviProduct, timestamp, 'http://data.lblod.info/id/bestuurseenheden/6025a5d1ca2262a784f002edd8ce9ca9073ae3d5ebc6b6b5531f05a29e9250af', 'http://vocab.belgif.be/auth/refnis2019/46024');
        }
        catch (error) {
            console.error(`Cevi product ${ceviProduct.id} with name ${ceviProduct.name} could not be mapped to an ABB Product at ${timestamp}`);
            return undefined;
        }
    });

    const triples = abbProducts[0]?.toTriples(Language.INFORMAL).map(trip => trip.toString()).join('\n');
    // triples ? await fs.writeFile('/Users/bartgauquie/projects/abb/app-lpdc-digitaal-loket/config/migrations/2023/20231012135434-stekene.ttl', triples) : console.error(`No triples to write to .ttl file`);
    triples ? await fs.writeFile('20231016-migration-cevi.ttl', triples) : console.error(`No triples to write to .ttl file`);

}

main();
