import React, { memo, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Api } from '../../api/Api';
import { UserContext } from '../../context/UserContext';
import { addTodo, updateTodo } from '../../context/actions';
import { generateTime15MinSteps, toYYYYMMDD, toHHMM } from '../../common/functions/dateUtils';

const timeOptions = generateTime15MinSteps().map(time => (
  <option key={time} value={time}>
    {time}
  </option>
));

const TodoModal = props => {
  const { dispatch } = useContext(UserContext);
  const {
    action,
    handleOnHide,
    modalData: { _id, name, due_date },
    ...rest
  } = props;
  const defaultDate = toYYYYMMDD(due_date);
  const defaultTime = toHHMM(due_date);

  const handleOnSubmit = e => {
    e.preventDefault();
    let {
      name: { value: name },
      due_date: { value: due_date },
      due_time: { value: due_time }
    } = e.target;
    due_date = new Date(due_date + ' ' + due_time);

    if (action === 'Add') {
      Api.insertTodo({
        body: { name, due_date },
        success: data => {
          handleOnHide();
          dispatch(addTodo(data));
        }
      });
    } else if (action === 'Edit') {
      Api.updateTodo({
        body: { _id, name, due_date },
        success: data => {
          handleOnHide();
          dispatch(updateTodo(data));
        }
      });
    }
  };

  return (
    <Modal {...rest} onHide={handleOnHide}>
      <Modal.Header closeButton>
        <Modal.Title>{action} Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group controlId='name'>
            <Form.Label>
              <b>What do you need to do?</b>
            </Form.Label>
            <Form.Control placeholder='Todo name' defaultValue={name} required />
          </Form.Group>
          <Form.Label>
            <b>When's it due?</b>
          </Form.Label>
          <Row>
            <Col sm={6}>
              <Form.Group controlId='due_date'>
                <Form.Control type='date' defaultValue={defaultDate} required />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId='due_time'>
                <Form.Control as='select' defaultValue={defaultTime}>
                  {timeOptions}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button variant='success' type='submit'>
            {action}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default memo(TodoModal);
