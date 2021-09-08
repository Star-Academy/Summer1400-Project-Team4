import { Component, Input, OnInit } from '@angular/core';
import { OutputConfig } from 'src/app/pipeline/models/config.model';

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
