import { Component, Input, OnInit } from '@angular/core';
import { FilterNode } from 'src/app/pipeline/models/pipeline-node.model';

@Component({
    selector: 'app-filter-config',
    templateUrl: './filter-config.component.html',
    styleUrls: ['./filter-config.component.scss'],
})
export class FilterConfigComponent implements OnInit {
    @Input() node?: FilterNode;

    constructor() {}

    ngOnInit(): void {}
}
