import { ID_ESTATE_ACTION, IdEstateAction } from './id.action';

const initialState = {
    id: 2
};

export const idEstateReducer = (state = initialState, action: IdEstateAction) => {
    switch (action.type) {
        case ID_ESTATE_ACTION.ADD_ID_ESTATE:
            const newState = {
                ...state,
                id: state.id + 1
            };

            return newState;
        default:
            return state;
    }
};
