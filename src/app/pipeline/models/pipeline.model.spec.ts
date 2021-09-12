import { Pipeline, PipelineNodeType } from './pipeline.model';

describe('Pipeline', () => {
    describe('reorder', () => {
        let pipeline: Pipeline;

        beforeEach(() => {
            pipeline = new Pipeline('');
        });

        it('preordered nodes', () => {
            const id1 = pipeline.createNode(
                'node1',
                PipelineNodeType.datasetInput
            );
            const id2 = pipeline.createNode(
                'node2',
                PipelineNodeType.aggregate,
                undefined,
                [id1]
            );
            const id3 = pipeline.createNode(
                'node3',
                PipelineNodeType.datasetOutput,
                undefined,
                [id2]
            );

            pipeline.reorder();

            expect(pipeline.nodes[0].name).toBe('node1');
            expect(pipeline.nodes[1].name).toBe('node2');
            expect(pipeline.nodes[2].name).toBe('node3');
        });

        it('in reverse order', () => {
            const id3 = pipeline.createNode(
                'node3',
                PipelineNodeType.datasetOutput
            );
            const id2 = pipeline.createNode(
                'node2',
                PipelineNodeType.aggregate
            );
            const id1 = pipeline.createNode(
                'node1',
                PipelineNodeType.datasetInput
            );

            pipeline.getNode(id2)!.node.inputs[0] = id1;
            pipeline.getNode(id3)!.node.inputs[0] = id2;

            pipeline.reorder();

            expect(pipeline.nodes[0].name).toBe('node1');
            expect(pipeline.nodes[1].name).toBe('node2');
            expect(pipeline.nodes[2].name).toBe('node3');
        });

        it('complicated', () => {
            const sort = pipeline.createNode('sort', PipelineNodeType.sort);
            const out1 = pipeline.createNode(
                'out1',
                PipelineNodeType.datasetOutput
            );
            const inp1 = pipeline.createNode(
                'imp1',
                PipelineNodeType.datasetInput
            );
            const aggr = pipeline.createNode(
                'aggr',
                PipelineNodeType.aggregate
            );
            const join = pipeline.createNode('join', PipelineNodeType.join);
            const out2 = pipeline.createNode(
                'out2',
                PipelineNodeType.datasetOutput
            );
            const filter = pipeline.createNode(
                'filter',
                PipelineNodeType.filter
            );
            const inp2 = pipeline.createNode(
                'imp2',
                PipelineNodeType.datasetInput
            );

            pipeline.getNode(filter)!.node.inputs = [inp1];
            pipeline.getNode(aggr)!.node.inputs = [inp2];
            pipeline.getNode(join)!.node.inputs = [filter, aggr];
            pipeline.getNode(out2)!.node.inputs = [join];
            pipeline.getNode(sort)!.node.inputs = [join];
            pipeline.getNode(out1)!.node.inputs = [sort];

            pipeline.reorder();

            expect(pipeline.getNode(filter)!.index).toBeGreaterThan(
                pipeline.getNode(inp1)!.index
            );
            expect(pipeline.getNode(aggr)!.index).toBeGreaterThan(
                pipeline.getNode(inp2)!.index
            );
            expect(pipeline.getNode(join)!.index).toBeGreaterThan(
                pipeline.getNode(filter)!.index
            );
            expect(pipeline.getNode(join)!.index).toBeGreaterThan(
                pipeline.getNode(aggr)!.index
            );
            expect(pipeline.getNode(out2)!.index).toBeGreaterThan(
                pipeline.getNode(join)!.index
            );
            expect(pipeline.getNode(sort)!.index).toBeGreaterThan(
                pipeline.getNode(join)!.index
            );
            expect(pipeline.getNode(out1)!.index).toBeGreaterThan(
                pipeline.getNode(sort)!.index
            );
        });

        it('cyclic', () => {
            const id4 = pipeline.createNode(
                'node4',
                PipelineNodeType.datasetOutput
            );
            const id3 = pipeline.createNode(
                'node3',
                PipelineNodeType.aggregate
            );
            const id2 = pipeline.createNode('node2', PipelineNodeType.join);
            const id1 = pipeline.createNode(
                'node1',
                PipelineNodeType.datasetInput
            );

            pipeline.getNode(id2)!.node.inputs = [id1, id3];
            pipeline.getNode(id3)!.node.inputs = [id2];
            pipeline.getNode(id4)!.node.inputs = [id3];

            expect(() => {
                pipeline.reorder();
            }).toThrowError();
        });
    });
});
