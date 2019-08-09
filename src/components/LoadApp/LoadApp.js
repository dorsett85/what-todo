import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './loadApp.module.scss';

const LoadApp = props => {
  const { children } = props;
  // TODO Initial fetch for user todo list
  const initialFetch = true;
  return initialFetch ? (
    children
  ) : (
    <div className={styles.loadAppSpinner}>
      <Spinner animation='border' />
    </div>
  );
};

export default LoadApp;
