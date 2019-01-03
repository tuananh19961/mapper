import * as types from './../constants/ActionType';

const initialState = {
    isRequest: false,
    isLoading: true,
    status: false,
    data: [],
    item_hover: {},
    item_selected:{},
    messages: null
}

const Motel = (state = initialState, action) => {
    switch (action.type) {
        case types.MOTEL_REQUEST:
            return {
                ...state,
                isRequest: true
            };

        case types.GET_MOTEL_DATA:
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
            
        case types.GET_MOTEL_ITEM_DATA:
            if (action.payload.isSuccess) {
                return {
                    ...state,
                    item_selected: action.payload.data.data,
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

        case types.ITEM_HOVER:
            return {
                ...state,
                item_hover: action.payload.data
            }

        case types.ON_MOUSE_OUT:
            return {
                ...state,
                item_hover: {}
            }

        case types.RESET_MOTEL_DATA:
            state.item_selected = {};
            return{
            ...state
            };

        default:
            return {
                ...state
            }
    }
}

export default Motel;