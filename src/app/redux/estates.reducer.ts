import { Estate } from '../..//models';
import { ESTATE_ACTION, EstateAction } from './estate.action';

const initialState = {
    estates: [
        new Estate ('title', '12.12.12', 'info', false, 1),
        new Estate ('title', '10.10.10', 'info', true, 2),
    ]
};

export const estateReducer = (state = initialState, action: EstateAction) => {
    switch (action.type) {
        case ESTATE_ACTION.ADD_ESTATE:
            const newState = {
                ...state,
                estates: [...state.estates, action.payload]
            };

            return newState;
        case ESTATE_ACTION.EDIT_ESTATE:
            const { payload } = action;
            const updateState = {
                ...state,
                estates: state.estates.map(estate => {
                    if (estate.id === payload.id) {
                        const updatedEstate = new Estate (estate.name, estate.date, estate.model, !payload.isSold, estate.id);

                        return updatedEstate;
                    }
                    return estate;
                })
            };

            return updateState;
        case ESTATE_ACTION.DELETE_ESTATE:
            const updatedState = {
                ...state,
                ...{estates: state.estates.filter(es => es.id !== action.payload.id)}
            };

            return updatedState;
        default:
            return state;
    }
}
