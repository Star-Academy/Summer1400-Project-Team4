import { InputConfig, OutputConfig } from './config.model';
import { Pipeline, PipelineNodeType } from './pipeline.model';

export interface PipelineExport {
    id: number;
    name: string;
    inputDatasetId: number;
    inputDataset: {
        id: number;
        name: string;
        inputs: (number | null)[];
        position: { x: number; y: number };
    };
    outputDatasetId: number | null;
    outputDataset: {
        id: number;
        name: string;
        inputs: (number | null)[];
        position: { x: number; y: number };
    } | null;
    processes: object[];
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

    return {
        id: pipeline.id,
        name: pipeline.name,
        inputDatasetId: (inputDatasetNodes[0].config as InputConfig).datasetId!,
        inputDataset: {
            id: inputDatasetNodes[0].id,
            name: inputDatasetNodes[0].name,
            inputs: inputDatasetNodes[0].inputs,
            position: inputDatasetNodes[0].position,
        },
        outputDatasetId:
            outputDatasetNodes.length > 0
                ? (outputDatasetNodes[0].config as OutputConfig).datasetId ||
                  null
                : null,
        outputDataset:
            outputDatasetNodes.length > 0
                ? {
                      id: outputDatasetNodes[0].id,
                      name: outputDatasetNodes[0].name,
                      inputs: outputDatasetNodes[0].inputs,
                      position: outputDatasetNodes[0].position,
                  }
                : null,
        processes: pipeline.nodes
            .filter(
                (node) =>
                    node.type !== PipelineNodeType.datasetInput &&
                    node.type !== PipelineNodeType.datasetOutput
            )
            .map((node) => ({
                id: node.id,
                name: node.name,
                type: node.type,
                inputs: node.inputs,
                position: node.position,
                instruction: JSON.stringify(node.config),
            })),
    };
}

export function importPipeline(exported: PipelineExport) {
    throw new Error('Method not implemented!');
}
