import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavHeader from './NavHeader/NavHeader';
import ContentBody from './ContentBody/ContentBody';
import LoadApp from './LoadApp/LoadApp';
import { AppContext, initialState } from '../context/AppContext';

const App = () => (
  <AppContext.Provider value={initialState}>
    <LoadApp>
      <Router>
        <Route component={NavHeader} />
        <Route component={ContentBody} />
      </Router>
    </LoadApp>
  </AppContext.Provider>
);

export default App;
