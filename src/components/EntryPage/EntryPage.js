import React from 'react';
import Card from 'react-bootstrap/Card';
import styles from './entryPage.module.scss';

export default function EntryPage({ children }) {
  return (
    <div className={`${styles.entryContainer} bg-dark`}>
      <Card className={`${styles.entryCard} ${styles.fadeInDown}`} body>
        {children}
      </Card>
    </div>
  );
}
