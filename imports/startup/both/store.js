import React from 'react';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../../reducers/index';

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export default function configureStore(initialState, history) {
  const middleware = routerMiddleware(history);
  return createStore(
        reducers,
        initialState,
        compose(
            composeEnhancers(
                applyMiddleware(
                    thunk,
                    middleware
                )
            )
        )
    );
}
