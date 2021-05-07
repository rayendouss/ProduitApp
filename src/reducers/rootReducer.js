import { FETCH_PRODUCTS,ADD_PANIER} from "../types"
const initState = {
    products:[],
    panier :[]
}

const rootReducer = (state=initState,action) => {
    if(action.type ===ADD_PANIER){
       
      let prodPan = [...state.panier, action.payload]  
    return {
        ...state,
        panier:prodPan
    }
  
    }else  if(action.type === FETCH_PRODUCTS){
        console.log("here")
        return {
            ...state,
            products:action.payload
        }
    }
    return state
}

export default  rootReducer;