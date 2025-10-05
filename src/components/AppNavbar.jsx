import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function AppNavbar(){
  return (
    <Navbar expand="lg" className="mb-3" role="navigation">
      <Container>
        <Navbar.Brand as={Link} to="/">Desayunos Romana</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/crear">Crear</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
