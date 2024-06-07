import {runProcess} from "./migration-process";
import {Language} from "./language";

async function main() {

    const xmlFileName = 'src/resources/LPDC_CEVI.xml';
    const bestuurseenheidUuid = '6025a5d1ca2262a784f002edd8ce9ca9073ae3d5ebc6b6b5531f05a29e9250af';
    const lokaalBestuurNutsLauUrl = 'http://data.europa.eu/nuts/code/BE23646024';
    const language = Language.INFORMAL;
    const sparqlClientUrl = `http://localhost:8896/sparql`;

    await runProcess(xmlFileName, bestuurseenheidUuid, lokaalBestuurNutsLauUrl, language, sparqlClientUrl);
}

main();
