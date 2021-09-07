import { Component, Input, OnInit } from '@angular/core';

interface FilterConfig {
    condition: string;
}

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
