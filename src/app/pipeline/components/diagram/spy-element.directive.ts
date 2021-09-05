import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';

@Directive({ selector: '[spy-element]' })
export class SpyElementDirective implements OnInit, AfterViewInit, OnDestroy {
    constructor(private hostRef: ElementRef) {}

    @Output() onInit = new EventEmitter<ElementRef>();
    @Output() afterViewInit = new EventEmitter<ElementRef>();
    @Output() onDestroy = new EventEmitter<ElementRef>();

    ngOnInit() {
        this.onInit.emit(this.hostRef.nativeElement);
    }

    ngAfterViewInit() {
        this.afterViewInit.emit(this.hostRef.nativeElement);
    }

    ngOnDestroy() {
        this.onDestroy.emit(this.hostRef.nativeElement);
    }
}
