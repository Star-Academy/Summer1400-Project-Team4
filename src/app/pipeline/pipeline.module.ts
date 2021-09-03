import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipelineDesignerComponent } from './components/pipeline-designer/pipeline-designer.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { LineService } from './services/line.service';
import { DiagramComponent } from './components/diagram/diagram.component';
import { AnchorComponent } from './components/anchor/anchor.component';
import { SpyElementDirective } from './components/diagram/spy-element.directive';

const routes: Routes = [
    {
        path: '',
        component: PipelineDesignerComponent,
    },
];

@NgModule({
    declarations: [
        PipelineDesignerComponent,
        DiagramComponent,
        AnchorComponent,
        SpyElementDirective,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FormsModule,
    ],
    providers: [LineService],
})
export class PipelineModule {}
