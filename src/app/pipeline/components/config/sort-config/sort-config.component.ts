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

interface SortOrder {
    name: string;
    descending: boolean;
}

interface SortConfig {
    orders?: SortOrder[];
}

@Component({
    selector: 'app-sort-config',
    templateUrl: './sort-config.component.html',
    styleUrls: ['./sort-config.component.scss'],
})
export class SortConfigComponent implements OnInit, AfterViewChecked {
    @Input() config?: SortConfig;
    @ViewChild('firstExpansionPanel') firstExpansionPanel?: MatExpansionPanel;
    expandNewOrder = false;

    constructor(private cdref: ChangeDetectorRef) {}

    ngOnInit(): void {
        if (this.config !== undefined) {
            if (this.config.orders === undefined) {
                this.config.orders = [];
            }
        }
    }

    ngAfterViewChecked(): void {
        if (this.expandNewOrder) {
            this.expandNewOrder = false;
            this.firstExpansionPanel?.open();
            this.cdref.detectChanges();
        }
    }

    addOrder() {
        this.config?.orders?.unshift({ name: '', descending: false });
        this.expandNewOrder = true;
    }

    removeOrder(index: number) {
        this.config?.orders?.splice(index, 1);
    }

    dropOrder(event: CdkDragDrop<void>) {
        moveItemInArray(
            this.config!.orders!,
            event.previousIndex,
            event.currentIndex
        );
    }
}
