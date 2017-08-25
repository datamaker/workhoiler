import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
    status: 'INIT',
    usernames: []
};

export default function search(state = initialState, action) {
    switch(action.type) {
        case types.SEARCH:
            return update(state, {
                status: { $set: 'WAITING' }
            });
        case types.SEARCH_SUCCESS:
            return update(state, {
                status: { $set: 'SUCCESS' },
                usernames: { $set: action.usernames }
            });
        case types.SEARCH_FAILURE:
            return update(state, {
                status: { $set: 'FAILURE' },
                error: { $set: action.error }
            });
        default:
            return state;
    }
}
