import { Injectable } from '@angular/core';
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

    getAll() {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.get<Dataset[]>('datasets', this.auth.authToken);
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

        return this.api.post('datasets/upload', dataset, this.auth.authToken);
    }

    createExternal(dataset: NewExternalDataset) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.post('datasets/create', dataset, this.auth.authToken);
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
