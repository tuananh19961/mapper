import * as types from './../constants/ActionType';

const initialState = {
    isRequest: false,
    isLoading: true,
    status: false,
    data: [],
    selected: {},
    messages: null
}

const District = (state = initialState, action) => {
    switch (action.type) {
        case types.DISTRICT_REQUEST:
            return {
                ...state,
                isRequest: true
            };
        case types.FILLTER_RESET:
            return{
                ...state,
                selected: {}
            }
        case types.GET_LIST_DISTRICT:
            if (action.payload.isSuccess) {
                return {
                    ...state,
                    data: action.payload.data.data,
                    selected: {},
                    isRequest: false,
                    isLoading: false,
                    status: true,
                    messages: 'Load success!'
                };
            } else 
                return {
                    ...state,
                    isRequest: false,
                    isLoading: false,
                    status: false,
                    messages: action.payload.data.messages
                };

            case types.GET_DISTRICT_SELECTED:
            
                return {
                    ...state,
                    selected: action.selected,
                }

            default:
            return {
                ...state
            }
    }
}

export default District;