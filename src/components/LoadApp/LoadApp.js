import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Login from '../../routes/Login/Login';
import TodoLanding from '../../routes/TodoLanding/TodoLanding';
import ConditionalRoute from '../ConditionalRoute/ConditionalRoute';
import styles from './loadApp.module.scss';
import { AppContext } from '../../context/AppContext';

export default function LoadApp() {
  const {
    state: { user }
  } = useContext(AppContext);
  // TODO Initial fetch for user todo list
  const initialFetch = true;
  return initialFetch ? (
    <Router>
      <Switch>
        <ConditionalRoute
          exact
          path='/login'
          component={Login}
          condition={!user._id}
          redirect={`/user/${user._id}`}
        />
        <ConditionalRoute
          path={`/user/${user._id}`}
          component={TodoLanding}
          condition={user._id}
          redirect={'/Login'}
        />
        <Redirect to='/login' />
      </Switch>
    </Router>
  ) : (
    <div className={styles.loadAppSpinner}>
      <Spinner animation='border' />
    </div>
  );
}
