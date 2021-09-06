import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';

export enum PipelineNodeType {
    datasetInput = 'datasetInput',
    datasetOutput = 'datasetOutput',
    filter = 'filter',
    join = 'join',
}

export const pipelineNodeTypeReadableNames: {
    [type in PipelineNodeType]: string;
} = {
    datasetInput: 'دیتاست ورودی',
    datasetOutput: 'دیتاست خروجی',
    filter: 'فیلتر',
    join: 'الحاق',
};

export const pipelineNodeNumInputs: { [type in PipelineNodeType]: number } = {
    datasetInput: 0,
    datasetOutput: 1,
    filter: 1,
    join: 2,
};

export const pipelineNodeHasOutput: { [type in PipelineNodeType]: boolean } = {
    datasetInput: true,
    datasetOutput: false,
    filter: true,
    join: true,
};

export interface PipelineNode {
    id: number;
    name: string;
    type: PipelineNodeType;
    inputs: (number | null)[];
    position: { x: number; y: number };
}

export class Pipeline {
    nodes: PipelineNode[] = [];

    nodeAdded = new Subject<PipelineNode>();
    nodeEdited = new Subject<PipelineNode>();
    nodeRemoved = new Subject<PipelineNode>();

    constructor(public name: string) {}

    addNode(node: PipelineNode) {
        if (this.nodes.some((existing) => existing.id === node.id))
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
            if (inputs.length !== pipelineNodeNumInputs[type])
                throw new Error('invalid number of inputs');
        } else {
            inputs = new Array(pipelineNodeNumInputs[type]).fill(null);
        }

        const node: PipelineNode = {
            id: this.nextId,
            name: name,
            type: type,
            inputs: inputs,
            position: position,
        };

        this.addNode(node);
        return node.id;
    }

    private get nextId() {
        return Math.max(-1, ...this.nodes.map((node) => node.id)) + 1;
    }

    editNode(edited: PipelineNode) {
        const index = this.nodes.findIndex(
            (existing) => existing.id === edited.id
        );

        if (index < 0)
            throw new Error(
                'a node with the given id does not exist in the pipeline'
            );

        this.nodes[index] = edited;
        this.nodeEdited.next(edited);
    }

    markNodeAsEdited(id: number) {
        const node = this.nodes.find((existing) => existing.id === id);

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

    reorder() {
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
            if (!success) throw new Error('the pipeline is cyclic!');

            validDeps.push(this.nodes[j].id);
            moveItemInArray(this.nodes, i, j);
        }
    }

    export() {
        return {
            name: this.name,
            nodes: this.nodes,
        };
    }
}