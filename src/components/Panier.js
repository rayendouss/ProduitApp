import react , {Component} from "react"
import { Button , Navbar , Nav ,NavDropdown , Form ,FormControl } from 'react-bootstrap'
import { connect } from "react-redux"
import axios from "axios"
class Panier extends Component{
    constructor(){
        super()
        this.state = {
        result:0,
        token:localStorage.getItem('token')
        }
      
    }
 
    render(){
        
        const {panier} = this.props;
     

    return (

        <div>
   
    <NavDropdown title="Panier" id="basic-nav-dropdown">
    { panier.map((item)=>{
        return (
            <div>
        <NavDropdown.Item >{item.name} : {item.quantite}*{item.price}DT </NavDropdown.Item>
     
        <NavDropdown.Divider />
        </div>
        ) 
        })}
      
        <NavDropdown.Item >Total= {this.state.result} DT</NavDropdown.Item> 

     

  <form method="post" action="https://sandbox.paymee.tn/gateway/">
<input type="hidden" name="payment_token" value={this.state.token} />
<input type="hidden" name="url_ok" value="https://example.com/ok.php"/>
<input type="hidden" name="url_ko" value="https://example.com/ko.php"/>
<button>Payer</button>
</form>
      </NavDropdown>

</div>

    ) }
}
const mapStateToProps = state => {
    return {
        panier: state.panier
    }
}
export default connect(mapStateToProps) (Panier);