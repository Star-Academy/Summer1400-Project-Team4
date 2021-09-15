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
    PipelineExport,
} from '../../models/pipeline-export.model';
import {
    PipelineNode,
    pipelineNodeInfo,
    PipelineNodeType,
} from '../../models/pipeline-node.model';
import { newPipeline, Pipeline } from '../../models/pipeline.model';
import { DiagramComponent } from '../diagram/diagram.component';
import fileDownload from 'js-file-download';
import { hasError, listErrors } from '../../models/validation.model';

@Component({
    selector: 'app-pipeline',
    templateUrl: './designer.component.html',
    styleUrls: ['./designer.component.scss'],
})
export class DesignerComponent
    implements OnInit, AfterViewInit, AfterContentInit
{
    pipeline = importPipeline(exportPipeline(newPipeline));
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
        let errors = this.pipeline!.reorder();
        if (hasError(errors)) {
            console.error(errors);
            const message = listErrors(errors)[0].value;
            this.snackBar.open(message, '', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
                panelClass: 'red-snackbar',
            });
            return;
        }

        let exported: PipelineExport;
        try {
            exported = exportPipeline(this.pipeline!);
            exported.pipelineId = undefined;
        } catch (error) {
            console.error(error);
            const message = error.message;
            this.snackBar.open(message, '', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
                panelClass: 'red-snackbar',
            });
            return;
        }

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
