import React, { useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { UserContext } from '../../context/UserContext';
import { Api } from '../../api/Api';
import { updateTodo, deleteTodo } from '../../context/actions';
import styles from './todoList.module.scss';
import { onSameDay } from '../../common/functions/dateUtils';

export default function ToDoList({ handleToggleTodoModal }) {
  const {
    user: { todos },
    dispatch
  } = useContext(UserContext);

  const todoStatus = todo => {
    const dateNow = new Date();
    const dateToday = new Date(dateNow.toLocaleDateString());
    return todo.completed
      ? 'text-success'
      : todo.due_date < dateNow
      ? 'text-danger'
      : onSameDay(todo.due_date, dateToday)
      ? 'text-warning'
      : undefined;
  };

  const handleCompletedOnChange = todo => e => {
    const { _id } = todo;
    const completed = !todo.completed;
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
          <ListGroup.Item key={todo._id}>
            <div className={`lead pb-1 ${todoStatus(todo)}`}>
              <span className={styles.itemName}>{todo.name}</span>
            </div>
            <Row className='d-flex align-items-center'>
              <Col xs={2} sm={4}>
                <Badge
                  className={`mb-2 mb-sm-0 ${styles.completedBadge}`}
                  variant={!!todo.completed ? 'success' : 'light'}
                  onClick={handleCompletedOnChange(todo)}
                >
                  ✓
                </Badge>
              </Col>
              <Col>
                <div className={`mb-2 mb-sm-0 ${todoStatus(todo)}`}>
                  <b>Due</b>:{' '}
                  {todo.due_date.toLocaleDateString('en-us', {
                    hour: 'numeric',
                    minute: 'numeric'
                  })}
                </div>
              </Col>
              <Col xs={12} sm={4}>
                <div className='d-flex flex-column'>
                  <ButtonGroup size='sm'>
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
