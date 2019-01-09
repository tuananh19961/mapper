import * as types from './../constants/ActionType';

const initialState = {
    isRequest: false,
    isLoading: true,
    status: false,
    data: [],
    selected:{},
    messages: null
}

const Province = (state = initialState, action) => {
    switch(action.type){

        case types.FILLTER_RESET:
            return{
                ...state,
                selected: {}
            }
        case types.PROVINCE_REQUEST:
                return {
                ...state,
                isRequest: true,
            };

        case types.GET_LIST_PROVINCE:
            if (action.payload.isSuccess) {
                return {
                    ...state,
                    data: action.payload.data.data,
                    isRequest: false,
                    isLoading: false,
                    status:true,
                    messages: 'Load success!'
                };
                }
                else
                return {
                    ...state,
                    isRequest: false,
                    isLoading: false,
                    status:false,
                    messages: action.payload.data.messages
                };

            case types.GET_PROVINCE_SELECTED:
                return {
                    ...state,
                    selected: action.selected,
                };
                    
        default:
            return {...state}
    }
}

export default Province;