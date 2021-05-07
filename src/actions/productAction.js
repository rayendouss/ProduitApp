import axios from 'axios';
import { FETCH_PRODUCTS,ADD_PANIER} from "../types"
export const fetchProducts=()=>async (dispatch) =>{
    
      const res =  await fetch("http://localhost:5000/product/allPr")
      const data = await res.json()
      console.log(data.posts)
     dispatch({
         type: FETCH_PRODUCTS,
         payload : data.posts
     })
    
}
export const addPanier=(data)=> async(dispatch) =>{
    dispatch({
        type: ADD_PANIER,
        payload : data
    })
}