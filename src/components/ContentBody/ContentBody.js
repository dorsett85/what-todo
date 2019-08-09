import React from 'react';
import Login from '../../routes/Login/Login';
import TodoLanding from '../../routes/TodoLanding/TodoLanding';
import { Container } from 'react-bootstrap';

/**
 * Check if the user is logged in
 * @param  {string}  pathname - url pathname
 * @return {boolean}
 */
const showLogin = pathname => {
  return ['/', '/login'].includes(pathname);
};

const contentBody = props => {
  return (
    <Container className='pt-5'>
      {showLogin(props.location.pathname) ? <Login /> : <TodoLanding />}
    </Container>
  );
};

export default contentBody;
