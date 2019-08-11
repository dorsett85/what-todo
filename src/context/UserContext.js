import React, { useReducer } from 'react';
import { userReducer } from './reducer';

const initialState = {};

export const UserContext = React.createContext(initialState);

export const Provider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ user, dispatch }}>{children}</UserContext.Provider>
  );
};
