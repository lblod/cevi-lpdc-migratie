import {CeviProduct} from "./ceviProduct";
import {readCeviXml} from "./readCeviXml";
import {mapToABBProduct} from "./mapToABBProduct";
import fs from 'fs/promises';
async function main() {

    const timestamp = new Date();
    const ceviProducts: CeviProduct[] = await readCeviXml('src/resources/LPDC_Stekene.xml');
    const abbProducts = ceviProducts.map((ceviProduct: CeviProduct) => mapToABBProduct(ceviProduct, timestamp, 'http://data.lblod.info/id/bestuurseenheden/6025a5d1ca2262a784f002edd8ce9ca9073ae3d5ebc6b6b5531f05a29e9250af'));
    const abbProductsAsTriplesArray = abbProducts.map(abbProduct => abbProduct.toTriples()).flat();
    const abbProductsAsStringArray = abbProductsAsTriplesArray.map(abbProductTriple => abbProductTriple.toString());
    fs.writeFile('abbProductsAsArrayOfStrings.ttl', abbProductsAsStringArray);

    // console.log(ceviProducts[1]);
    // console.log(ceviProducts[1].deliveringDepartments[0].address);
    console.log(abbProductsAsTriplesArray[1]);
    console.log(abbProductsAsStringArray[1]);
}

main();
