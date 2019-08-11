import React, { memo, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Api } from '../../api/Api';
import { UserContext } from '../../context/UserContext';
import { addTodo, updateTodo } from '../../context/actions';
import { toYYYYMMDD } from '../../common/functions/dateUtils';

const TodoModal = props => {
  const { dispatch } = useContext(UserContext);
  const {
    action,
    handleOnHide,
    modalData: { _id, name, due_date },
    ...rest
  } = props;
  const defaultDate = toYYYYMMDD(due_date || new Date());

  const handleOnSubmit = e => {
    e.preventDefault();
    const {
      name: { value: name },
      due_date: { value: due_date }
    } = e.target;

    // Send with utc timezone offset
    const utcTimezoneOffset = new Date(due_date).getTimezoneOffset();

    if (action === 'Add') {
      Api.insertTodo({
        body: { name, due_date, utcTimezoneOffset },
        success: data => {
          handleOnHide();
          dispatch(addTodo(data));
        }
      });
    } else if (action === 'Edit') {
      Api.updateTodo({
        body: { _id, name, due_date, utcTimezoneOffset },
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
            <Form.Label>What do you need to do?</Form.Label>
            <Form.Control placeholder='Todo name' defaultValue={name} required />
          </Form.Group>

          <Form.Group controlId='due_date'>
            <Form.Label>Due Date</Form.Label>
            <Form.Control type='date' defaultValue={defaultDate} required />
          </Form.Group>
          <Button variant='success' type='submit'>
            {action}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default memo(TodoModal);
