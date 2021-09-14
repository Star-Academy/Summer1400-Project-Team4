import { Component, Input, OnInit } from '@angular/core';
import { JoinType, joinTypeInfo } from 'src/app/pipeline/models/config.model';
import { JoinNode } from 'src/app/pipeline/models/pipeline-node.model';

@Component({
    selector: 'app-join-config',
    templateUrl: './join-config.component.html',
    styleUrls: ['./join-config.component.scss'],
})
export class JoinConfigComponent implements OnInit {
    @Input() node?: JoinNode;

    joinTypeInfo = joinTypeInfo;
    joinType = Object.values(JoinType);

    constructor() {}

    ngOnInit(): void {}
}
