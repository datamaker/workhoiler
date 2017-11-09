import React from 'react';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../../reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

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
