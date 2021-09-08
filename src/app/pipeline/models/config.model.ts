export interface InputConfig {
    datasetId?: number;
}

export interface OutputConfig {
    datasetId?: number;
}

export interface FilterConfig {
    condition: string;
}

export interface SortOrder {
    fieldName: string;
    descending: boolean;
}

export interface SortConfig {
    orders?: SortOrder[];
}

export enum JoinType {
    inner = 'inner join',
    left = 'left join',
    right = 'right join',
    full = 'full join',
}

export const joinTypeInfo: { [type in JoinType]: { title: string } } = {
    [JoinType.inner]: { title: 'الحاق داخلی' },
    [JoinType.left]: { title: 'الحاق از چپ' },
    [JoinType.right]: { title: 'الحاق از راست' },
    [JoinType.full]: { title: 'الحاق کامل' },
};

export interface JoinConfig {
    type: JoinType;
    joinWith?: number;
    leftTableKey: string;
    rightTableKey: string;
}

export enum AggregateOperationType {
    count = 'count',
    sum = 'sum',
    average = 'average',
    min = 'min',
    max = 'max',
}

export const aggregateTypeInfo: {
    [type in AggregateOperationType]: { title: string };
} = {
    [AggregateOperationType.count]: { title: 'شمارش' },
    [AggregateOperationType.sum]: { title: 'مجموع' },
    [AggregateOperationType.average]: { title: 'میانگین' },
    [AggregateOperationType.min]: { title: 'کمینه' },
    [AggregateOperationType.max]: { title: 'بیشینه' },
};

export interface AggregateOpertaion {
    fieldName: string;
    type: AggregateOperationType;
    outputName: string;
}

export interface AggregateConfig {
    groupBy: string[];
    operations: AggregateOpertaion[];
}
