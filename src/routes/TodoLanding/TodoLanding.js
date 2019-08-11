import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../context/UserContext';
import TodoList from '../../components/TodoList/TodoList';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import TodoModal from '../../components/TodoModal/TodoModal';
import animations from '../../common/css/animations.module.scss';

export default function TodoLanding() {
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [modalAction, setModalAction] = useState('Add');
  const [modalData, setModalData] = useState({});
  const {
    user: { username, last_login }
  } = useContext(UserContext);

  const handleToggleTodoModal = (action, modalData = {}) => () => {
    if (action) {
      setModalAction(action);
    }
    setModalData(modalData);
    setShowTodoModal(!showTodoModal);
  };

  return (
    <Container className={`mt-4 ${animations.fadeIn}`}>
      <Row>
        <Col>
          <Jumbotron>
            <h2>Hello {username}!</h2>
            <h6 className='mb-3'>You last logged in on {last_login.toLocaleString()}</h6>
            <Button className='mb-2' onClick={handleToggleTodoModal('Add')}>
              Add Todo
            </Button>
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
