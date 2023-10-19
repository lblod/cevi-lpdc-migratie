import Papa from 'papaparse';
export class Logger {

    static id: string;
    static title: string;
    static logList: Log[] = [];
    static importedLogList: ImportedLog[] = [];

    static setCeviId(id: string) {
        this.id = id;
        console.log(`\n--- Mapping cevi Product '${id || '(none specified)'}' ---`);
    }

    static log(message: string) {
        this.logList.push({
            id: this.id,
            message: message
        });
        console.log(message);
    }

    static logImported(title: string | undefined) {
        this.importedLogList.push({
            id: this.id,
            title: title ?? 'No title provided',
            succes: true,
            reasonNotImported: undefined
        })
    }

    static logNotImported(title: string | undefined, reason: string, error?: unknown) {
        this.importedLogList.push({
            id: this.id,
            title: title ?? 'No title provided',
            succes: false,
            reasonNotImported: reason
        });
        console.error(`${reason}`, error);
    }

    static mappedFieldsToCsv() {
        return Papa.unparse(this.logList, {
            quotes: false,
            delimiter: ",",
            header: true
        })
    }

    static importedToCsv() {
        return Papa.unparse(this.importedLogList, {
            quotes: false,
            delimiter: ",",
            header: true
        })
    }

}

type Log = {
    id: string;
    message: string
}

type ImportedLog = {
    id: string,
    title: string,
    succes: boolean,
    reasonNotImported: string | undefined
}