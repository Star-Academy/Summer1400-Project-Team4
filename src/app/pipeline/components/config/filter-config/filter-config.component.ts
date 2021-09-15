import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterNode } from 'src/app/pipeline/models/pipeline-node.model';
import { FilteringTreeComponent } from '../../filtering-tree/filtering-tree.component';

@Component({
    selector: 'app-filter-config',
    templateUrl: './filter-config.component.html',
    styleUrls: ['./filter-config.component.scss'],
})
export class FilterConfigComponent implements OnInit {
    @Input() node?: FilterNode;

    constructor(public dialog: MatDialog) {}

    ngOnInit(): void {}

    designClicked() {
        const ref = this.dialog.open(FilteringTreeComponent, {
            panelClass: 'filterDialog',
            disableClose: false,
            closeOnNavigation: true,
        });

        const sub = ref.componentInstance.onSaveGraph.subscribe(() => {
            ref.close();
        });

        ref.afterClosed().subscribe(() => {
            sub.unsubscribe();
        });
    }
}
