import react , {Component} from "react"
import { Button , Navbar , Nav ,NavDropdown , Form ,FormControl } from 'react-bootstrap'
import { connect } from "react-redux"
import Panier from "./Panier"
class NavBar extends Component{

    render(){
        const {panier} = this.props;

    return (
        <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">Product</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
  
   
    </Nav>
    <Form inline style={{marginRight:"90px"}}>
   
   <Panier />
  
    </Form>
  </Navbar.Collapse>
</Navbar>
    ) }
}
const mapStateToProps = state => {
    return {
        panier: state.panier
    }
}
export default connect(mapStateToProps) (NavBar);