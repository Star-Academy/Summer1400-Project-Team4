import {
    DatasetInputNode,
    DatasetOutputNode,
    importPipelineNode,
    PipelineNodeType,
} from './pipeline-node.model';
import { Pipeline } from './pipeline.model';

export interface PipelineExport {
    id: number;
    name: string;
    inputDatasetId: number;
    inputDataset: string;
    outputDatasetId: number | null;
    outputDataset: string | null;
    processes: {
        id: number;
        name: string;
        type: PipelineNodeType;
        inputs: (number | null)[];
        position: { x: number; y: number };
        instruction: any;
    }[];
}

export function exportPipeline(pipeline: Pipeline): PipelineExport {
    const inputDatasetNodes = pipeline.nodes.filter(
        (node) => node.type === PipelineNodeType.datasetInput
    );
    if (inputDatasetNodes.length !== 1)
        throw new Error('only one input node is currently supported');

    const outputDatasetNodes = pipeline.nodes.filter(
        (node) => node.type === PipelineNodeType.datasetOutput
    );
    if (inputDatasetNodes.length > 1)
        throw new Error('at most one output node is currently supported');

    const inputDataset = inputDatasetNodes[0] as DatasetInputNode;
    const outputDataset = outputDatasetNodes[0] as
        | DatasetOutputNode
        | undefined;

    return {
        id: pipeline.id,
        name: pipeline.name,
        inputDatasetId: inputDataset.config.datasetId!,
        inputDataset: JSON.stringify(inputDataset.export()),
        outputDatasetId: outputDataset?.config.datasetId || null,
        outputDataset: outputDataset
            ? JSON.stringify(outputDataset.export())
            : null,
        processes: pipeline.nodes
            .filter(
                (node) =>
                    node.type !== PipelineNodeType.datasetInput &&
                    node.type !== PipelineNodeType.datasetOutput
            )
            .map((node) => node.export()),
    };
}

export function importPipeline(exported: PipelineExport) {
    const pipeline = new Pipeline(exported.id, exported.name);

    const inputDatasetExport = JSON.parse(exported.inputDataset);
    pipeline.addNode(importPipelineNode(inputDatasetExport));

    for (const node of exported.processes)
        pipeline.addNode(importPipelineNode(node));

    if (exported.outputDataset !== null) {
        const outputDatasetExport = JSON.parse(exported.outputDataset);
        pipeline.addNode(importPipelineNode(outputDatasetExport));
    }
}
