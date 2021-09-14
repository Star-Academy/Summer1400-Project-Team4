import { Component, Input, OnInit } from '@angular/core';
import { DatasetInputNode } from 'src/app/pipeline/models/pipeline-node.model';

@Component({
    selector: 'app-input-config',
    templateUrl: './input-config.component.html',
    styleUrls: ['./input-config.component.scss'],
})
export class InputConfigComponent implements OnInit {
    @Input() node?: DatasetInputNode;

    constructor() {}

    ngOnInit(): void {}
}
