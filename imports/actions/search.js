import axios from 'axios';
import {
    SEARCH,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
} from './ActionTypes';

export function searchRequest(keyword) {
  return (dispatch) => {
    dispatch(search());

    return axios.get(`/api/account/search/${keyword}`)
        .then((response) => {
          dispatch(searchSuccess(response.data));
        }).catch((error) => {
          dispatch(searchFailure(error.response.data.code));
        });
  };
}

export function search() {
  return {
    type: SEARCH,
  };
}

export function searchSuccess(usernames) {
  return {
    type: SEARCH_SUCCESS,
    usernames,
  };
}

export function searchFailure(error) {
  return {
    type: SEARCH_FAILURE,
    error,
  };
}
