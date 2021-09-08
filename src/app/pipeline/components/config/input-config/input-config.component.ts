import { Component, Input, OnInit } from '@angular/core';
import { InputConfig } from 'src/app/pipeline/models/config.model';

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
