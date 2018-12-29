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
            
        case types.GET_LIST_DISTRICT:
            if (action.payload.isSuccess) {
                return {
                    ...state,
                    data: action.payload.data.data,
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
            if (action.payload.isSuccess) {
                return {
                    ...state,
                    selected: action.payload.data.data,
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

            default:
            return {
                ...state
            }
    }
}

export default District;