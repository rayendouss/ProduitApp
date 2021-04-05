import react from "react"
import { Button , Navbar , Nav ,NavDropdown , Form ,FormControl } from 'react-bootstrap'
const NavBar=()=>{
    return (
        <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Product</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
  
   
    </Nav>
    <Form inline>
    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
 
    </Form>
  </Navbar.Collapse>
</Navbar>
    )
}
export default NavBar;