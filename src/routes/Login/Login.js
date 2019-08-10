import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './login.module.scss';
import { ajaxFetch } from '../../common/functions/ajaxFetch';
import { AppContext } from '../../context/AppContext';
import { setUser } from '../../context/actions';

export default function Login() {
  const { dispatch } = useContext(AppContext);
  const [usernameIsInvalid, setUsernameIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);

  const handleOnInput = ({ target: { id } }) => {
    if (id === 'username') {
      setUsernameIsInvalid(false);
    } else {
      setPasswordIsInvalid(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const {
      username: { value: username },
      password: { value: password }
    } = e.target;
    setUsernameIsInvalid(false);
    setPasswordIsInvalid(false);
    ajaxFetch('/api/login', {
      method: 'POST',
      body: { username, password },
      success: data => {
        if (!data.username) {
          return setUsernameIsInvalid(true);
        }
        if (!data.password) {
          return setPasswordIsInvalid(true);
        }
        dispatch(setUser(data));
      }
    });
  };

  return (
    <div className={`${styles.loginContainer} bg-dark`}>
      <Card className={`${styles.loginCard} ${styles.fadeInDown}`} body>
        <h2 className='text-center'>WhatShouldIDo?</h2>
        <h6 className='text-center pb-3'>Your one-stop todo app!</h6>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              onInput={handleOnInput}
              isInvalid={usernameIsInvalid}
              placeholder='hint, hint... clayton'
              required
            />
            <Form.Control.Feedback type='invalid'>Invalid username</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              onInput={handleOnInput}
              isInvalid={passwordIsInvalid}
              placeholder='wait for it... hcs'
              required
            />
            <Form.Control.Feedback type='invalid'>Invalid password</Form.Control.Feedback>
          </Form.Group>
          <Button variant='primary' type='submit' block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};
