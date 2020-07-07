import { Action } from '@ngrx/store';
import { Estate } from '../../models';

// tslint:disable-next-line: no-namespace
export namespace ESTATE_ACTION {
    export const ADD_ESTATE = 'ADD_ESTATE';
    export const EDIT_ESTATE = 'EDIT_ESTATE';
    export const DELETE_ESTATE = 'DELETE_ESTATE';
}

export class AddEstate implements Action {
    readonly type = ESTATE_ACTION.ADD_ESTATE;

    constructor(public payload: Estate) {}
}

export class EditEstate implements Action {
    readonly type = ESTATE_ACTION.EDIT_ESTATE;

    constructor(public payload: Estate) {}
}

export class DeleteEstate implements Action {
    readonly type = ESTATE_ACTION.DELETE_ESTATE;

    constructor(public payload: Estate) {}
}

export type EstateAction = AddEstate | EditEstate | DeleteEstate;
