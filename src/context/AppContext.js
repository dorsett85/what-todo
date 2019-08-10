import React, { useReducer } from 'react';
import { appReducer } from './reducer';

const initialState = {
  user: {},
  todos: []
};

export const AppContext = React.createContext(initialState);

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
  );
};
