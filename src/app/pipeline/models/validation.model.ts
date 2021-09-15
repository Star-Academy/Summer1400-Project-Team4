import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';

export type ValidationErrorList = { [key: string]: string };

export function hasError(errors: ValidationErrorList) {
    return Object.keys(errors).length > 0;
}

export function listErrors(errors: ValidationErrorList) {
    return Object.keys(errors).map((key) => ({ key: key, value: errors[key] }));
}
