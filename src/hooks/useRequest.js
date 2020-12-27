import React, { useReducer, useEffect } from 'react';
import requestReducer, { REQUEST_STATUS } from '../reducers/request';
import axios from 'axios';
import {
  GET_ALL_FAILURE,
  GET_ALL_SUCCESS,
} from '../actions/request';

const useRequest = (baseUrl, routeName) => {
  const [{ stats, status, error }, dispatch] = useReducer(requestReducer, {
    status: REQUEST_STATUS.LOADING,
    stats: {},
    error: null,
  });

  const signal = React.useRef(axios.CancelToken.source());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl, {
            headers: {
                "x-rapidapi-key": "",
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com"
              },
          cancelToken: signal.current.token,
        });
        localStorage.setItem('stats', JSON.stringify(response.data))
        dispatch({  
          type: GET_ALL_SUCCESS,
          stats: response.data,
        });
      } catch (e) {
        console.log('Loading data error', e);
        if (axios.isCancel(e)) {
          console.log('Get request canceled');
        } else {
          dispatch({
            type: GET_ALL_FAILURE,
            error: e,
          });
      }
      }
    };
    fetchData();
    return () => {
      console.log('unmount and cancel running axios request');
      signal.current.cancel();
    };
  }, [baseUrl, routeName]);

  const propsLocal = {
    stats,
    status,
    error
  };
  return propsLocal;
};

export default useRequest;