const initState = {
    products:[
        {"id":1,"name":"Hoverboard" , "desc":  "Nouveau skate" ,"price":0.2,"image":"aa.jpg","quantite":1,"stock":10 },
        {"id":2,"name":"Ball" , "desc":  "to playfootball" ,"price":0.1,"image":"bb.jpg" ,"quantite":1,"stock":5 }
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