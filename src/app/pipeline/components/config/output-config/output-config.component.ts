import { Component, Input, OnInit } from '@angular/core';

interface OutputConfig {
    datasetName: string;
}

@Component({
    selector: 'app-output-config',
    templateUrl: './output-config.component.html',
    styleUrls: ['./output-config.component.scss'],
})
export class OutputConfigComponent implements OnInit {
    @Input() config?: OutputConfig;

    constructor() {}

    ngOnInit(): void {}
}
