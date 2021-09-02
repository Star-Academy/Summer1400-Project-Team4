import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipelineDesignerComponent } from './components/pipeline-designer/pipeline-designer.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { LineService } from './services/line.service';
import { DiagramComponent } from './components/diagram/diagram.component';

const routes: Routes = [
    {
        path: '',
        component: PipelineDesignerComponent,
    },
];

@NgModule({
    declarations: [PipelineDesignerComponent, DiagramComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FormsModule,
    ],
    providers: [LineService],
})
export class PipelineModule {}
