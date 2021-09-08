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
import {
    AggregateConfig,
    AggregateOperationType,
    aggregateTypeInfo as aggregateOperationTypeInfo,
} from 'src/app/pipeline/models/config.model';

@Component({
    selector: 'app-aggregate-config',
    templateUrl: './aggregate-config.component.html',
    styleUrls: ['./aggregate-config.component.scss'],
})
export class AggregateConfigComponent implements OnInit, AfterViewChecked {
    @Input() config?: AggregateConfig;
    @ViewChild('groupByPanel') firstGroupByPanel?: MatExpansionPanel;
    @ViewChild('operationPanel') firstOperationPanel?: MatExpansionPanel;
    expandNewGroupBy = false;
    expandNewOperation = false;

    aggregateOperationTypeInfo = aggregateOperationTypeInfo;
    aggregateOperationType = Object.values(AggregateOperationType);

    constructor(private cdref: ChangeDetectorRef) {}

    ngOnInit(): void {}

    ngAfterViewChecked(): void {
        let shouldDetectChanges = false;

        if (this.expandNewGroupBy) {
            this.expandNewGroupBy = false;
            this.firstGroupByPanel?.open();
            shouldDetectChanges = true;
        }

        if (this.expandNewOperation) {
            this.expandNewOperation = false;
            this.firstOperationPanel?.open();
            shouldDetectChanges = true;
        }

        if (shouldDetectChanges) this.cdref.detectChanges();
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }

    addGroupBy() {
        this.config?.groupBy?.unshift('');
        this.expandNewGroupBy = true;
    }

    removeGroupBy(index: number) {
        this.config?.groupBy?.splice(index, 1);
    }

    // dropGroupBy(event: CdkDragDrop<void>) {
    //     moveItemInArray(
    //         this.config!.groupBy!,
    //         event.previousIndex,
    //         event.currentIndex
    //     );
    // }

    addOperation() {
        this.config?.operations?.unshift({
            fieldName: '',
            type: AggregateOperationType.count,
            outputName: '',
        });
        this.expandNewOperation = true;
    }

    removeOperation(index: number) {
        this.config?.operations?.splice(index, 1);
    }

    // dropOperation(event: CdkDragDrop<void>) {
    //     moveItemInArray(
    //         this.config!.operations!,
    //         event.previousIndex,
    //         event.currentIndex
    //     );
    // }
}
