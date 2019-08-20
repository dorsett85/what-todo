import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import EntryPage from '../../components/EntryPage/EntryPage';
import functional from '../../common/css/functional.module.scss';
import { Api } from '../../api/Api';
import { UserContext } from '../../context/UserContext';
import { setUser } from '../../context/actions';
import githubImg from '../../common/img/GitHub-Mark-32px.png';

export default function Login({ history }) {
  const { dispatch } = useContext(UserContext);
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);
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
    Api.login({
      body: { username, password },
      success: data => {
        if (!data.username) {
          return setUsernameIsInvalid(true);
        }
        if (!data.password) {
          return setPasswordIsInvalid(true);
        }
        setUsernameIsValid(true);
        setPasswordIsValid(true);
        setTimeout(() => dispatch(setUser(data)), 500);
      }
    });
  };

  const handleToRegisterClick = () => {
    history.push('/register');
  }

  const handleGithubClick = () => {
    window.open('https://github.com/dorsett85/what-todo', '_blank');
  };

  return (
    <EntryPage>
      <h2 className='text-center'>WhatTodo?</h2>
      <h6 className='text-center pb-3'>Your one-stop todo app!</h6>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            onInput={handleOnInput}
            isValid={usernameIsValid}
            isInvalid={usernameIsInvalid}
            placeholder='enter username...'
            required
          />
          <Form.Control.Feedback type='invalid'>Invalid username</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            onInput={handleOnInput}
            isValid={passwordIsValid}
            isInvalid={passwordIsInvalid}
            placeholder='enter password...'
            required
          />
          <Form.Control.Feedback type='invalid'>Invalid password</Form.Control.Feedback>
        </Form.Group>
        <Button variant='primary' type='submit' block>
          Login
        </Button>
        <Button variant='secondary' onClick={handleToRegisterClick} block>
          Register
        </Button>
      </Form>
      <div className='text-center pt-3' onClick={handleGithubClick}>
        <img src={githubImg} className={functional.cursorPointer} alt='github-img' />
      </div>
    </EntryPage>
  );
}
