import Papa from 'papaparse';
import fs from "fs/promises";
export class Logger {

    static id: string;
    static title: string;
    static logList: Log[] = [];
    static importedLogList: ImportedLog[] = [];

    static setCeviId(id: string) {
        this.id = id;
    }

    static log(message: string) {
        this.logList.push({
            id: this.id,
            message: message
        });
    }

    static logImported(title: string) {
        this.importedLogList.push({
            id: this.id,
            title: title
        })
    }

    static toCsv() {
        const csv = Papa.unparse(this.logList, {
            quotes: false,
            delimiter: ",",
            header: true
        })
        fs.writeFile('src/migration-results/mapped-fields-log.csv', csv);
    }

    static importedToCsv() {
        const importedCsv = Papa.unparse(this.importedLogList, {
            quotes: false,
            delimiter: ",",
            header: true
        })
        fs.writeFile('src/migration-results/imported-cevi-instances.csv', importedCsv);
    }

}

type Log = {
    id: string;
    message: string
}

type ImportedLog = {
    id: string,
    title: string
}