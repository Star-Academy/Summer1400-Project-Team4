import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pipeline',
    templateUrl: './designer.component.html',
    styleUrls: ['./designer.component.scss'],
})
export class DesignerComponent implements OnInit {
    pipelineName: string = 'خط لوله جدید';

    constructor() {}

    ngOnInit(): void {}
}
