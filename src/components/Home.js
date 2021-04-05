import React,{Component} from "react" ;
import NavBar from "./NavBar"
import {connect} from "react-redux"
import { Button , Card  } from 'react-bootstrap'

class Home extends Component{
    addp=(data)=>{
        console.log(data,"aaa")
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
        <Button variant="primary" onClick={(() => this.addp(data))}>Ajouter au panier</Button>
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
