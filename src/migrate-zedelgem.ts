import {runProcess} from "./migration-process";
import {Language} from "./language";

async function main() {

    const xmlFileName =  'src/resources/LPDC_Zedelgem.xml';
    const bestuurseenheidUuid = 'e9e0287a3a974fba665e2649242a3607b8db35ca22085baf9ec26972b6e6a86c';
    const lokaalBestuurNis2019Url = 'http://vocab.belgif.be/auth/refnis2019/31040';
    const language = Language.INFORMAL;
    const sparqlClientUrl = `http://localhost:8896/sparql`;

    await runProcess(xmlFileName, bestuurseenheidUuid, lokaalBestuurNis2019Url, language, sparqlClientUrl);
}

main();
