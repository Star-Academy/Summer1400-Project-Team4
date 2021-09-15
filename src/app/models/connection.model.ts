export interface Connection {
    id: number;
    name: string;
    host: string;
    username: string;
    password: string;
    databaseName: string;
}

export interface NewConnection {
    name: string;
    host: string;
    username: string;
    password: string;
    databaseName: string;
}
