import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';
import {
    DatasetField,
    findField,
    hasField,
} from 'src/app/models/dataset.model';
import { DatasetStore } from '../services/dataset-store';
import {
    AggregateConfig,
    AggregateOperationType,
    FilterConfig,
    InputConfig,
    JoinConfig,
    JoinType,
    OutputConfig,
    SortConfig,
} from './config.model';
import { Pipeline } from './pipeline.model';
import { ValidationErrorList } from './validation.model';

export enum PipelineNodeType {
    datasetInput = 'dataset_input',
    datasetOutput = 'dataset_output',
    filter = 'filter',
    sort = 'sort',
    join = 'join',
    aggregate = 'aggregate',
}

export interface PipelineNodeInfo {
    type: PipelineNodeType;
    title: string;
    altTitle: string;
    numInputs: number;
    hasOutput: boolean;
    iconName: string;
    iconMirrored: boolean;
}

export const pipelineNodeInfo: {
    [type in PipelineNodeType]: PipelineNodeInfo;
} = {
    [PipelineNodeType.datasetInput]: {
        type: PipelineNodeType.datasetInput,
        title: 'دیتاست ورودی',
        altTitle: '',
        numInputs: 0,
        hasOutput: true,
        iconName: 'file_download',
        iconMirrored: false,
    },
    [PipelineNodeType.datasetOutput]: {
        type: PipelineNodeType.datasetOutput,
        title: 'دیتاست خروجی',
        altTitle: '',
        numInputs: 1,
        hasOutput: false,
        iconName: 'publish',
        iconMirrored: false,
    },
    [PipelineNodeType.sort]: {
        type: PipelineNodeType.sort,
        title: 'مرتب‌سازی',
        altTitle: 'Sort',
        numInputs: 1,
        hasOutput: true,
        iconName: 'sort_by_alpha',
        iconMirrored: false,
    },
    [PipelineNodeType.filter]: {
        type: PipelineNodeType.filter,
        title: 'فیلتر',
        altTitle: 'Filter',
        numInputs: 1,
        hasOutput: true,
        iconName: 'filter_alt',
        iconMirrored: false,
    },
    [PipelineNodeType.join]: {
        type: PipelineNodeType.join,
        title: 'الحاق',
        altTitle: 'Join',
        numInputs: 1,
        hasOutput: true,
        iconName: 'merge_type',
        iconMirrored: false,
    },
    [PipelineNodeType.aggregate]: {
        type: PipelineNodeType.aggregate,
        title: 'تجمیع',
        altTitle: 'Aggregate',
        numInputs: 1,
        hasOutput: true,
        iconName: 'stacked_bar_chart',
        iconMirrored: true,
    },
};

export abstract class PipelineNode {
    typeInfo: PipelineNodeInfo;
    validations = new ReplaySubject<ValidationErrorList>(1);
    inputFields: BehaviorSubject<DatasetField[]>[] = [];
    outputFields = new BehaviorSubject<DatasetField[]>([]);

    constructor(
        public id: number,
        public name: string,
        public type: PipelineNodeType,
        public position: { x: number; y: number },
        public inputs: (number | null)[]
    ) {
        this.typeInfo = pipelineNodeInfo[type];

        for (const index in inputs)
            this.inputFields.push(new BehaviorSubject<DatasetField[]>([]));
    }

    async updateFields(pipeline: Pipeline, store: DatasetStore) {
        await this.updateInputFields(pipeline, store);
        await this.updateOutputFields(pipeline, store);
    }

    async updateInputFields(pipeline: Pipeline, store: DatasetStore) {
        for (const i in this.inputs) {
            if (this.inputs[i] === null) continue;

            const node = pipeline.getNode(this.inputs[i]!);
            if (node === undefined) continue;

            this.inputFields[i].next(node.node.outputFields.value);
        }
    }

    abstract updateOutputFields(
        pipeline: Pipeline,
        store: DatasetStore
    ): Promise<void>;

    async validate(
        pipeline: Pipeline,
        store: DatasetStore
    ): Promise<ValidationErrorList> {
        let errors = {
            ...(await this.validateInputs(pipeline)),
            ...(await this.validateConfig(pipeline, store)),
        };

        this.validations.next(errors);
        return errors;
    }

    async validateInputs(pipeline: Pipeline): Promise<ValidationErrorList> {
        if (
            this.inputs.some(
                (id) => id === null || pipeline.getNode(id) === undefined
            )
        )
            return { inputs: 'ورودی این گره به گره دیگری متصل نشده است' };
        return {};
    }

    abstract validateConfig(
        pipeline: Pipeline,
        store: DatasetStore
    ): Promise<ValidationErrorList>;

