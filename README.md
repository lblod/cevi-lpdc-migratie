# cevi-lpdc-migratie

Repository for the one-time migration of CEVI LPDC instances to ABB LPDC.

> **Important!!** \
> Rerun migration for each environment again by changing sparqlClientUrl, because concepts are different for each environment 

### preparation before use

**Note**: in the next usage explanation `LPDC_CEVI.xml` is used as example, please add your own bestuurseenheid relevant files.

- Place your cevi xml in folder `\src\resources\LPDC_CEVI.xml`
  - By default all in folder `\src\resource\*` but `LPDC_CEVI.xml` are git ignored.
- Ensure you have created a `\src\migrate-<bestuurseenheid>.ts`
  - One for each bestuurseenheid that needs migrating is needed.
  - It contains 
    - The xml file to process
    - the bestuurseenheid uuid
    - the lokaal bestuurd nis 2019 url
    - the language chosen by the bestuurseenheid: `Language.INFORMAL` or `Language.FORMAL`
    - the sparqlclienturl for the environment where you will upload the results. This is internally use to look up the correct concept id for a given product number. You might need to tunnel locally. And of course, the environment needs to be running.
  - as an example: `\src\migrate-cevi.ts` 
```typescript
import {runProcess} from "./migration-process";
import {Language} from "./language";

async function main() {

    const xmlFileName = 'src/resources/LPDC_CEVI.xml';
    const bestuurseenheidUuid = '6025a5d1ca2262a784f002edd8ce9ca9073ae3d5ebc6b6b5531f05a29e9250af';
    const lokaalBestuurNis2019Url = 'http://vocab.belgif.be/auth/refnis2019/46024';
    const language = Language.INFORMAL;
    const sparqlClientUrl = `http://localhost:8896/sparql`;

    await runProcess(xmlFileName, bestuurseenheidUuid, lokaalBestuurNis2019Url, language, sparqlClientUrl);
}

main();
```
- Ensure you created in `package.json` a script to run the `\src\migrate-<bestuurseenheid>.ts` file
  - as an example:  `"migrate-cevi": "ts-node src/migrate-cevi.ts"`

### running the migration script: creating the ttl and sparql files

- The following will only create ttl and sparql files. It will not upload these files to the server. Allowing manual verification first.
- It will also not verify if any of these results are already uploaded to the environment. xml is just transformed in ttl and sparql.
- Run the migrate script on command line: `npm run migrate-cevi`
- Following timestamped files are created on each run under `\src\migration-results`:
  - ![lpdc-cevi-migration-results.png](images%2Flpdc-cevi-migration-results.png)
  - All timestamps are [Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time).
  - `LPDC_CEVI-2023-10-19T06:43:16.960Z.xml` : xml file is copied and versioned.
  - `LPDC_CEVI-2023-10-19T06:43:16.960Z-imported-cevi-instances.csv`: an overview of cevi instance id, title, whether import was successful, if not, augmented with reason 
  - `LPDC_CEVI-2023-10-19T06:43:16.960Z-mapping-failed-fields-log.csv`: each cevi instance id and non-mappable fields the reason
  - `LPDC_CEVI-2023-10-19T06:43:16.960Z-migration.log`: contains messages, warnings, errors
  - `LPDC_CEVI-2023-10-19T06:43:16.960Z-migration.ttl`: ttl to upload, in quad format
  - `LPDC_CEVI-2023-10-19T06:43:16.960Z-update-concept-display-configuration.sparql`: sparql query to update the concept display configurations of linked concepts

### uploading the ttl and sparql files to the environment

- Upload the ttl file in the virtuoso conductor:
  - Linked Data > Quad Store Upload
  - Choose ttl file
  - No need to fill in the Named Graph IRI*
  - Upload
  - Should only take a few seconds
- Execute the sparql file using the sparql endpoint. 
- Run and execute the ['link instantie to snapshot migratie script'](https://github.com/lblod/app-lpdc-digitaal-loket/tree/development/migration-scripts/link-instantie-to-snapshot) to fill up the hasVersioned source predicate for each instantie that had a concept linked.
- Run and execute the ['adres id migration script'](https://github.com/lblod/app-lpdc-digitaal-loket/tree/development/migration-scripts/adressen) to fill up the address id's for the migrated addresses.
