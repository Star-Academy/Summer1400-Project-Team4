import {
    CdkDragDrop,
    CdkDragEnd,
    CdkDragMove,
    CdkDragStart,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { LineService } from '../../services/line.service';

class Node {
    constructor(
        public id: number,
        public title: string,
        public subtitle: string = '',
        public inputs: Node[] = []
    ) {
        this.outputs.push(this);
    }

    outputs: Node[] = [];
    outputPlaceholderElement = new ReplaySubject<HTMLElement>(1);
}

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
    nodes: Node[] = [
        new Node(1, 'مبدأ', 'دیتاست ثبت احوال'),
        new Node(2, 'مقصد', 'CIA'),
    ];
    reposition = new Subject<void>();

    constructor(private lineService: LineService) {}

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.Line = this.lineService.onContainer(
            this.lineContainer?.nativeElement
        );
    }

    addNode() {
        this.nodes.push(new Node(0, 'پردازش', 'دلال اطلاعات'))
    }

    connectNode(begin: Node, end: Node) {
        if (begin.outputs.length > 0) {
            end.inputs.push(begin.outputs.pop()!);
        }
    }

    buttonDrop(
        event: CdkDragDrop<{
            node: Node;
            type: string;
            list: Node[];
        }>
    ) {
        if (event.previousContainer === event.container) {
            return;
        } else {
            transferArrayItem(
                event.previousContainer.data.list,
                event.container.data.list,
                event.previousIndex,
                event.currentIndex
            );
        }
    }

    refreshArrows() {
        this.reposition.next();
        // this.lines.forEach((line) => {
        //     line.position();
        // });
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
