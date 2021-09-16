import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PipelineExport } from 'src/app/pipeline/models/pipeline-export.model';
import { PipelineService } from 'src/app/services/pipeline.service';

@Component({
    selector: 'app-pipelines',
    templateUrl: './pipelines.component.html',
    styleUrls: ['./pipelines.component.scss'],
})
export class PipelinesComponent implements OnInit {
    displayedColumns = ['pipelineName', 'delete-add'];
    pipelines: PipelineExport[] = [];

    constructor(
        private router: Router,
        private pipelineService: PipelineService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.refreshPipelines();
    }

    refreshPipelines() {
        this.pipelineService.getAll().subscribe({
            next: (pipelines) => {
                this.pipelines = pipelines;
            },
            error: (error) => {
                console.error(error);
                this.snackBar.open('اشکال در دریافت سناریوها از سرور', '', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'center',
                    panelClass: 'red-snackbar',
                });
            },
        });
    }

    deletePipeline(element: PipelineExport) {
        this.pipelineService.delete(element.pipelineId!).subscribe({
            next: () => {
                this.snackBar.open('سناریو با موفقیت حذف شد', '', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'center',
                    panelClass: 'green-snackbar',
                });
                this.refreshPipelines();
            },
            error: (error) => {
                console.error(error);
                this.snackBar.open('اشکال در حذف سناریو', '', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    horizontalPosition: 'center',
                    panelClass: 'red-snackbar',
                });
            },
        });
    }

    addPipeline() {
        this.router.navigate(['pipeline']);
    }
}
