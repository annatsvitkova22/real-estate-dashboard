import { Action } from '@ngrx/store';

// tslint:disable-next-line: no-namespace
export namespace ID_ESTATE_ACTION {
    export const ADD_ID_ESTATE = 'ADD_ID_ESTATE';
}

export class AddIdEstate implements Action {
    readonly type = ID_ESTATE_ACTION.ADD_ID_ESTATE;
}

export type IdEstateAction = AddIdEstate;
