import {combineReducers } from 'redux';
import Motel from './Motel';
import District from './District';
import Province from './Province';

const reducers = combineReducers ({
    Motel
    ,District
    ,Province
});

export default reducers