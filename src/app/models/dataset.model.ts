export interface Dataset {
    id: number;
    name: string;
    liked: boolean;
}

export interface DatasetDetails extends Dataset {
    columns: { name: string; type: string };
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
