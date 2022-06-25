import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavbarComp() {
  // 이것도 네비게이터다!
  let nevigate = useNavigate();

  return(
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <span style={ {color: 'white', margin: '8px', cursor:'pointer'} }
              onClick={() => nevigate('/about')}
            >About</span>
            {/* dropdown 부분 */}
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>    
  )
}

export default NavbarComp;