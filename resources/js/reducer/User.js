import * as types from './../constants/ActionType';

const initialState = {
    isRequest: false,
    isLoading: true,
    status: false,
    register_status: false,
    data: {},
    messages: null,
    register_messages: null
}

const User = (state = initialState, action) => {
    switch(action.type){
        case types.USER_REQUEST:
                return {
                    ...state,
                    isRequest: true,
                };
        case types.USER_LOGIN:
            if (action.payload.isSuccess) {
                localStorage.setItem('access_token',action.payload.token);
                return {
                    ...state,
                    data: action.payload.data.data.result,
                    isRequest: false,
                    isLoading: false,
                    status:true,
                    messages: null
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

        case types.USER_LOCAL:
                if (action.payload.isSuccess) {
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

        case types.USER_LOGOUT:
                if (action.payload.isSuccess) {
                    localStorage.removeItem('access_token');
                    return {
                        ...state,
                        data: {},
                        isRequest: false,
                        isLoading: false,
                        status:false,
                    };
                    }
                    else
                    return {
                        ...state,
                        isRequest: false,
                        isLoading: false,
                        status:false,
                    };  
        
        case types.USER_REGISTER:
                    if (action.payload.isSuccess) {
                        return {
                            ...state,
                            isRequest: false,
                            isLoading: false,
                            register_status:true,
                            register_messages: action.payload.data.data.message
                        };
                        }
                        else
                        return {
                            ...state,
                            isRequest: false,
                            isLoading: false,
                            register_status:false,
                            register_messages: action.payload.data.data.error
                        };

        default:
            return {...state};
    }
}

export default User;