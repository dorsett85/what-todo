import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Login from '../../routes/Login/Login';
import Register from '../../routes/Register/Register';
import TodoLanding from '../../routes/TodoLanding/TodoLanding';
import ConditionalRoute from '../ConditionalRoute/ConditionalRoute';
import styles from './loadApp.module.scss';
import animations from '../../common/css/animations.module.scss';
import { UserContext } from '../../context/UserContext';
import { Api } from '../../api/Api';
import { setUser } from '../../context/actions';

export default function LoadApp() {
  const { user, dispatch } = useContext(UserContext);
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    (async () => {
      await Api.initialLoad(data => {
        dispatch(setUser(data));
      });
      setInitialLoad(true);
    })();
  }, [dispatch]);

  return initialLoad ? (
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
          exact
          path='/register'
          component={Register}
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
    <div className={`${styles.loadAppSpinner} ${animations.delayShow}`}>
      <Spinner animation='border' />
    </div>
  );
}
