export interface InputConfig {
    datasetId: number | null;
}

export interface OutputConfig {
    datasetId: number | null;
}

export interface FilterConfig {
    condition: string;
}

export interface SortOrder {
    name: string;
    descending: boolean;
}

export interface SortConfig {
    orders?: SortOrder[];
}
