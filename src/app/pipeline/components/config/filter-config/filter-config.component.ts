import { Component, Input, OnInit } from '@angular/core';
import { FilterConfig } from 'src/app/pipeline/models/config.model';

@Component({
    selector: 'app-filter-config',
    templateUrl: './filter-config.component.html',
    styleUrls: ['./filter-config.component.scss'],
})
export class FilterConfigComponent implements OnInit {
    @Input() config?: FilterConfig;

    constructor() {}

    ngOnInit(): void {}
}
