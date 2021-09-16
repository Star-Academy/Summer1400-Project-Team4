import { Component, Input, OnInit } from '@angular/core';
import { DatasetOutputNode } from 'src/app/pipeline/models/pipeline-node.model';
import { DatasetStore } from 'src/app/pipeline/services/dataset-store';

@Component({
    selector: 'app-output-config',
    templateUrl: './output-config.component.html',
    styleUrls: ['./output-config.component.scss'],
})
export class OutputConfigComponent implements OnInit {
    @Input() node?: DatasetOutputNode;
    @Input() store?: DatasetStore;

    constructor() {}

    ngOnInit(): void {
        this.store?.update();
    }
}
