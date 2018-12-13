import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import {siteName, fireBaseConfig } from './App_config'
import firebase from "firebase";

import './styles/index.css';
import App from './App';
import mainStateReducer from './store/reducers/mainStateReducer'
import authReducer from './store/reducers/authReducer'
import adminReducer from './store/reducers/adminReducer'
import * as serviceWorker from './serviceWorker';


firebase.initializeApp(fireBaseConfig);
var storage = firebase.storage();
var storageRef = storage.ref();
export var imagesRef = storageRef.child(siteName);
var dogeRef = imagesRef.child('doge.png')
console.log(imagesRef)
console.log(dogeRef)


const composeEnhancers = process.env.NODE_ENV === 'development'  ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    mainState: mainStateReducer ,
    auth: authReducer,
    admin: adminReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
