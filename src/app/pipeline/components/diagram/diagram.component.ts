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
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import {
    Pipeline,
    PipelineNode,
    pipelineNodeHasOutput,
    pipelineNodeTypeReadableNames,
} from '../../pipeline.model';
import { LineService } from '../../services/line.service';

const REM_IN_PIXLES = parseFloat(
    getComputedStyle(document.documentElement).fontSize
);
const GRID_IN_PIXELS = 4 * REM_IN_PIXLES;

class Card {
    constructor(public node: PipelineNode, public hasOutput: boolean) {
        this.inputs = Array(node.inputs.length).fill(null);
        this.updatePosition();
    }

    position!: { x: number; y: number };
    inputs: (Card | null)[];
    outputPlaceholderElement?: HTMLElement;

    get title() {
        return this.node.name;
    }

    get subtitle() {
        return pipelineNodeTypeReadableNames[this.node.type];
    }

    updatePosition() {
        this.position = {
            x: -this.node.position.x * GRID_IN_PIXELS,
            y: this.node.position.y * GRID_IN_PIXELS,
        };
    }
}

interface DropListData {
    type: 'input' | 'output' | 'remove';
    card?: Card;
    index?: number;
}

@Component({
    selector: 'app-diagram',
    templateUrl: './diagram.component.html',
    styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent implements OnInit, AfterViewInit {
    @Input() pipeline?: Pipeline;
    @ViewChild('lineContainer') lineContainer?: ElementRef;

    private Line?: object;
    lines: any[] = [];
    baseOffset = { x: 0, y: 0 };
    dragOffset = { x: 0, y: 0 };
    cards: Card[] = [];
    reposition = new Subject<void>();

    Card = Card;

    constructor(private lineService: LineService) {}

    ngOnInit(): void {
        this.pipeline!.nodeAdded.subscribe((node) => {
            this.cards.push(new Card(node, pipelineNodeHasOutput[node.type]));
            this.updateCardInputs(node);
        });

        this.pipeline!.nodeEdited.subscribe((node) => {
            this.updateCardInputs(node);
        });

        this.pipeline!.nodeRemoved.subscribe((node) => {
            const index = this.cards.findIndex(
                (card) => card.node.id === node.id
            )!;
            this.cards.splice(index, 1);
        });
    }

    ngAfterViewInit() {
        this.Line = this.lineService.onContainer(
            this.lineContainer?.nativeElement
        );

        window.addEventListener('load', () => {
            this.reposition.next();
        });
    }

    updateCardInputs(node: PipelineNode) {
        const card = this.findCard(node.id)!;
        for (let i = 0; i < card.inputs.length; i++) {
            if (node.inputs[i] === null) card.inputs[i] = null;
            else card.inputs[i] = this.findCard(node.inputs[i]!)!;
        }
    }

    findCard(id: number) {
        return this.cards.find((card) => card.node.id === id);
    }

    inputDropEnterPredicate(drag: CdkDrag, drop: CdkDropList<DropListData>) {
        return (drag.data as Card) !== drop.data.card!;
    }

    buttonDrop(event: CdkDragDrop<DropListData>) {
        if (event.previousContainer === event.container) return;

        const previous = event.previousContainer.data;
        const current = event.container.data;

        if (current.type === 'output' || current.type === 'remove') {
            if (previous.type === 'input') {
                previous.card!.node.inputs[previous.index!] = null;
                this.pipeline!.markNodeAsEdited(previous.card!.node.id);
            }
        } else if (current.type === 'input') {
            if (previous.type === 'input') {
                current.card!.node.inputs[current.index!] =
                    previous.card!.node.inputs[previous.index!];
                previous.card!.node.inputs[previous.index!] = null;
                this.pipeline!.markNodeAsEdited(previous.card!.node.id);
                this.pipeline!.markNodeAsEdited(current.card!.node.id);
            } else if (previous.type === 'output') {
                current.card!.node.inputs[current.index!] =
                    previous.card!.node.id;
                this.pipeline!.markNodeAsEdited(current.card!.node.id);
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

    cardDragStarted(event: CdkDragStart<Card>) {
        event.source.element.nativeElement.classList.remove('snap-animation');
    }

    cardDragEnded(event: CdkDragEnd<Card>) {
        event.source.element.nativeElement.classList.add('snap-animation');
        event.source.data.node.position = {
            x: Math.round(
                -event.source.getFreeDragPosition().x / GRID_IN_PIXELS
            ),
            y: Math.round(
                event.source.getFreeDragPosition().y / GRID_IN_PIXELS
            ),
        };
        event.source.data.updatePosition();
    }
}
