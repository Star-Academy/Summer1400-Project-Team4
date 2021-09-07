import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PipelineNodeType, Pipeline } from '../../models/pipeline.model';

@Component({
    selector: 'app-pipeline',
    templateUrl: './designer.component.html',
    styleUrls: ['./designer.component.scss'],
})
export class DesignerComponent implements OnInit, AfterViewInit {
    pipeline = new Pipeline('خط لوله جدید');

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        const personalId = this.pipeline.createNode(
            'ثبت احوال',
            PipelineNodeType.datasetInput,
            { x: 3, y: 5 }
        );

        const vipId = this.pipeline.createNode(
            'اشخاص مهم',
            PipelineNodeType.filter,
            { x: 10, y: 4 },
            [personalId]
        );

        this.pipeline.createNode(
            'CIA',
            PipelineNodeType.datasetOutput,
            { x: 20, y: 5 },
            [vipId]
        );
    }

    exportPipeline() {
        this.pipeline.reorder();
        console.log(JSON.stringify(this.pipeline.export(), null, 4));
    }
}
