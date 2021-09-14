import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
    AfterViewChecked,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { SortNode } from 'src/app/pipeline/models/pipeline-node.model';

@Component({
    selector: 'app-sort-config',
    templateUrl: './sort-config.component.html',
    styleUrls: ['./sort-config.component.scss'],
})
export class SortConfigComponent implements OnInit, AfterViewChecked {
    @Input() node?: SortNode;
    @ViewChild('orderPanel') firstOrderPanel?: MatExpansionPanel;
    expandNewOrder = false;

    constructor(private cdref: ChangeDetectorRef) {}

    ngOnInit(): void {}

    ngAfterViewChecked(): void {
        if (this.expandNewOrder) {
            this.expandNewOrder = false;
            this.firstOrderPanel?.open();
            this.cdref.detectChanges();
        }
    }

    addOrder() {
        this.node?.config.orders.unshift({ fieldName: '', descending: false });
        this.expandNewOrder = true;
    }

    removeOrder(index: number) {
        this.node?.config.orders.splice(index, 1);
    }

    dropOrder(event: CdkDragDrop<void>) {
        moveItemInArray(
            this.node!.config.orders,
            event.previousIndex,
            event.currentIndex
        );
    }
}
