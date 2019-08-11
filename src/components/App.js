import React from 'react';
import LoadApp from './LoadApp/LoadApp';
import { Provider } from '../context/UserContext';

export default () => (
  <Provider>
    <LoadApp />
  </Provider>
);
