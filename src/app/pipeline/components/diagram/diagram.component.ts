import {
    CdkDrag,
    CdkDragDrop,
    CdkDragEnd,
    CdkDragMove,
    CdkDragStart,
    CdkDropList,
} from '@angular/cdk/drag-drop';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { LineService } from '../../services/line.service';

class Card {
    constructor(
        public id: number,
        numInputs: number,
        public hasOutput: boolean,
        public title: string,
        public subtitle: string = ''
    ) {
        for (let i = 0; i < numInputs; i++) this.inputs.push([]);
    }

    inputs: Card[][] = [];
    outputPlaceholderElement?: HTMLElement;
    position = { x: 0, y: 0 };
}

interface DropListData {
    type: 'input' | 'output' | 'remove';
    card?: Card;
    list?: Card[];
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

    private Line?: object;
    lines: any[] = [];
    baseOffset = { x: 0, y: 0 };
    dragOffset = { x: 0, y: 0 };
    cards: Card[] = [
        new Card(1, 0, true, 'مبدأ', 'دیتاست ثبت احوال'),
        new Card(2, 1, false, 'مقصد', 'CIA'),
    ];
    reposition = new Subject<void>();

    Card = Card;

    constructor(private lineService: LineService) {}

    ngOnInit(): void {}

    ngAfterViewInit() {
        this.Line = this.lineService.onContainer(
            this.lineContainer?.nativeElement
        );
    }

    addCard() {
        this.cards.push(new Card(0, 2, true, 'پردازش', 'دلال اطلاعات'));
    }

    inputDropEnterPredicate(drag: CdkDrag, drop: CdkDropList<DropListData>) {
        return (drag.data as Card) !== drop.data.card!;
    }

    buttonDrop(event: CdkDragDrop<DropListData>) {
        if (event.previousContainer === event.container) return;

        if (
            event.container.data.type === 'output' ||
            event.container.data.type === 'remove'
        ) {
            if (event.previousContainer.data.type === 'input')
                event.previousContainer.data.list!.pop();
        } else if (event.container.data.type === 'input') {
            if (event.container.data.list!.length > 0)
                event.container.data.list!.pop();

            if (event.previousContainer.data.type === 'input') {
                event.container.data.list!.push(
                    event.previousContainer.data.list!.pop()!
                );
            } else if (event.previousContainer.data.type === 'output') {
                event.container.data.list!.push(
                    event.previousContainer.data.card!
                );
            }
        }
    }

    positionConnections() {
        this.reposition.next();
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
        event.source.data.position = {
            x: snapTo(event.source.getFreeDragPosition().x, 4 * remInPixels()),
            y: snapTo(event.source.getFreeDragPosition().y, 4 * remInPixels()),
        };
    }
}

function snapTo(x: number, grid: number) {
    return Math.round(x / grid) * grid;
}

function remInPixels() {
    return parseFloat(getComputedStyle(document.documentElement).fontSize);
}
