import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Dataset, DatasetDetails } from 'src/app/models/dataset.model';
import { DatasetService } from 'src/app/services/dataset.service';

@Injectable()
export class DatasetStore {
    constructor(private datasetService: DatasetService) {}

    datasets = new ReplaySubject<Dataset[]>(1);

    private datasetDetails: { [id: number]: ReplaySubject<DatasetDetails> } =
        {};

    update() {
        this.datasetService.getAll().subscribe((datasets) => {
            this.datasets.next(datasets);
        });
    }

    getFields(id: number) {
        if (this.datasetDetails[id] === undefined) {
            this.updateFields(id);
        }

        return this.datasetDetails[id];
    }

    updateFields(id: number) {
        if (this.datasetDetails[id] === undefined) {
            this.datasetDetails[id] = new ReplaySubject<DatasetDetails>(1);
        }

        this.datasetService.get(id).subscribe((details) => {
            this.datasetDetails[id].next(details);
        });
    }
}
