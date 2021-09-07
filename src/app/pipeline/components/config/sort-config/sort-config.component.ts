import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';

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
export class SortConfigComponent implements OnInit {
    @Input() config?: SortConfig;

    constructor() {}

    ngOnInit(): void {
        if (this.config !== undefined) {
            if (this.config.orders === undefined) {
                this.config.orders = [];
            }
        }
    }

    addOrder() {
        this.config?.orders?.push({ name: '', descending: false });
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
