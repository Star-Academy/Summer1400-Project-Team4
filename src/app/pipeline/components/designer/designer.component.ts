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
        this.pipeline.createNode('ثبت احوال', PipelineNodeType.datasetInput, {
            x: 3,
            y: 5,
        });

        // cards: Card[] = [
        //     new Card(1, 0, true, 'ثبت احوال', 'External Datasbase', {
        //         x: -120,
        //         y: 200,
        //     }),
        //     new Card(2, 0, true, 'بانک مرکزی', 'External Datasbase', {
        //         x: -120,
        //         y: 400,
        //     }),
        //     new Card(3, 1, true, 'اشخاص مهم', 'Filter', { x: -400, y: 160 }),
        //     new Card(10, 1, false, 'CIA', 'External Datasbase', {
        //         x: -800,
        //         y: 200,
        //     }),
        //     new Card(11, 1, false, 'MI12', 'External Datasbase', {
        //         x: -800,
        //         y: 400,
        //     }),
        // ];
    }

    addNode() {
        this.pipeline.createNode('الحاق', PipelineNodeType.join, {
            x: 3,
            y: 1,
        });
        // this.cards.push(
        //     new Card(7, 1, true, 'صافی نمونه', 'Filter', { x: -400, y: 40 })
        // );
    }

    exportPipeline() {
        this.pipeline.reorder();
        console.log(JSON.stringify(this.pipeline.export(), null, 4));
    }
}
