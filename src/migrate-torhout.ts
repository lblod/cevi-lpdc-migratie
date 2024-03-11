import {Language} from "./language";
import {runProcess} from "./migration-process";

async function main() {
    const xmlFileName =  'src/resources/LPDC_Torhout.xml';
    const bestuurseenheidUuid = '842737db3afe0bad6a72bbbdeee376fe49abe721975d549d81bb22c70bc7002d';
    const lokaalBestuurNis2019Url = 'http://vocab.belgif.be/auth/refnis2019/31033';
    const language = Language.INFORMAL;
    const sparqlClientUrl = `http://localhost:8896/sparql`;

    await runProcess(xmlFileName, bestuurseenheidUuid, lokaalBestuurNis2019Url, language, sparqlClientUrl);
}

main();