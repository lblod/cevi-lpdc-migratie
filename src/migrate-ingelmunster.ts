import {runProcess} from "./migration-process";
import {Language} from "./language";

async function main() {

    const xmlFileName =  'src/resources/LPDC_Ingelmunster.xml';
    const bestuurseenheidUuid = '2f980d9d54c35e0a61137da4eacfe4bef20246e18983449ce15dcd3d2a83f509';
    const lokaalBestuurNuts2019Url = 'http://data.europa.eu/nuts/code/BE25636007';
    const language = Language.INFORMAL;
    const sparqlClientUrl = `http://localhost:8896/sparql`;

    await runProcess(xmlFileName, bestuurseenheidUuid, lokaalBestuurNuts2019Url, language, sparqlClientUrl);
}

main();
