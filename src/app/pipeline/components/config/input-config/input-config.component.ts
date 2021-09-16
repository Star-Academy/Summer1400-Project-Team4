import { Component, Input, OnInit } from '@angular/core';
import { DatasetInputNode } from 'src/app/pipeline/models/pipeline-node.model';
import { DatasetStore } from 'src/app/pipeline/services/dataset-store';

@Component({
    selector: 'app-input-config',
    templateUrl: './input-config.component.html',
    styleUrls: ['./input-config.component.scss'],
})
export class InputConfigComponent implements OnInit {
    @Input() node?: DatasetInputNode;
    @Input() store?: DatasetStore;

    constructor() {}

    ngOnInit(): void {
        this.store?.update();
    }
}
