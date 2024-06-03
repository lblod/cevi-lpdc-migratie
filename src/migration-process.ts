import fs from "fs";
import {CeviProduct} from "./ceviProduct";
import {readCeviXml} from "./readCeviXml";
import {mapToABBProduct} from "./mapToABBProduct";
import {Language} from "./language";
import fsp from "fs/promises";
import {Logger} from "./logger";
import {queryToUpdateConceptDisplayConfigurations} from "./concept-display-configuration-new-instantiated";
import {Uri} from "./triple";

export async function runProcess(xmlFileName: string, bestuurseenheidUuid: string, lokaalBestuurNis2019Url: string, language: Language, sparqlClientUrl: string) {

    const bestuurseenheidGraph = `http://mu.semte.ch/graphs/organizations/${bestuurseenheidUuid}/LoketLB-LPDCGebruiker`;

    if (!fs.existsSync(xmlFileName)) {
        console.error(`"${xmlFileName}" not found ... stopping`);
        return 1;
    }

    // @ts-ignore
    const baseName = xmlFileName.match(/([^/]+)\.xml$/)[1];
    const migrationDate = new Date();
    const logs: string[] = [];

    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;

    console.log = function (message?: any, exception?: Error) {
        let logMessage = message;
        if (exception) {
            logMessage += ' Exception: ' + exception.stack;
        }
        logs.push(logMessage);
        originalConsoleLog(logMessage);
    };

    console.error = function (message?: any, exception?: Error) {
        let errorMessage = message;
        if (exception) {
            errorMessage += ' Exception: ' + exception.stack;
        }
        logs.push(errorMessage);
        originalConsoleError(errorMessage);
    };

    const ceviProducts: CeviProduct[] = await readCeviXml(xmlFileName);
    fs.copyFileSync(xmlFileName, `src/migration-results/${baseName}-${migrationDate.toISOString()}.xml`)

    let abbProducts = [];
    for (let index = 0; index < ceviProducts.length; index++) {
        const ceviProduct = ceviProducts[index];
        try {
            Logger.setCeviId(ceviProduct.id);
            abbProducts.push(await mapToABBProduct(ceviProduct, migrationDate, `http://data.lblod.info/id/bestuurseenheden/${bestuurseenheidUuid}`, lokaalBestuurNis2019Url, sparqlClientUrl, language));
            Logger.logImported(ceviProduct.title);
        } catch (error: any) {
            Logger.logNotImported(ceviProduct.title, error.message, error);
        }
    }

    const triples = abbProducts
        .flatMap(abbProduct => abbProduct?.toTriples(language))
        .map(triple => triple?.toQuadString(Uri.create(bestuurseenheidGraph)))
        .join('\n');
    await fsp.writeFile(`src/migration-results/${baseName}-${migrationDate.toISOString()}-migration.ttl`, triples);
    await fsp.writeFile(`src/migration-results/${baseName}-${migrationDate.toISOString()}-migration.log`, `${logs.join('\n')}`);
    await fsp.writeFile(`src/migration-results/${baseName}-${migrationDate.toISOString()}-update-concept-display-configuration.sparql`, queryToUpdateConceptDisplayConfigurations(bestuurseenheidGraph));
    await fsp.writeFile(`src/migration-results/${baseName}-${migrationDate.toISOString()}-mapping-failed-fields-log.csv`, Logger.mappedFieldsToCsv());
    await fsp.writeFile(`src/migration-results/${baseName}-${migrationDate.toISOString()}-imported-cevi-instances.csv`, Logger.importedToCsv());

}
