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
                    id: number;
                    connectionName: string;
                    host: string;
                    user: string;
                    password: string;
                }[]
            >('connections', this.auth.authToken)
            .pipe(
                map((connections) =>
                    connections.map((connection) => ({
                        id: connection.id,
                        name: connection.connectionName,
                        host: connection.host,
                        user: connection.user,
                        password: connection.password,
                    }))
                )
            );
    }

    get(id: number): Observable<Connection> {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api
            .get<{
                id: number;
                connectionName: string;
                host: string;
                user: string;
                password: string;
            }>(`connections/${id}`, this.auth.authToken)
            .pipe(
                map((connection) => ({
                    id: connection.id,
                    name: connection.connectionName,
                    host: connection.host,
                    user: connection.user,
                    password: connection.password,
                }))
            );
    }

    create(connection: NewConnection) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.post(
            'connections',
            {
                connectionName: connection.name,
                host: connection.host,
                user: connection.user,
                password: connection.password,
            },
            this.auth.authToken
        );
    }

    editName(id: number, newName: string) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.put(
            `connections/${id}`,
            { newName: newName },
            this.auth.authToken
        );
    }

    delete(id: number) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.delete(`connections/${id}`, this.auth.authToken);
    }

    getConnectionDatabases(id: number) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.get<string[]>(
            `connections/${id}/databaseName`,
            this.auth.authToken
        );
    }
}
