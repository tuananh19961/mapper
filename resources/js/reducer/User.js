import * as types from './../constants/ActionType';

const initialState = {
    isRequest: false,
    isLoading: true,
    status: false,
    data: {},
    messages: null
}

const User = (state = initialState, action) => {
    switch(action.type){
        case types.USER_LOGIN:
            if (action.payload.isSuccess) {
                localStorage.setItem('access_token',action.payload.token);
                return {
                    ...state,
                    data: action.payload.data.data.result,
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
                    messages: action.payload.data.data[0]
                };

        default:
            return {...state};
    }
}

export default User;