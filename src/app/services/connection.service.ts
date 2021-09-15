import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Connection, NewConnection } from '../models/connection.model';
import { AuthService } from './auth.service';

@Injectable()
export class ConnectionService {
    constructor(private api: ApiService, private auth: AuthService) {}

    getAll(): Observable<Connection[]> {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api
            .get<
                {
                    connectionId: number;
                    connectionName: string;
                    serverIp: string;
                    DBUserName: string;
                    dpPassword: string;
                    dbName: string;
                }[]
            >('connection', this.auth.authToken)
            .pipe(
                map((connections) =>
                    connections.map((connection) => ({
                        id: connection.connectionId,
                        name: connection.connectionName,
                        host: connection.serverIp,
                        username: connection.DBUserName,
                        password: connection.dpPassword,
                        databaseName: connection.dbName,
                    }))
                )
            );
    }

    get(id: number): Observable<Connection> {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api
            .get<{
                connectionId: number;
                connectionName: string;
                serverIp: string;
                dbUserName: string;
                dbPassword: string;
                dbName: string;
            }>(`connection/${id}`, this.auth.authToken)
            .pipe(
                map((connection) => ({
                    id: connection.connectionId,
                    name: connection.connectionName,
                    host: connection.serverIp,
                    username: connection.dbUserName,
                    password: connection.dbPassword,
                    databaseName: connection.dbName,
                }))
            );
    }

    create(connection: NewConnection) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.post(
            'connection',
            {
                connectionName: connection.name,
                serverIp: connection.host,
                dbUserName: connection.username,
                dbPassword: connection.password,
                dbName: connection.databaseName,
            },
            this.auth.authToken
        );
    }

    editName(id: number, newName: string) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.put(
            `connection/${id}`,
            { newName: newName },
            this.auth.authToken
        );
    }

    delete(id: number) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.delete(`connection/${id}`, this.auth.authToken);
    }
}
