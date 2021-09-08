import { Component, Input, OnInit } from '@angular/core';
import {
    JoinConfig,
    JoinType,
    joinTypeInfo,
} from 'src/app/pipeline/models/config.model';

@Component({
    selector: 'app-join-config',
    templateUrl: './join-config.component.html',
    styleUrls: ['./join-config.component.scss'],
})
export class JoinConfigComponent implements OnInit {
    @Input() config?: JoinConfig;

    joinTypeInfo = joinTypeInfo;
    joinType = Object.values(JoinType);

    constructor() {}

    ngOnInit(): void {}
}
