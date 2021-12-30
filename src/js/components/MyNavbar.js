import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

function MyNavbar(props) {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="./">LNP</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="./createElection">New Election</Nav.Link>
          <Nav.Link href="./active">Active Election</Nav.Link>
          <Nav.Link href="./active" className="align-right"><span>Your're account: {props.account}</span></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
