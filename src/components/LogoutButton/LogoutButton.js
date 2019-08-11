import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../context/UserContext';
import { Api } from '../../api/Api';
import { unsetUser } from '../../context/actions';
import styles from './logoutButton.module.scss';

const LogoutButton = ({ history }) => {
  const { dispatch } = useContext(UserContext);
  const handleClick = () => {
    Api.logout(() => {
      dispatch(unsetUser({}));
      history.push('/login');
    });
  };
  return (
    <div className={styles.logoutBtn}>
      <Button variant='warning' onClick={handleClick}>
        Logout
      </Button>
    </div>
  );
};

export default withRouter(LogoutButton);
