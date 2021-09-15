import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialCreatorComponent } from './components/designer/initial-creator.component';
import { DesignerComponent } from './components/designer/designer.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LineService } from './services/line.service';
import { DiagramComponent } from './components/diagram/diagram.component';
import { AnchorComponent } from './components/anchor/anchor.component';
import { SpyElementDirective } from './components/diagram/spy-element.directive';
import { InputConfigComponent } from './components/config/input-config/input-config.component';
import { AggregateConfigComponent } from './components/config/aggregate-config/aggregate-config.component';
import { OutputConfigComponent } from './components/config/output-config/output-config.component';
import { FilterConfigComponent } from './components/config/filter-config/filter-config.component';
import { SortConfigComponent } from './components/config/sort-config/sort-config.component';
import { JoinConfigComponent } from './components/config/join-config/join-config.component';
import { FilteringTreeComponent } from './components/filtering-tree/filtering-tree.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
    {
        path: ':id',
        canActivate: [AuthGuard],
        component: DesignerComponent,
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: InitialCreatorComponent,
    },
    {
        path: '**',
        redirectTo: '/',
    },
];

@NgModule({
    declarations: [
        InitialCreatorComponent,
        DesignerComponent,
        DiagramComponent,
        AnchorComponent,
        SpyElementDirective,
        InputConfigComponent,
        AggregateConfigComponent,
        OutputConfigComponent,
        FilterConfigComponent,
        SortConfigComponent,
        JoinConfigComponent,
        FilteringTreeComponent,
    ],
    entryComponents: [FilteringTreeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [LineService, AuthGuard],
})
export class PipelineModule {}
