import {runProcess} from "./migration-process";
import {Language} from "./language";

async function main() {

    const xmlFileName =  'src/resources/LPDC_Ledegem.xml';
    const bestuurseenheidUuid = '955a75560dd7c57fb9b882b0e92826ab06d77f1a4fc2722b4421389d47a247f3';
    const lokaalBestuurNis2019Url = 'http://vocab.belgif.be/auth/refnis2019/36010';
    const language = Language.INFORMAL;
    const sparqlClientUrl = `http://localhost:8896/sparql`;

    await runProcess(xmlFileName, bestuurseenheidUuid, lokaalBestuurNis2019Url, language, sparqlClientUrl);
}

main();
