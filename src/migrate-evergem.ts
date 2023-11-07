import {runProcess} from "./migration-process";
import {Language} from "./language";

async function main() {

    const xmlFileName =  'src/resources/LPDC_Evergem.xml';
    const bestuurseenheidUuid = '23d04e951dabc6c108803eac7e8faf08c639ba6984d1cda170f09fbd8a511855';
    const lokaalBestuurNis2019Url = 'http://vocab.belgif.be/auth/refnis2019/44019';
    const language = Language.INFORMAL;
    const sparqlClientUrl = `http://localhost:8896/sparql`;

    await runProcess(xmlFileName, bestuurseenheidUuid, lokaalBestuurNis2019Url, language, sparqlClientUrl);
}

main();
