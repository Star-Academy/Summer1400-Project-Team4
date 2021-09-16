import { Component, Input, OnInit } from '@angular/core';
import { JoinType, joinTypeInfo } from 'src/app/pipeline/models/config.model';
import { JoinNode } from 'src/app/pipeline/models/pipeline-node.model';
import { DatasetStore } from 'src/app/pipeline/services/dataset-store';

@Component({
    selector: 'app-join-config',
    templateUrl: './join-config.component.html',
    styleUrls: ['./join-config.component.scss'],
})
export class JoinConfigComponent implements OnInit {
    @Input() node?: JoinNode;
    @Input() store?: DatasetStore;

    joinTypeInfo = joinTypeInfo;
    joinType = Object.values(JoinType);

    constructor() {}

    ngOnInit(): void {
        this.store?.update();
    }
}
