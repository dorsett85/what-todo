import React, { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../context/UserContext';
import { Api } from '../../api/Api';
import { updateTodo, deleteTodo } from '../../context/actions';
import styles from './todoList.module.scss';
import { onSameDay, toHHMM } from '../../common/functions/dateUtils';

export default function ToDoList({ handleToggleTodoModal }) {
  const {
    user: { todos },
    dispatch
  } = useContext(UserContext);

  const todoStatus = todo => {
    const dateToday = new Date(new Date().toLocaleDateString());
    return todo.completed
      ? 'success'
      : onSameDay(todo.due_date, dateToday)
      ? 'warning'
      : todo.due_date < dateToday && !todo.completed
      ? 'danger'
      : undefined;
  };

  const handleCompletedOnChange = _id => e => {
    const { checked: completed } = e.target;
    Api.updateTodo({
      body: { _id, completed },
      success: data => dispatch(updateTodo(data))
    });
  };

  const handleDeleteOnClick = e => {
    const { value: _id } = e.target;
    Api.deleteTodo({
      body: { _id },
      success: data => dispatch(deleteTodo(data))
    });
  };

  return (
    !!todos.length && (
      <ListGroup>
        {todos.map(todo => (
          <ListGroup.Item key={todo._id} variant={todoStatus(todo)}>
            <div className='lead'>
              <span className={styles.itemName}>{todo.name}</span>
            </div>
            <Row className='d-flex align-items-center'>
              <Col>
                <b>Due</b>:{' '}
                {todo.due_date.toLocaleDateString() + ' ' + toHHMM(todo.due_date)}
              </Col>
              <Col>
                <Form>
                  <Form.Check
                    type='checkbox'
                    onChange={handleCompletedOnChange(todo._id)}
                    checked={!!todo.completed}
                    label='Completed'
                  />
                </Form>
              </Col>
              <Col>
                <div className='d-flex flex-column'>
                  <ButtonGroup>
                    <Button
                      variant='outline-dark'
                      onClick={handleToggleTodoModal('Edit', todo)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant='outline-danger'
                      onClick={handleDeleteOnClick}
                      value={todo._id}
                    >
                      Remove
                    </Button>
                  </ButtonGroup>
                </div>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    )
  );
}
