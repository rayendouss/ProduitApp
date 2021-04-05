const initState = {
    products:[
        {"id":1,"name":"Hoverboard" , "desc":  "Nouveau skate" ,"price":200,"image":"aa.jpg" },
        {"id":2,"name":"Ball" , "desc":  "to playfootball" ,"price":100,"image":"bb.jpg" }
    ],
    panier :[]
}

const rootReducer = (state=initState,action) => {
    if(action.type ==="ADD_PANIER"){
      let prodPan = [...state.panier, action.panier]  
    return {
        ...state,
        panier:prodPan
    }
    }
    return state
}

export default  rootReducer;