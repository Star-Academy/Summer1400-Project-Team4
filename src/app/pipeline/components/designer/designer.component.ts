import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PipelineNodeType, Pipeline } from '../../pipeline.model';

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
            'اطلاعات شخصی',
            PipelineNodeType.datasetInput,
            { x: 3, y: 5 }
        );

        const accountId = this.pipeline.createNode(
            'اطلاعات بانکی',
            PipelineNodeType.datasetInput,
            { x: 3, y: 10 }
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

        this.pipeline.createNode('MI7', PipelineNodeType.datasetOutput, {
            x: 20,
            y: 10,
        });
    }

    addNode() {
        this.pipeline.createNode('الحاق', PipelineNodeType.join, {
            x: 3,
            y: 1,
        });
        this.pipeline.createNode('صافی نمونه', PipelineNodeType.filter, {
            x: 10,
            y: 1,
        });
    }

    exportPipeline() {
        this.pipeline.reorder();
        console.log(JSON.stringify(this.pipeline.export(), null, 4));
    }
}
