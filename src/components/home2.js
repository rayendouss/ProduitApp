import axios from "axios"
import React,{useState,useEffect} from "react" ;
import NavBar from "./NavBar"
import {connect} from "react-redux"
import {fetchProducts,addPanier} from "../actions/productAction"
import PropTypes from 'prop-types'
import { Button , Navbar , Card,Nav ,NavDropdown , Form ,FormControl } from 'react-bootstrap'
const Home2 = (props)=>{
    const [urll,seturl]=useState("");
    const [qte,setqte]=useState(1);
    const [res,setres]=useState(0);
   
    const [products,setproducts]=useState([])

    useEffect(()=>{
        props.fetchProducts().then((data)=>{
     
            setproducts(props.products)
          
        })
   console.log(props.products)

    },[])
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
    const hundleclick=()=>{
  console.log("aa")
    
        axios.post("https://test.clictopay.com/payment/rest/register.do?userName=esprittest-api&password=89Lgnx9UE&orderNumber=11225177&amount="+res+"&returnUrl=http://localhost:3000/").then(
            (resul)=>{
                console.log("bb")
            seturl(resul.data.formUrl)
            window.location.href = resul.data.formUrl
            }
          
        )
      
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
        <button >test</button>
        <p >aucun produit pour le moment ... !</p>
        </div>
    )
    return (
        <div>
            
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
      
     </NavDropdown>
</Form>
</div>
        <div className="row"> {prodData} </div>
        
      
        </div>
        <button onClick={hundleclick}>Payer</button>



        </div>
    )
}
Home2.propTypes = {
    fetchProducts:PropTypes.func,
    addPanier:PropTypes.func
}


const mapStateToProps = state => {
    return {
       products : state.products,
        panier : state.panier
    }
}
export default connect(mapStateToProps,{fetchProducts,addPanier})(Home2) ;