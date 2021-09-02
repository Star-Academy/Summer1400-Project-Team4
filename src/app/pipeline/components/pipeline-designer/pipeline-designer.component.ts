import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pipeline',
    templateUrl: './pipeline-designer.component.html',
    styleUrls: ['./pipeline-designer.component.scss'],
})
export class PipelineDesignerComponent implements OnInit {
    pipelineName: string = 'خط لوله جدید';

    constructor() {}

    ngOnInit(): void {}
}
