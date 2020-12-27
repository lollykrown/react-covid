import {
    GET_ALL_SUCCESS,
    GET_ALL_FAILURE,
  } from '../actions/request';
  
  export const REQUEST_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
  };
  const requestReducer = (state, action) => {
    switch (action.type) {
      case GET_ALL_SUCCESS: {
        return {
          ...state,
          stats: action.stats,
          status: REQUEST_STATUS.SUCCESS,
        };
      }
      case GET_ALL_FAILURE: {
        return {
          ...state,
          status: REQUEST_STATUS.ERROR,
          error: action.error,
        };
      }
      default:
        return state;
    }
  };
  export default requestReducer;