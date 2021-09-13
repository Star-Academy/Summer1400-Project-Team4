import { Injectable } from '@angular/core';
import {
    Dataset,
    DatasetDetails,
    NewExternalDataset,
    NewLocalDataset,
} from '../models/dataset.model';
import { ApiService } from './api.service';

@Injectable()
export class DatasetService {
    constructor(private api: ApiService) {}

    getAll() {
        return this.api.get<Dataset[]>('datasets');
    }

    get(id: number) {
        return this.api.get<DatasetDetails>(`datasets/${id}`);
    }

    createLocal(dataset: NewLocalDataset) {
        return this.api.post('datasets/upload', dataset);
    }

    createExternal(dataset: NewExternalDataset) {
        return this.api.post('datasets/create', dataset);
    }

    editName(id: number, newName: string) {
        return this.api.put(`datasets/${id}`, { newName: newName });
    }

    delete(id: number) {
        return this.api.delete(`datasets/${id}`);
    }

    like(id: number) {
        return this.api.post(`datasets/${id}/like`);
    }

    dislike(id: number) {
        return this.api.post(`datasets/${id}/dislike`);
    }

    preview(id: number, startingIndex: number, size: number) {
        return this.api.post(`datasets/${id}/preview`, {
            startingIndex: startingIndex,
            size: size,
        });
    }

    getDownloadLink(id: number) {
        throw new Error('Method not implemented.'); // TODO
    }
}
