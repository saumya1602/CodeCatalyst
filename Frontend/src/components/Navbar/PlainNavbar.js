import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function PlainNavbar() {
  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      style={{
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container fluid className="px-3">
        <Navbar.Brand
          href="/"
          style={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            background: 'linear-gradient(90deg, #1e88e5, #43a047)', // Gradient color theme
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
            textShadow: '0px 4px 10px rgba(30, 136, 229, 0.3)',
          }}
        >
          CodeCatalyst
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {/* You can add more nav items here if needed */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PlainNavbar;
