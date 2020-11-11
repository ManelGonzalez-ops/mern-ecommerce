import { CART_ADD_ITEM, CART_ADD_LOADING, CART_ADD_FAIL, CART_DELETE_ITEM, CART_UPDATE_ITEM, CART_ADDD_ITEM } from "../constants/productConstants"


//La primera vez que llamamos al reducer, como no tiene estado utilizará el parametro por defecto {cartItems: []}, que retornaremos en el default case.
const cartReducer = (state = { cartItems: [] }, action) => {
    console.log(action.type, "comprobanndo")
    switch (action.type) {
        case CART_ADD_LOADING:
            return { ...state, loading: true }
        case CART_ADD_ITEM:
            return { cartItems: action.payload, loading: false }
        case CART_ADDD_ITEM:
            return { cartItems: action.payload, loading: false }
        case CART_ADD_FAIL:
            return { error: action.payload, loading: false }

        case CART_DELETE_ITEM:
            

            return { cartItems: action.payload, loading: false }

        case CART_UPDATE_ITEM:
            
            return { cartItems: action.payload, loading: false }
            
        case "CLEAR_CART":
            return { cartItems: [] }

        default:
            return state
    }
}


export { cartReducer }