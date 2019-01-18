import * as types from './../constants/ActionType';
import {getTakenData , getDataByID, postData, getDataMiddleware, postDataMiddleware} from './../services/base-service';
import axios from 'axios';
import {api} from './../services/middleware-service';
import baseURL from './../constants/baseURL';

// USER ACTION
const userRequest = () => {
    return {type: types.USER_REQUEST}
}
const userLogin = (isSuccess, data, token) => {
    return {
        type: types.USER_LOGIN,
        payload: {
            isSuccess,
            data,
            token
        }
    }
}

const userLoginRequest = (data) => async dispatch => {
    dispatch(userRequest());
    try {
        const result = await postData('/api/auth/login',data);
        if (result.data.token) {  
            const user = await getDataMiddleware('user-info',result.data.token);
            dispatch(userLogin(true, user, result.data.token))
            return result;
        }
    } catch (e) {
        const error = e.response
            ? e.response
            : "Network Error!";
        dispatch(userLogin(false, error, null))
    }
};

// GET CURRENT USER IN LOCALSTORAGE
const userLoginLocal = (isSuccess, data) => {
    return {
        type: types.USER_LOCAL,
        payload: {
            isSuccess,
            data,
        }
    }
}
const getUserLocal = (token) => async dispatch => {
    try {
        const result = await getDataMiddleware('user-info', token);
        if (result) { 
            dispatch(userLoginLocal(true, result))
        }
    } catch (e) {
        const error = e.response
            ? e.response
            : "Network Error!";
            dispatch(userLoginLocal(false, error))
    }
};

// USER LOGOUT
const userLogout = (isSuccess, data) => {
    return {
        type: types.USER_LOGOUT,
        payload: {
            isSuccess,
            data
        }
    }
}
const userLogoutRequest = (token) => async dispatch => {
    try {
        const result = await axios.get(`/api/user-logout?token=${token}`);
        if (result) { 
            dispatch(userLogout(true, result))
        }
    } catch (e) {
        const error = e.response
            ? e.response
            : "Network Error!";
            dispatch(userLogout(false, error))
    }
};

// USER REGISTER


const userRegister = (isSuccess, data) => {
    return {
        type: types.USER_REGISTER,
        payload: {
            isSuccess,
            data
        }
    }
}

const userRegisterRequest = (data) => async dispatch => {
    dispatch(userRequest());
    try {
        const result = await postData('/api/auth/register',data);
        if (result) {  
            dispatch(userRegister(true, result));
        }
    } catch (e) {
        const error = e.response
            ? e.response
            : "Network Error!";
        dispatch(userRegister(false, error));
    }
};

export const UserAction = {
    userLoginRequest,
    getUserLocal,
    userLogoutRequest,
    userRegisterRequest
}

// PROVINCE ACTION
const provinceRequest = () => {
    return {type: types.PROVINCE_REQUEST}
}

// Get list province
const getProvince = (isSuccess, data) => {
    return {
        type: types.GET_LIST_PROVINCE,
        payload: {
            isSuccess,
            data
        }
    }
}

const getProvinceRequest = () => async dispatch => {
    dispatch(provinceRequest());
    try {
        const result = await getTakenData('/api/provinces');
        if (result) {
            dispatch(getProvince(true, result))
        }
    } catch (e) {
        const error = e.response
            ? e.response.data
            : {
                message: "Network Error!"
            };
        dispatch(getProvince(false, error))
    }
};
// Get province selected by fillter
const getProvinceSelected = (data) => {
    return {
        type: types.GET_PROVINCE_SELECTED,
        selected: data
    }
}

export const ProvinceAction = {
    getProvinceRequest,
    getProvinceSelected
}

// --- DISTRICT ACTION ---
const districtRequest = () => {
    return {type: types.DISTRICT_REQUEST}
}

const getDistrict = (isSuccess, data) => {
    return {
        type: types.GET_LIST_DISTRICT,
        payload: {
            isSuccess,
            data
        }
    }
}

const getDistrictRequest = (id) => async dispatch => {
    dispatch(districtRequest());
    try {
        const result = await getDataByID('/api/districts',id);
        if (result) {
            dispatch(getDistrict(true, result))
        }
    } catch (e) {
        const error = e.response
            ? e.response.data
            : {
                message: "Network Error!"
            };
        dispatch(getDistrict(false, error))
    }
};

// Get district selected by fillter
const getDistrictSelected = (data) => {
    return {
        type: types.GET_DISTRICT_SELECTED,
        selected: data
    }
}


