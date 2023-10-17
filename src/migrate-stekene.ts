import {runProcess} from "./migration-process";
import {Language} from "./language";

async function main() {

    const xmlFileName =  'src/resources/LPDC_Stekene.xml';
    const bestuurseenheidUuid = '6025a5d1ca2262a784f002edd8ce9ca9073ae3d5ebc6b6b5531f05a29e9250af';
    const lokaalBestuurNis2019Url = 'http://vocab.belgif.be/auth/refnis2019/46024';
    const language = Language.INFORMAL;

    await runProcess(xmlFileName, bestuurseenheidUuid, lokaalBestuurNis2019Url, language);
}

main();
