import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import 'leader-line';

declare var LeaderLine: any;

@Injectable()
export class LineService {
    constructor(@Inject(DOCUMENT) private document: Document) {}

    onContainer(container: HTMLElement) {
        return (start: any, end: any, options?: any) => {
            let line: any;
            if (options === undefined) line = new LeaderLine(start, end);
            else line = new LeaderLine(start, end, options);

            const element = this.document.querySelector(
                'body > .leader-line:last-of-type'
            );
            if (element) container.appendChild(element);
            else {
                console.error('element of line was not found:', line);
                return line;
            }

            const originalRemove = line.remove;
            line.remove = () => {
                this.document.body.appendChild(element);
                originalRemove.bind(line)();
            };

            return line;
        };
    }
}
