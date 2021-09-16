import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PipelineService } from 'src/app/services/pipeline.service';
import { exportPipeline } from '../../models/pipeline-export.model';
import { newPipeline } from '../../models/pipeline.model';

@Component({
    selector: 'app-initial-creator',
    template: '',
    styles: [''],
})
export class InitialCreatorComponent implements OnInit {
    constructor(
        private router: Router,
        private pipelineService: PipelineService
    ) {}

    ngOnInit() {
        this.pipelineService
            .create(exportPipeline(newPipeline))
            .subscribe((id) => {
                this.router.navigate(['pipeline', id]);
            });
    }
}
