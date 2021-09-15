import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    Dataset,
    DatasetDetails,
    NewExternalDataset,
    NewLocalDataset,
} from '../models/dataset.model';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable()
export class DatasetService {
    constructor(private api: ApiService, private auth: AuthService) {}

    getAll(): Observable<Dataset[]> {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api
            .get<
                {
                    datasetId: number;
                    datasetName: string;
                    isLiked: boolean;
                }[]
            >('datasets', this.auth.authToken)
            .pipe(
                map((datasets) =>
                    datasets.map((dataset) => ({
                        id: dataset.datasetId,
                        name: dataset.datasetName,
                        liked: dataset.isLiked,
                    }))
                )
            );
    }

    get(id: number) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.get<DatasetDetails>(
            `datasets/${id}`,
            this.auth.authToken
        );
    }

    createLocal(dataset: NewLocalDataset) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.post(
            'datasets/upload',
            {
                datasetName: dataset.name,
                csvContent: dataset.csvFile,
                doesHaveHeader: dataset.doesHaveHeader,
                doesHaveAutoMap: dataset.autoMap,
                rowTerminator: dataset.rowSeparator,
                fieldTerminator: dataset.fieldSeparator,
            },
            this.auth.authToken
        );
    }

    createExternal(dataset: NewExternalDataset) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.post(
            'datasets/create',
            {
                connectionId: dataset.connectionId,
                datasetName: dataset.name,
                tableName: dataset.tableName,
                //isLiked: false,
            },
            this.auth.authToken
        );
    }

    editName(id: number, newName: string) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.put(
            `datasets/${id}`,
            { newName: newName },
            this.auth.authToken
        );
    }

    delete(id: number) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.delete(`datasets/${id}`, this.auth.authToken);
    }

    like(id: number) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.post(
            `datasets/${id}/like`,
            undefined,
            this.auth.authToken
        );
    }

    dislike(id: number) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.post(
            `datasets/${id}/dislike`,
            undefined,
            this.auth.authToken
        );
    }

    preview(id: number, startingIndex: number, size: number) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.post(
            `datasets/${id}/preview`,
            {
                startingIndex: startingIndex,
                size: size,
            },
            this.auth.authToken
        );
    }

    getDownloadLink(id: number) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        throw new Error('Method not implemented.'); // TODO
    }
}
