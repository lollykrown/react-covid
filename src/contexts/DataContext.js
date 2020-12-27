import React, { createContext } from 'react';
import {useRequest} from '../hooks/useRequest';

const DataContext = createContext();

const DataProvider = ({ children, baseUrl, routeName }) => {
  const localSt = JSON.parse(localStorage.getItem("stats"));

  const state = useRequest(baseUrl, routeName);
  return <DataContext.Provider value={state ? state : localSt}>{children}</DataContext.Provider>;
};

export { DataContext, DataProvider };