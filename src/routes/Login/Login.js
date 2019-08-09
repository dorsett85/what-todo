import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import animations from '../../common/css/animations.module.scss';

const Login = props => {
  return (
    <Row className={animations.fadeIn}>
      <Col xs={12} sm={{span: 8, offset: 2 }} md={{span: 6, offset: 3}} lg={{span: 4, offset: 4}}>
        <h3 className='text-center pb-3'>Login</h3>
        <Form>
          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder='hint, hint... clayton' />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='wait for it... hcs' />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
