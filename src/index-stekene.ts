import {CeviProduct} from "./ceviProduct";
import {readCeviXml} from "./readCeviXml";
import {mapToABBProduct} from "./mapToABBProduct";
import fs from 'fs/promises';

async function main() {

    const timestamp = new Date();
    const ceviProducts: CeviProduct[] = await readCeviXml('src/resources/LPDC_Stekene.xml');
    const abbProducts = ceviProducts.map((ceviProduct: CeviProduct) => mapToABBProduct(ceviProduct, timestamp, 'http://data.lblod.info/id/bestuurseenheden/6025a5d1ca2262a784f002edd8ce9ca9073ae3d5ebc6b6b5531f05a29e9250af', 'http://vocab.belgif.be/auth/refnis2019/46024'));

    const triples = abbProducts.flatMap(abbProduct => abbProduct.toTriples()).map(trip => trip.toString()).join('\n');
    await fs.writeFile('/Users/bartgauquie/projects/abb/app-lpdc-digitaal-loket/config/migrations/2023/20231012135434-stekene.ttl', triples);


}

main();
