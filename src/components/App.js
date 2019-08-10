import React from 'react';
import LoadApp from './LoadApp/LoadApp';
import { Provider } from '../context/AppContext';

export default () => (
  <Provider>
    <LoadApp />
  </Provider>
);
