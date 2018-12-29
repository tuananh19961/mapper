import * as types from './../constants/ActionType';
import {getTakenData , getDataByID} from './../services/base-service';
import axios from 'axios';

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
const getProvinceSelected = (isSuccess, data) => {
    return {
        type: types.GET_PROVINCE_SELECTED,
        payload: {
            isSuccess,
            data
        }
    }
}

const getProvinceSelectedRequest = (id) => async dispatch => {
    try {
        const result = await getDataByID('/api/provinces',id);
        if (result) {
            dispatch(getProvinceSelected(true, result))
        }
    } catch (e) {
        const error = e.response
            ? e.response.data
            : {
                message: "Network Error!"
            };
        dispatch(getProvinceSelected(false, error))
    }
};


export const ProvinceAction = {
    getProvinceRequest,
    getProvinceSelectedRequest
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
const getDistrictSelected = (isSuccess, data) => {
    return {
        type: types.GET_DISTRICT_SELECTED,
        payload: {
            isSuccess,
            data
        }
    }
}

const getDistrictSelectedRequest = (id) => async dispatch => {
    try {
        const result = await axios.get(`/api/districts/${id}/fillter`);
        if (result) {
            dispatch(getDistrictSelected(true, result))
        }
    } catch (e) {
        const error = e.response
            ? e.response.data
            : {
                message: "Network Error!"
            };
        dispatch(getDistrictSelected(false, error))
    }
};

export const DistrictAction = {
    getDistrictRequest,
    getDistrictSelectedRequest
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

const onMouseOutItem = () => {
    return {
        type: types.ON_MOUSE_OUT,
    }
} 

export const MotelAction = {
    getMotelRequest,
    onHoverItem,
    onMouseOutItem,
    getMotelItemRequest
}