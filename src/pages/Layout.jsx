import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { useAuthState } from "react-firebase-hooks/auth";
import { LinkContainer } from "react-router-bootstrap";
import { Outlet } from "react-router-dom";
import { auth, logout } from "../auth/firebase";

const Layout = () => {
  const [user] = useAuthState(auth);

  return (
    <Container fluid className="d-flex flex-column min-vh-100">
      <Row>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/countries">
                  <Nav.Link>Countries</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/favourites">
                  <Nav.Link>Favourites</Nav.Link>
                </LinkContainer>
                {!user && (
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                )}
                {!user && (
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                )}
                {user && (
                  <Button onClick={logout} variant="outline-light">
                    Logout
                  </Button>
                )}
              </Nav>
              {user && (
                <Nav className="ms-auto">
                  <Navbar.Text className="text-light">
                    Hello {user?.email}
                  </Navbar.Text>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
      <Row className="flex-grow-1">
        <Outlet />
      </Row>
      <footer
        className="mt-5 p-3 text-center"
        style={{
          backgroundColor: "#343434",
          color: "#F8F8FF",
          width: "100%",
        }}
      >
        <p>
          &copy; {new Date().getFullYear()} Countries App. All rights reserved.
        </p>
      </footer>
    </Container>
  );
};

export default Layout;
