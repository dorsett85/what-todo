import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import EntryPage from '../../components/EntryPage/EntryPage';
import { Api } from '../../api/Api';
import { UserContext } from '../../context/UserContext';
import { setUser } from '../../context/actions';

export default function Register({ history }) {
  const { dispatch } = useContext(UserContext);
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [usernameIsInvalid, setUsernameIsInvalid] = useState(false);

  const handleOnInput = ({ target: { id } }) => {
    if (id === 'username') {
      setUsernameIsInvalid(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const {
      username: { value: username },
      password: { value: password }
    } = e.target;
    Api.register({
      body: { username, password },
      success: data => {
        if (data.exists) {
          return setUsernameIsInvalid(true);
        }
        setUsernameIsValid(true);
        setPasswordIsValid(true);
        setTimeout(() => dispatch(setUser(data)), 500);
      }
    });
  };

  const handleToLoginClick = () => {
    history.push('/login');
  }

  return (
    <EntryPage>
    <h2 className='text-center'>
      <strong>WhatTodo?</strong>
    </h2>
    <h6 className='text-center pb-3'>Create Account</h6>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            onInput={handleOnInput}
            isValid={usernameIsValid}
            isInvalid={usernameIsInvalid}
            placeholder='enter username...'
            minLength={4}
            maxLength={12}
            required
          />
          <Form.Control.Feedback type='invalid'>Username already exists</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            onInput={handleOnInput}
            isValid={passwordIsValid}
            placeholder='enter password...'
            minLength={4}
            maxLength={12}
            required
          />
        </Form.Group>
        <Button variant='success' type='submit' block>
          Register
        </Button>
        <Button variant='secondary' onClick={handleToLoginClick} block>
          Back to login
        </Button>
      </Form>
    </EntryPage>
  );
}