    export() {
        return {
            nodeId: this.id,
            name: this.name,
            type: this.type,
            position: JSON.stringify(this.position),
            inputs: JSON.stringify(this.inputs),
            instruction: JSON.stringify(this.exportConfig()),
        };
    }

    exportConfig(): any {}
}

export class DatasetInputNode extends PipelineNode {
    config: InputConfig;

    constructor(
        public id: number,
        public name: string,
        public position: { x: number; y: number },
        public inputs: (number | null)[],
        config?: InputConfig
    ) {
        super(id, name, PipelineNodeType.datasetInput, position, inputs);

        this.config = config || {};
    }

    async updateOutputFields(pipeline: Pipeline, store: DatasetStore) {
        if (this.config.datasetId !== undefined) {
            const details = await store
                .getFields(this.config.datasetId)
                .pipe(first())
                .toPromise();
            this.outputFields.next(details.fields);
        }
    }

    async validateConfig(pipeline: Pipeline, store: DatasetStore) {
        let errors: ValidationErrorList = {};
        if (this.config.datasetId === undefined)
            errors.datasetId = 'دیتاست ورودی انتخاب نشده است';
        return errors;
    }

    exportConfig() {
        return {
            datasetId: this.config.datasetId,
        };
    }

    static importConfig(exported: any): InputConfig {
        return {
            datasetId: exported.datasetId,
        };
    }
}

export class DatasetOutputNode extends PipelineNode {
    config: OutputConfig;

    constructor(
        public id: number,
        public name: string,
        public position: { x: number; y: number },
        public inputs: (number | null)[],
        config?: OutputConfig
    ) {
        super(id, name, PipelineNodeType.datasetOutput, position, inputs);

        this.config = config || {
            overwrite: false,
        };
    }

    async updateOutputFields(pipeline: Pipeline, store: DatasetStore) {}

    async validateConfig(pipeline: Pipeline, store: DatasetStore) {
        let errors: ValidationErrorList = {};
        if (this.config.datasetId === undefined)
            errors.datasetId = 'دیتاست خروجی انتخاب نشده است';
        return errors;
    }

    exportConfig() {
        return {
            datasetId: this.config.datasetId,
            overwrite: this.config.overwrite,
        };
    }

    static importConfig(exported: any): OutputConfig {
        return {
            datasetId: exported.datasetId,
            overwrite: exported.overwrite,
        };
    }
}

export class SortNode extends PipelineNode {
    config: SortConfig;

    constructor(
        public id: number,
        public name: string,
        public position: { x: number; y: number },
        public inputs: (number | null)[],
        config?: SortConfig
    ) {
        super(id, name, PipelineNodeType.sort, position, inputs);

        this.config = config || { orders: [] };
    }

    async updateOutputFields(pipeline: Pipeline, store: DatasetStore) {
        this.outputFields.next(this.inputFields[0].value);
    }

    async validateConfig(pipeline: Pipeline, store: DatasetStore) {
        let errors: ValidationErrorList = {};

        // for (const i in this.config.orders) {
        //     if (
        //         !hasField(
        //             this.inputFields[0].value,
        //             this.config.orders[i].fieldName
        //         )
        //     )
        //         errors[`orders[${i}].fieldName`] = 'این فیلد وجود ندارد';
        // }

        return errors;
    }

    exportConfig() {
        return {
            orders: this.config.orders,
        };
    }

    static importConfig(exported: any): SortConfig {
        return {
            orders: exported.orders,
        };
    }
}

export class FilterNode extends PipelineNode {
    config: FilterConfig;

    constructor(
        public id: number,
        public name: string,
        public position: { x: number; y: number },
        public inputs: (number | null)[],
        config?: FilterConfig
    ) {
        super(id, name, PipelineNodeType.filter, position, inputs);

        this.config = config || { Command: '=' };
    }

    async updateOutputFields(pipeline: Pipeline, store: DatasetStore) {
        this.outputFields.next(this.inputFields[0].value);
    }

    async validateConfig(pipeline: Pipeline, store: DatasetStore) {
        let errors: ValidationErrorList = {};
        // TODO!
        return errors;
    }

    exportConfig() {
        return this.config;
    }

    static importConfig(exported: any): FilterConfig {
        return exported;
    }
}

export class JoinNode extends PipelineNode {
    config: JoinConfig;

    constructor(
        public id: number,
        public name: string,
        public position: { x: number; y: number },
        public inputs: (number | null)[],
        config?: JoinConfig
    ) {
        super(id, name, PipelineNodeType.join, position, inputs);

        this.config = config || {
            type: JoinType.inner,
            joinWith: undefined,
            leftTableKey: '',
            rightTableKey: '',
        };

        this.inputFields.push(new BehaviorSubject<DatasetField[]>([]));
    }

