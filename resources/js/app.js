import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './layouts/client/Home';

ReactDOM.render(
	<Provider store={store}>
			<Router>		
				<Switch>
					<Route component={Home} path="/"/>
				</Switch>	
			</Router>
	</Provider>, document.getElementById('app'));