export const DistrictAction = {
    getDistrictRequest,
    getDistrictSelected
}


// --- MOTEL ACTION ---
const motelRequest = () => {
    return {type: types.MOTEL_REQUEST}
}

const getMotel = (isSuccess, data) => {
    return {
        type: types.GET_MOTEL_DATA,
        payload: {
            isSuccess,
            data
        }
    }
}

const getMotelRequest = () => async dispatch => {
    dispatch(motelRequest());
    try {
        const result = await getTakenData('/api/motels');
        if (result) {
            dispatch(getMotel(true, result))
        }
    } catch (e) {
        const error = e.response
            ? e.response.data
            : {
                message: "Network Error!"
            };
        dispatch(getMotel(false, error))
    }
};

const getMotelItem = (isSuccess, data) => {
    return {
        type: types.GET_MOTEL_ITEM_DATA,
        payload: {
            isSuccess,
            data
        }
    }
}

const getMotelItemRequest = (id) => async dispatch => {
    dispatch(motelRequest());
    try {
        const result = await getDataByID('/api/motels',id);
        if (result) {
            dispatch(getMotelItem(true, result))
        }
    } catch (e) {
        const error = e.response
            ? e.response.data
            : {
                message: "Network Error!"
            };
        dispatch(getMotelItem(false, error))
    }
};

const onHoverItem = (data) => {
    return {
        type: types.ITEM_HOVER,
        payload: {
            data
        }
    }
} 

const onFillterReset = () => {
    return {
        type: types.FILLTER_RESET
    }
}

const onMouseOutItem = () => {
    return {
        type: types.ON_MOUSE_OUT,
    }
} 

const resetMotelData = () => {

    return {
        type: types.RESET_MOTEL_DATA
    }
}

// FILLTER BY PROVINCE ID
const getMotelByProvince = (isSuccess, data) => {
    return {
        type: types.GET_MOTEL_BY_PROVINCE,
        payload: {
            isSuccess,
            data
        }
    }
}

const getMotelByProvinceRequest = (province) => async dispatch => {
    dispatch(motelRequest());
    try {
        const result = await getDataByID('/api/motels/fillter',province);
        if (result) {
            dispatch(getMotelByProvince(true, result))
        }
    } catch (e) {
        const error = e.response
            ? e.response.data
            : {
                message: "Network Error!"
            };
        dispatch(getMotelByProvince(false, error))
    }
};

// FILLTER BY DISTRICT ID
const getMotelByDistrict = (isSuccess, data) => {
    return {
        type: types.GET_MOTEL_BY_DISTRICT,
        payload: {
            isSuccess,
            data
        }
    }
}

const getMotelByDistrictRequest = (province,district) => async dispatch => {
    dispatch(motelRequest());
    try {
        const result = await axios(`/api/motels/fillter/${province}/${district}`);
        if (result) {
            dispatch(getMotelByDistrict(true, result))
        }
    } catch (e) {
        const error = e.response
            ? e.response.data
            : {
                message: "Network Error!"
            };
        dispatch(getMotelByDistrict(false, error))
    }
};


const getListMotelTest =  () => async dispatch => {
    try {
        const url = baseURL.MOTEL_API;
        
        const result = await api().get(url);

        if (result) {
           console.log(result);
        }
    } catch (e) {
        const error = e.response
            ? e.response.data
            : {
                message: "Network Error!"
            };
            console.log('error',error);
    }
};

// USER UPLOAD NEW MOTEL
const uploadMotel = (isSuccess, data) => {
    return {
        type: types.USER_UPLOAD_MOTEL,
        payload: {
            isSuccess,
            data
        }
    }
}

const uploadMotelRequest = (data) => async dispatch => {
    dispatch(motelRequest());
    try {
        const url = baseURL.UPLOAD_MOTEL_API;
        const result = await postDataMiddleware(url,data);
        console.log(result);
        if (result) {
            // dispatch(uploadMotel(true, result))
        }
    } catch (e) {
        const error = e.response
            ? e.response.data
            : {
                message: "Network Error!"
            };
        // dispatch(uploadMotel(false, error))
    }
};

export const MotelAction = {
    getMotelRequest,
    onHoverItem,
    onMouseOutItem,
    getMotelItemRequest,
    resetMotelData,
    getMotelByProvinceRequest,
    getMotelByDistrictRequest,
    getListMotelTest,
    onFillterReset,
    uploadMotelRequest
}