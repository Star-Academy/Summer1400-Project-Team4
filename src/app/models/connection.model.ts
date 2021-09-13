export interface Connection {
    id: number;
    name: string;
    host: string;
    user: string;
    password: string;
}

export interface NewConnection {
    name: string;
    host: string;
    user: string;
    password: string;
}
