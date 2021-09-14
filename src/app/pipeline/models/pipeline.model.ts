import { moveItemInArray } from '@angular/cdk/drag-drop';
import { defer, from, Observable, ReplaySubject, Subject } from 'rxjs';
import { DatasetStore } from '../services/dataset-store';
import {
    DatasetInputNode,
    nodeConstructors,
    PipelineNode,
    pipelineNodeInfo,
    PipelineNodeType,
} from './pipeline-node.model';
import { ValidationErrorList } from './validation.model';

export class Pipeline {
    nodes: PipelineNode[] = [];

    nodeAdded = new Subject<PipelineNode>();
    nodeEdited = new Subject<PipelineNode>();
    nodeRemoved = new Subject<PipelineNode>();
    loaded = new ReplaySubject<void>(1);

    validations = new ReplaySubject<ValidationErrorList>(1);

    constructor(public id: number, public name: string) {}

    getNode(id: number): { index: number; node: PipelineNode } | undefined {
        const index = this.nodes.findIndex((node) => node.id === id);
        if (index < 0) return;
        return { index: index, node: this.nodes[index] };
    }

    addNode(node: PipelineNode) {
        if (this.getNode(node.id) !== undefined)
            throw new Error(
                'a node with the same id already exists in the pipeline'
            );

        this.nodes.push(node);
        this.nodeAdded.next(node);
    }

    createNode(
        name: string,
        type: PipelineNodeType,
        position = { x: 0, y: 0 },
        inputs?: (number | null)[]
    ) {
        if (inputs !== undefined) {
            if (inputs.length !== pipelineNodeInfo[type].numInputs)
                throw new Error('invalid number of inputs');
        } else {
            inputs = new Array(pipelineNodeInfo[type].numInputs).fill(null);
        }

        const node = new nodeConstructors[type](
            this.nextId,
            name,
            position,
            inputs
        );

        this.addNode(node);
        return node.id;
    }

    private get nextId() {
        return Math.max(0, ...this.nodes.map((node) => node.id + 1));
    }

    editNode(edited: PipelineNode) {
        const index = this.getNode(edited.id)?.index;

        if (index === undefined)
            throw new Error(
                'a node with the given id does not exist in the pipeline'
            );

        this.nodes[index] = edited;
        this.nodeEdited.next(edited);
    }

    markNodeAsEdited(id: number) {
        const node = this.getNode(id)?.node;

        if (node === undefined)
            throw new Error(
                'a node with the given id does not exist in the pipeline'
            );

        this.nodeEdited.next(node);
    }

    removeNode(id: number) {
        const index = this.nodes.findIndex((existing) => existing.id === id);

        if (index < 0)
            throw new Error(
                'a node with the given id does not exist in the pipeline'
            );

        this.nodes.forEach((node) => {
            let edited = false;
            for (let i = 0; i < node.inputs.length; i++) {
                if (node.inputs[i] === id) {
                    node.inputs[i] = null;
                    edited = true;
                }
            }
            if (edited) this.nodeEdited.next(node);
        });

        const node = this.nodes.splice(index, 1)[0];
        this.nodeRemoved.next(node);
    }

    validate(store: DatasetStore): Observable<ValidationErrorList> {
        return defer(async (): Promise<ValidationErrorList> => {
            let errors = this.reorder();
            if (Object.keys(errors).length > 0) {
                this.validations.next(errors);
                return errors;
            }

            if (
                this.nodes.filter(
                    (node) => node.type === PipelineNodeType.datasetInput
                ).length !== 1
            )
                errors.inputs = 'تنها یک گره دیتاست ورودی باید وجود داشته باشد';

            if (
                this.nodes.filter(
                    (node) => node.type === PipelineNodeType.datasetOutput
                ).length > 1
            )
                errors.outputs =
                    'حداکثر یک گره دیتاست خروجی باید وجود داشته باشد';

            for (const node of this.nodes) {
                await node.updateOutputFields(this, store);
            }

            for (const node of this.nodes) {
                await node.validate(this, store);
            }

            return errors;
        });
    }

    reorder(): ValidationErrorList {
        const validDeps: number[] = [];

        for (let i = 0; i < this.nodes.length; i++) {
            let success = false;
            let j = i;
            for (; j < this.nodes.length; j++) {
                const depsMet = this.nodes[j].inputs.every((depId) =>
                    depId === null ? true : validDeps.includes(depId)
                );

                if (depsMet) {
                    success = true;
                    break;
                }
            }
            if (!success) return { circular: 'گراف شامل دور است' };

            validDeps.push(this.nodes[j].id);
            moveItemInArray(this.nodes, j, i);
        }

        return {};
    }
}
