import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../context/UserContext';
import TodoList from '../../components/TodoList/TodoList';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import TodoModal from '../../components/TodoModal/TodoModal';
import animations from '../../common/css/animations.module.scss';
import { sortByDueDate } from '../../context/actions';

export default function TodoLanding() {
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [modalAction, setModalAction] = useState('Add');
  const [modalData, setModalData] = useState({});
  const {
    user: { username, last_login, sortByDueDateDesc, todos },
    dispatch
  } = useContext(UserContext);

  const completedTodos = todos.filter(todo => todo.completed).length;

  const handleToggleTodoModal = (action, modalData = {}) => () => {
    if (action) {
      setModalAction(action);
    }
    setModalData(modalData);
    setShowTodoModal(!showTodoModal);
  };

  const handleSortDueDateOnClick = () => {
    dispatch(sortByDueDate(!sortByDueDateDesc));
  };

  return (
    <Container className={`mt-4 ${animations.fadeIn}`}>
      <Row>
        <Col>
          <div className='text-muted'>#WhatTodo</div>
          <Jumbotron>
            <h2>Hello {username}!</h2>
            <h6>
              You last logged in on{' '}
              {last_login.toLocaleDateString('en-us', {
                hour: 'numeric',
                minute: 'numeric'
              })}
            </h6>
            {!!todos.length && (
              <div className='mb-2'>
                <Badge
                  variant={completedTodos === todos.length ? 'success' : 'dark'}
                  pill
                >
                  {completedTodos}/{todos.length}
                </Badge>{' '}
                completed todos
              </div>
            )}
            <div className='mb-2'>
              <Button className='mr-2' onClick={handleToggleTodoModal('Add')}>
                Add Todo
              </Button>
              <Button variant='outline-primary' onClick={handleSortDueDateOnClick}>
                Due Date {sortByDueDateDesc ? '⇩' : '⇧'}
              </Button>
            </div>
            <TodoList handleToggleTodoModal={handleToggleTodoModal} />
            <TodoModal
              action={modalAction}
              show={showTodoModal}
              handleOnHide={handleToggleTodoModal()}
              modalData={modalData}
            />
          </Jumbotron>
        </Col>
      </Row>
      <LogoutButton />
    </Container>
  );
}
