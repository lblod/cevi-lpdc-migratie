import {runProcess} from "./migration-process";
import {Language} from "./language";

async function main() {

    const xmlFileName =  'src/resources/LPDC_Herzele.xml';
    const bestuurseenheidUuid = '19a90656ebde5754d524ca8a17d06b857a6392b0b3db57dd24f899a1b71eda7d';
    const lokaalBestuurNis2019Url = 'http://vocab.belgif.be/auth/refnis2019/41027';
    const language = Language.INFORMAL;
    const sparqlClientUrl = `http://localhost:8896/sparql`;

    await runProcess(xmlFileName, bestuurseenheidUuid, lokaalBestuurNis2019Url, language, sparqlClientUrl);
}

main();
