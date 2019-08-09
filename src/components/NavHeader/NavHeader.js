import React from 'react';
import { Navbar, Button } from 'react-bootstrap';

export default function NavHeader(props) {
  return (
    <Navbar bg='light'>
      <Navbar.Brand>HCS Todo App</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className='justify-content-end'>
        <Button variant='dark'>Logout</Button>
      </Navbar.Collapse>
    </Navbar>
  )
}