import {combineReducers } from 'redux';
import Motel from './Motel';
import District from './District';
import Province from './Province';
import User from './User';

const reducers = combineReducers ({
    Motel
    ,District
    ,Province
    ,User
});

export default reducers