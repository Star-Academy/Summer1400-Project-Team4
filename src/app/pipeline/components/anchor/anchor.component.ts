import { CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LineService } from '../../services/line.service';

@Component({
    selector: 'app-anchor',
    templateUrl: './anchor.component.html',
    styleUrls: ['./anchor.component.scss'],
})
export class AnchorComponent
    implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
    @Input() lineContainer?: HTMLElement;
    @Input() connectionBegin?: HTMLElement;
    @ViewChild('connectionEnd') connectionEndRef?: ElementRef;
    @ViewChild('connectionEndPreview') connectionEndPreviewRef?: ElementRef;
    @Input() connectionRestVisibility: boolean = true;
    @Input() reposition?: Observable<void>;
    line: any;
    subscription?: Subscription;

    constructor(
        private lineService: LineService,
        @Inject(DOCUMENT) private document: Document
    ) {}

    tryToInitializeLine() {
        if (
            this.line === undefined &&
            this.lineContainer !== undefined &&
            this.connectionBegin !== undefined &&
            this.connectionEndRef !== undefined
        ) {
            const Line = this.lineService.onContainer(this.lineContainer);

            this.line = Line(
                this.connectionBegin,
                this.connectionEndRef?.nativeElement,
                {
                    color: 'var(--arrow-color)',
                    startSocket: 'left',
                    endSocket: 'right',
                    path: 'fluid',
                    hide: !this.connectionRestVisibility,
                    startSocketGravity: 100,
                    endSocketGravity: 100,
                }
            );

            this.subscription = this.reposition?.subscribe(() => {
                this.line?.position();
            });
            this.line.position();
        }
    }

    updateLineVisibility() {
        if (this.line !== undefined) {
            if (this.connectionRestVisibility) this.line.show();
            else this.line.hide();
        }
    }

    ngOnInit() {}

    ngAfterViewInit() {
        this.tryToInitializeLine();
        this.updateLineVisibility();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.tryToInitializeLine();
        if ('visibilityOnRest' in changes) {
            this.updateLineVisibility();
        }
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
        this.line?.remove();
    }

    previewDragStarted(event: CdkDragStart) {
        this.line.end =
            this.document.getElementsByClassName('cdk-drag-preview')[0];
        this.line.show();
    }

    previewDragMoved(event: CdkDragMove) {
        this.line?.position();
    }

    previewDragEnded() {
        this.line.end = this.connectionEndRef?.nativeElement;
        this.updateLineVisibility();
    }
}
