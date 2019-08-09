import React from 'react';

export const initialState = {
  user: {},
  todos: []
}

export const AppContext = React.createContext(initialState);