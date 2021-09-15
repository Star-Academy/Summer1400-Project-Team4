import {
    AfterContentInit,
    AfterViewInit,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PipelineService } from 'src/app/services/pipeline.service';
import {
    exportPipeline,
    importPipeline,
} from '../../models/pipeline-export.model';
import {
    PipelineNode,
    pipelineNodeInfo,
    PipelineNodeType,
} from '../../models/pipeline-node.model';
import { Pipeline } from '../../models/pipeline.model';
import { DiagramComponent } from '../diagram/diagram.component';
import fileDownload from 'js-file-download';

@Component({
    selector: 'app-pipeline',
    templateUrl: './designer.component.html',
    styleUrls: ['./designer.component.scss'],
})
export class DesignerComponent
    implements OnInit, AfterViewInit, AfterContentInit
{
    pipeline = new Pipeline(-1, 'سناریو جدید');
    //pipeline?: Pipeline;
    selectedNode?: PipelineNode;
    @ViewChild('diagram') diagram!: DiagramComponent;

    pipelineNodeInfo = pipelineNodeInfo;
    PipelineNodeType = PipelineNodeType;

    constructor(
        private route: ActivatedRoute,
        private pipelineService: PipelineService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            const id = parseInt(params.get('id') as string);
            this.pipelineService.get(id).subscribe({
                next: (pipeline) => {
                    this.pipeline = importPipeline(pipeline);
                },
                error: () => {
                    const message = 'اشکال در دریافت سناریو';
                    this.snackBar.open(message, '', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        horizontalPosition: 'center',
                        panelClass: 'red-snackbar',
                    });
                },
            });
        });
    }

    ngAfterContentInit(): void {}

    ngAfterViewInit(): void {}

    savePipeline() {
        this.pipelineService.update(exportPipeline(this.pipeline)).subscribe({
            next: () => {
                const message = 'سناریو با موفقیت ذخیره شد';
                this.snackBar.open(message, '', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'center',
                    panelClass: 'green-snackbar',
                });
            },
            error: () => {
                const message = 'اشکال در ذخیره سناریو';
                this.snackBar.open(message, '', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'center',
                    panelClass: 'red-snackbar',
                });
            },
        });
    }

    exportPipeline() {
        this.pipeline!.reorder();
        const exported = exportPipeline(this.pipeline!);
        exported.pipelineId = undefined;

        const json = JSON.stringify(exported, null, 4);
        console.log(json);
        fileDownload(json, 'pipeline.json');
    }

    async importPipeline(event: any) {
        const file = event.target.files.item(0);
        const text = await file.text();

        const pipeline = importPipeline(JSON.parse(text));
        pipeline.id = this.pipeline.id;
        this.pipeline = pipeline;

        event.target.value = '';
    }
}
