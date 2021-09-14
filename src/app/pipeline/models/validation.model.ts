export type ValidationErrorList = { [key: string]: string };

export function hasError(errors: ValidationErrorList) {
    return Object.keys(errors).length > 0;
}
