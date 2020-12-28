import { useReducer, useEffect, useRef } from 'react';
import requestReducer, { REQUEST_STATUS } from '../reducers/request';
import axios from 'axios';
import {
  GET_ALL_FAILURE,
  GET_ALL_SUCCESS,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAILURE,
  GET_ALL_COUNTRIES_SUCCESS,
  GET_ALL_COUNTRIES_FAILURE
} from '../actions/request';

const useRequest = (baseUrl, routeName) => {
  const [{ stats, status, error }, dispatch] = useReducer(requestReducer, {
    status: REQUEST_STATUS.LOADING,
    stats: {},
    error: null,
  });

  const signal = useRef(axios.CancelToken.source());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${routeName}`, {
            headers: {
                "x-rapidapi-key": process.env.REACT_APP_API,
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "useQueryString": true
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

const useRequestCountries = (baseUrl, count) => {
  const [{ countries, status, error }, dispatch] = useReducer(requestReducer, {
    status: REQUEST_STATUS.LOADING,
    countries:[],
    error: null,
  });

  const signal = useRef(axios.CancelToken.source());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${count}`, {
            headers: {
                "x-rapidapi-key": process.env.REACT_APP_API,
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "useQueryString": true
              },
          cancelToken: signal.current.token,
        });
        // console.log('countries',response.data);
        dispatch({  
          type: GET_COUNTRIES_SUCCESS,
          countries: response.data.affected_countries,
        });
      } catch (e) {
        console.log('Loading data error', e);
        if (axios.isCancel(e)) {
          console.log('Get request canceled');
        } else {
          dispatch({
            type: GET_COUNTRIES_FAILURE,
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
  }, [baseUrl, count]);

  const propsLocal = {
    countries,
    status,
    error
  };
  return propsLocal;
};

const useRequestDetails = (baseUrl, countryCases) => {
  const [{ countriesCases, status, error }, dispatch] = useReducer(requestReducer, {
    status: REQUEST_STATUS.LOADING,
    countriesCases:[],
    error: null,
  });

  const signal = useRef(axios.CancelToken.source());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${countryCases}`, {
            headers: {
                "x-rapidapi-key": process.env.REACT_APP_API,
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "useQueryString": true
              },
          cancelToken: signal.current.token,
        });
        console.log('countries cases',response.data);
        dispatch({  
          type: GET_ALL_COUNTRIES_SUCCESS,
          countriesCases: response.data,
        });
      } catch (e) {
        console.log('Loading data error', e);
        if (axios.isCancel(e)) {
          console.log('Get request canceled');
        } else {
          dispatch({
            type: GET_ALL_COUNTRIES_FAILURE,
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
  }, [baseUrl, countryCases]);

  const propsLocal = {
    countriesCases,
    status,
    error
  };
  return propsLocal;
};

export { useRequest, useRequestDetails };