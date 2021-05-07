import React,{Component,useState,useEffect} from "react" ;
import NavBar from "./NavBar"
import {connect} from "react-redux"
import {fetchProducts,addPanier} from "../actions/productAction"
import PropTypes from 'prop-types'
import { Button , Navbar , Card,Nav ,NavDropdown , Form ,FormControl } from 'react-bootstrap'
import axios from "axios"
const Home = (props)=>{
    // constructor(props){
    //     super(props)
    //  this.state={
    //      qte:1,
    //      res:0,
    //      token:0
    //  }
    // }
    // componentDidMount(){
    //    fetchProducts()
    //     console.log(products)
    // }

    const [qte,setqte]=useState(1);
    const [res,setres]=useState(0);
    const [token,settoken]=useState(0);
    const [products,setproducts]=useState([])

    useEffect(()=>{
        props.fetchProducts().then((data)=>{
     
            setproducts(props.products)
          
        })
   console.log(props.products)

    },[])

    const hundleclick=()=>{
       console.log("ici")
    console.log(products)       
 console.log("ici2")
    }
    
  const  handleqteChange=(e)=> {
        setqte(e.target.value)
     }
     const panier = props.panier
     console.log(panier)
 const   addp=(data)=>{
        // = res+(data.price * qte)
       var result=res+(data.price * qte)
       setres(res+(data.price * qte)) 
     
        data.quantite=qte
        console.log(data)
        let headers = {"Authorization": "Token 92586776dd80b338d247f0dfdd65bfe61306301f", "Content-Type":"application/json"}
        let dataa= {"vendor": 1746,
            "amount": result,
            "note" : "Commande #1324"
        }
        axios.post(`https://sandbox.paymee.tn/api/v1/payments/create`,dataa,{headers})
        .then((res)=>{
          console.log(res.data.data)
       
            settoken(res.data.data.token)
        })
       let alreadyInCart=false
        panier.forEach((element)=>{
             if(data._id== element._id){
                 data.quantite++
                 data.stock--
                alreadyInCart=true
             }
        })
        if(!alreadyInCart){
            props.addPanier(data)
        }
       
        
    }
 
  
    
       const prodData = products ? (
           props.products.map(data =>{
               return (

            
                <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" style={{width: '200px', height:"200px"}} src={data.photo} />
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
       min="1" max={data.stock}  defaultValue="1" onChange={handleqteChange} />
       <i onClick={(()=>this.plus(data))} class="fa fa-plus fa_custom"></i> <i onClick={(()=>this.remove(data.quantite))} class="fa fa-minus" aria-hidden="true"></i>
       </div>
        <Button variant="primary" onClick={(() => addp(data))}>Ajouter au panier  </Button> 
      </Card.Body>
    </Card>

               ) 
            
           })
       ) :
       (
           <div>
           <button onClick={()=>hundleclick()}>test</button>
           <p >aucun produit pour le moment ... !</p>
           </div>
       )
    return(
        <div >
        <NavBar />
        <div>
        <Form inline style={{marginLeft:"1200px"}}>
   <NavDropdown title="Panier" id="basic-nav-dropdown">
   { panier.map((item)=>{
       return (
           <div>
       <NavDropdown.Item >{item.name} : {item.quantite}*{item.price}DT </NavDropdown.Item>
    
       <NavDropdown.Divider />
       </div>
       ) 
       })}
     
       <NavDropdown.Item  step="0.01">Total= {res} DT</NavDropdown.Item> 

    

 <form method="post" action="https://sandbox.paymee.tn/gateway/">
<input type="hidden" name="payment_token" value={token} />
<input type="hidden" name="url_ok" value="https://example.com/ok.php"/>
<input type="hidden" name="url_ko" value="https://example.com/ko.php"/>
<button>Payer</button>
</form>
     </NavDropdown>
</Form>
</div>
        <div className="row"> {prodData} </div>
        
      
        </div>
    )
}

Home.propTypes = {
    fetchProducts:PropTypes.func,
    addPanier:PropTypes.func
}


const mapStateToProps = state => {
    return {
       products : state.products,
        panier : state.panier
    }
}

 

// const mapDispatchToProps = dispatch => {
//     return {
//         addPanier : panier => {
//             dispatch({type:"ADD_PANIER",panier:panier})
//         },
//         fetchProducts:() => dispatch(fetchProducts())
//     }
// }

export default connect(mapStateToProps,{fetchProducts,addPanier})(Home)
