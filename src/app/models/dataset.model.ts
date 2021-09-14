export interface Dataset {
    id: number;
    name: string;
    liked: boolean;
}

export enum DatasetFieldType {
    number = 'number',
    string = 'string',
}

export interface DatasetField {
    name: string;
    type: DatasetFieldType;
}

export interface DatasetDetails extends Dataset {
    fields: DatasetField[];
}

export interface NewLocalDataset {
    name: string;
    csvFile: string;
    autoMap: boolean;
    doesHaveHeader: boolean;
}

export interface NewExternalDataset {
    name: string;
    connectionId: number;
    databaseName: string;
    tableName: string;
}
