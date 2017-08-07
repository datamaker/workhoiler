// Routes
import routes from './routes';
import configureStore from './store';

// React Package
import React from 'react';
import ReactHelmet from 'react-helmet';
import ReactCookie from 'react-cookie';

// Redux Package
import { Provider } from 'react-redux';

// clientOptions
const rootElement = 'root';

// Data that is populated by hooks during startup
let history;
let store;
let initialState;

const props = {
    onUpdate() {
        // Notify the page has been changed to Google Analytics
        //ga('send', 'pageview');
    }
};

// Create a react-helmat
const htmlHook = (html) => {
    const head = ReactHelmet.rewind();
    return html.replace('<head>', '<head>' + head.title + head.base + head.meta + head.link + head.script + head.noscript);
};

// Create a react-cookie
const preRender = (req, res) => {
    initialState = {
        authentication : {
            login : {
                status : 'INIT'
            },
            register : {
                status : 'INIT',
                error : -1
            },
            status : {
                valid : false,
                isLoggedIn : !!Meteor.userId(),
                currentUser : Meteor.user() ? Meteor.user() : ''
            }
        }
    };
    return ReactCookie.plugToRequest( req, res );
};

// Use history hook to get a reference to the history object
const historyHook = newHistory => history = newHistory;

// Pass the state of the store as the object to be dehydrated server side
const dehydrateHook = () => store.getState();

// Take the rehydrated state and use it as the initial state client side
const rehydrateHook = state => initialState = state;

// Create a redux store and pass into the redux Provider wrapper
const wrapperHook = app => {
    store = configureStore(initialState, history);
    return <Provider store={store}>{app}</Provider>;
};

const clientOptions = {rootElement, props, historyHook, rehydrateHook, wrapperHook};
const serverOptions = {htmlHook, preRender, historyHook, dehydrateHook};

ReactRouterSSR.Run(routes, clientOptions, serverOptions);