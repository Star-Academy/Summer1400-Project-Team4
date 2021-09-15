import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PipelineExport } from '../pipeline/models/pipeline-export.model';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable()
export class PipelineService {
    constructor(private api: ApiService, private auth: AuthService) {}

    getAll(): Observable<PipelineExport[]> {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.get<PipelineExport[]>('pipelines', this.auth.authToken);
    }

    get(id: number): Observable<PipelineExport> {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.get<PipelineExport>(
            `pipelines/${id}`,
            this.auth.authToken
        );
    }

    create(pipeline: PipelineExport) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.post<number>(
            'pipelines',
            pipeline,
            this.auth.authToken
        );
    }

    update(pipeline: PipelineExport) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.put<void>(
            `pipelines/${pipeline.pipelineId}`,
            pipeline,
            this.auth.authToken
        );
    }

    delete(id: number) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        return this.api.delete<void>(`pipelines/${id}`, this.auth.authToken);
    }

    execute(id: number) {
        if (this.auth.authToken === null) throw Error('User is not logged in');

        // TODO
        return this.api.post<any>(
            `pipelines/${id}/execute`,
            undefined,
            this.auth.authToken
        );
    }
}
