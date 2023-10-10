import {CeviProduct} from "./ceviProduct";
import {readCeviXml} from "./readCeviXml";
import {mapToABBProduct} from "./mapToABBProduct";
async function main() {

    const timestamp = new Date();
    const ceviProducts: CeviProduct[] = await readCeviXml('src/resources/LPDC_CEVI.xml');
    const abbProducts = ceviProducts.map((ceviProduct: CeviProduct) => mapToABBProduct(ceviProduct, timestamp, 'http://CEVI'));
    // abbProduct.toTriples();

    console.log(ceviProducts[1]);
    console.log(ceviProducts[1].deliveringDepartments[0].address);
}

main();
