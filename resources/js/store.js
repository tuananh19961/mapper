import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import reducers from "./reducer/index";
import { createStore, applyMiddleware } from 'redux';


export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));