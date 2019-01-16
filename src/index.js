import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder.js';
import orderReducer from './store/reducers/order.js';
import authReducer from './store/reducers/auth.js';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';

const rootReducer=combineReducers({
	burgerBuilder:burgerBuilderReducer,
	order:orderReducer,
	auth:authReducer});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(rootReducer,  composeEnhancers(applyMiddleware(thunk)));
const app=(
	<Provider store={store}>
	<BrowserRouter>
	<App/>
	</BrowserRouter>
	</Provider>
	);
ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
