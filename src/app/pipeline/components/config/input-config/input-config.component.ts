import { Component, Input, OnInit } from '@angular/core';

interface InputConfig {
    datasetName: string;
}

@Component({
    selector: 'app-input-config',
    templateUrl: './input-config.component.html',
    styleUrls: ['./input-config.component.scss'],
})
export class InputConfigComponent implements OnInit {
    @Input() config?: InputConfig;

    constructor() {}

    ngOnInit(): void {}
}
