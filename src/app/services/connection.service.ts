import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Connection, NewConnection } from '../models/connection.model';

@Injectable()
export class ConnectionService {
    constructor(private api: ApiService) {}

    getAll(): Observable<Connection[]> {
        return this.api
            .get<
                {
                    id: number;
                    connectionName: string;
                    host: string;
                    user: string;
                    password: string;
                }[]
            >('connections')
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
        return this.api
            .get<{
                id: number;
                connectionName: string;
                host: string;
                user: string;
                password: string;
            }>(`connections/${id}`)
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
        return this.api.post('connections', {
            connectionName: connection.name,
            host: connection.host,
            user: connection.user,
            password: connection.password,
        });
    }

    editName(id: number, newName: string) {
        return this.api.put(`connections/${id}`, { newName: newName });
    }

    delete(id: number) {
        return this.api.delete(`connections/${id}`);
    }

    getConnectionDatabases(id: number) {
        return this.api.get<string[]>(`connections/${id}/databaseName`);
    }
}
