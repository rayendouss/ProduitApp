import React,{Component,useState} from "react" ;
import NavBar from "./NavBar"
import {connect} from "react-redux"
import { Button , Card  } from 'react-bootstrap'
import axios from "axios"
class Home extends Component{
    constructor(props){
        super(props)
     this.state={
         qte:1,
         res:0
     }
    }
    handleqteChange=(e)=> {
        this.setState({qte: e.target.value});
     }
    addp=(data)=>{
       this.state.res = this.state.res+(data.price * this.state.qte)
       console.log(this.state.res )
        data.quantite=this.state.qte
        let headers = {"Authorization": "Token 92586776dd80b338d247f0dfdd65bfe61306301f", "Content-Type":"application/json"}
        let dataa= {"vendor": 1746,
            "amount": this.state.res,
            "note" : "Commande #1324"
        }
        axios.post(`https://sandbox.paymee.tn/api/v1/payments/create`,dataa,{headers})
        .then((res)=>{
          console.log(res.data.data)
          localStorage.setItem('token', res.data.data.token);
    
        })
        this.props.addPanier(data)
      
    }

   render(){
 
       const {products} = this.props;
       const prodData = products.length ? (
           products.map(data =>{
               return (

            
                <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" style={{width: '200px', height:"200px"}} src={data.image} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
       {data.desc}
        </Card.Text>
        <Card.Text>
     Price :  {data.price} DT
        </Card.Text>
       <div className="container">
           <label for="tentacles">Quantite:</label>
       <input type="number" id="tentacles" name="tentacles"
       min="1" max={data.stock}  defaultValue="1" onChange={this.handleqteChange} />
       <i onClick={(()=>this.plus(data))} class="fa fa-plus fa_custom"></i> <i onClick={(()=>this.remove(data.quantite))} class="fa fa-minus" aria-hidden="true"></i>
       </div>
        <Button variant="primary" onClick={(() => this.addp(data))}>Ajouter au panier  </Button> 
      </Card.Body>
    </Card>

               ) 
            
           })
       ) :
       (
           <p>aucun produit pour le moment ... !</p>
       )
    return(
        <div >
        <NavBar />
        <div className="row"> {prodData} </div>
        </div>
    )
}}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addPanier : panier => {
            dispatch({type:"ADD_PANIER",panier:panier})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
