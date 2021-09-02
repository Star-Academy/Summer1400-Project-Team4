import {
    CdkDragEnd,
    CdkDragMove,
    CdkDragRelease,
    CdkDragStart,
} from '@angular/cdk/drag-drop';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { LineService } from '../../services/line.service';

@Component({
    selector: 'app-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent implements OnInit, AfterViewInit {
    @ViewChild('lineContainer') lineContainer?: ElementRef;
    @ViewChild('lineStart', { read: ElementRef }) lineStart?: ElementRef;
    @ViewChild('lineEnd', { read: ElementRef }) lineEnd?: ElementRef;

    private Line?: { (start: any, end: any, options?: any): any };
    lines: any[] = [];
    baseOffset = { x: 0, y: 0 };
    dragOffset = { x: 0, y: 0 };

    constructor(private lineService: LineService) {}

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.Line = this.lineService.onContainer(
            this.lineContainer?.nativeElement
        );

        this.lines.push(
            this.Line(
                this.lineStart!.nativeElement,
                this.lineEnd!.nativeElement,
                { color: 'var(--arrow-color)' }
            )
        );

        this.lines.push(
            this.Line(
                this.lineEnd!.nativeElement,
                this.lineStart!.nativeElement,
                { color: 'var(--arrow-color)' }
            )
        );
    }

    refreshArrows() {
        this.lines.forEach((line) => {
            line.position();
        });
    }

    updateDragOffset(event: CdkDragMove) {
        this.dragOffset = event.distance;
    }

    updateOffset(event: CdkDragEnd) {
        this.baseOffset = {
            x: this.baseOffset.x + event.distance.x,
            y: this.baseOffset.y + event.distance.y,
        };
        this.dragOffset = { x: 0, y: 0 };
        event.source.reset();
    }

    cardDragStarted(event: CdkDragStart) {
        event.source.element.nativeElement.classList.remove('snap-animation');
    }

    cardDragEnded(event: CdkDragEnd) {
        event.source.element.nativeElement.classList.add('snap-animation');
        event.source._dragRef.setFreeDragPosition({
            x: snapTo(event.source.getFreeDragPosition().x, 4 * remInPixels()),
            y: snapTo(event.source.getFreeDragPosition().y, 4 * remInPixels()),
        });

        this.refreshArrows();
    }
}

function snapTo(x: number, grid: number) {
    return Math.round(x / grid) * grid;
}

function remInPixels() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
}