    async updateOutputFields(pipeline: Pipeline, store: DatasetStore) {
        let fields = this.inputFields[0].value;

        if (this.config.joinWith !== undefined) {
            const details = await store
                .getFields(this.config.joinWith)
                .pipe(first())
                .toPromise();
            fields = fields.concat(details.fields);
        }

        this.outputFields.next(fields);
    }

    async validateConfig(pipeline: Pipeline, store: DatasetStore) {
        let errors: ValidationErrorList = {};

        if (this.config.joinWith === undefined)
            errors.joinWith = 'دیتاست برای الحاق انتخاب نشده است';
        // if (hasField(this.inputFields[0].value, this.config.leftTableKey))
        //     errors.leftTableKey = 'این فیلد وجود ندارد';
        // if (hasField(this.inputFields[1].value, this.config.rightTableKey))
        //     errors.rightTableKey = 'این فیلد وجود ندارد';

        return errors;
    }

    exportConfig() {
        return {
            type: this.config.type,
            joinWith: this.config.joinWith,
            leftTableKey: this.config.leftTableKey,
            rightTableKey: this.config.rightTableKey,
        };
    }

    static importConfig(exported: any): JoinConfig {
        return {
            type: exported.type,
            joinWith: exported.joinWith,
            leftTableKey: exported.leftTableKey,
            rightTableKey: exported.rightTableKey,
        };
    }
}

export class AggregateNode extends PipelineNode {
    config: AggregateConfig;

    constructor(
        public id: number,
        public name: string,
        public position: { x: number; y: number },
        public inputs: (number | null)[],
        config?: AggregateConfig
    ) {
        super(id, name, PipelineNodeType.aggregate, position, inputs);

        this.config = config || {
            groupBy: [],
            operations: [],
        };
    }

    async updateOutputFields(pipeline: Pipeline, store: DatasetStore) {
        const groupByFields = this.config.groupBy.reduce((fields, name) => {
            const field = findField(this.inputFields[0].value, name);
            if (field !== undefined) fields.push(field);
            return fields;
        }, [] as DatasetField[]);

        const aggregateFields = this.config.operations.reduce(
            (fields, operation) => {
                const field = findField(
                    this.inputFields[0].value,
                    operation.fieldName
                );
                if (field !== undefined)
                    fields.push({
                        name: operation.outputFieldName,
                        type: field.type,
                    });
                return fields;
            },
            [] as DatasetField[]
        );

        const fields = groupByFields.concat(aggregateFields);
        this.outputFields.next(fields);
    }

    async validateConfig(pipeline: Pipeline, store: DatasetStore) {
        let errors: ValidationErrorList = {};

        // for (const i in this.config.groupBy) {
        //     if (!hasField(this.inputFields[0].value, this.config.groupBy[i]))
        //         errors[`groupBy[${i}]`] = 'این فیلد وجود ندارد';
        // }

        // for (const i in this.config.operations) {
        //     const field = findField(
        //         this.inputFields[0].value,
        //         this.config.operations[i].fieldName
        //     );

        //     if (field === undefined)
        //         errors[`operations[${i}].fieldName`] = 'این فیلد وجود ندارد';
        //     else if (
        //         field.type !== 'number' &&
        //         this.config.operations[i].type !== AggregateOperationType.count
        //     )
        //         errors[`operations[${i}].type`] =
        //             'این عمل تنها روی فیلد عددی قابل استفاده است';
        // }

        return errors;
    }

    exportConfig() {
        return this.config;
    }

    static importConfig(exported: any): AggregateConfig {
        return {
            groupBy: exported.groupBy,
            operations: exported.operations,
        };
    }
}

export const nodeClasses = {
    [PipelineNodeType.datasetInput]: DatasetInputNode,
    [PipelineNodeType.datasetOutput]: DatasetOutputNode,
    [PipelineNodeType.sort]: SortNode,
    [PipelineNodeType.filter]: FilterNode,
    [PipelineNodeType.join]: JoinNode,
    [PipelineNodeType.aggregate]: AggregateNode,
};

export function importPipelineNode(exported: {
    nodeId: number;
    name: string;
    type: PipelineNodeType;
    inputs: string;
    position: string;
    instruction: any;
}): PipelineNode {
    const type = nodeClasses[exported.type as PipelineNodeType];
    const config = type.importConfig(JSON.parse(exported.instruction));
    const node = new type(
        exported.nodeId,
        exported.name,
        JSON.parse(exported.position),
        JSON.parse(exported.inputs),
        config as any
    );
    return node;
}
