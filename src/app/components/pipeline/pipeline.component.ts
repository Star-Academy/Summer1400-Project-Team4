import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pipeline',
    templateUrl: './pipeline.component.html',
    styleUrls: ['./pipeline.component.scss'],
})
export class PipelineComponent implements OnInit {
    pipelineName: string = '';

    constructor() {}

    ngOnInit(): void {}
}
