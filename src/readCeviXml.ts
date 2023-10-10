import fs from "fs/promises";
import convert from "xml-js";
import {CeviProduct} from "./ceviProduct";
import {mapXmlToCeviProduct} from "./mapXmlToCeviProduct";

export async function readCeviXml(pathToFile: string): Promise<CeviProduct[]> {
    const xml = await fs.readFile(pathToFile, { encoding: "utf-8"});
    const options = {compact: true};
    const result = convert.xml2json(xml, options); // TODO: check of xml2js gives same result
    const parsedResult = JSON.parse(result);

    const products = parsedResult.string.ProductCatalog.Products.Product;

    return products.map((product: any) => mapXmlToCeviProduct(product));
}