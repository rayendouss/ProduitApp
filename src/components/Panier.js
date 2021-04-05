import react , {Component} from "react"
import { Button , Navbar , Nav ,NavDropdown , Form ,FormControl } from 'react-bootstrap'
import { connect } from "react-redux"
class Panier extends Component{
    constructor(){
        super()
        this.state = {
        result:0
        }
   
    }

        
    render(){
        const {panier} = this.props;
        let result=0;
panier.map((item)=>{
result=result+item.price;
})
    return (

   
   
    <NavDropdown title="Panier" id="basic-nav-dropdown">
    { panier.map((item)=>{
        return (
            <div>
        <NavDropdown.Item >{item.name} {item.price}DT </NavDropdown.Item>
     
        <NavDropdown.Divider />
        </div>
        ) 
        })}
      
        <NavDropdown.Item >Result= {result} DT</NavDropdown.Item> 
    
      </NavDropdown>
  
    

    ) }
}
const mapStateToProps = state => {
    return {
        panier: state.panier
    }
}
export default connect(mapStateToProps) (Panier);