import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerComponent } from './components/designer/designer.component';
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
        component: DesignerComponent,
    },
];

@NgModule({
    declarations: [
        DesignerComponent,
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
