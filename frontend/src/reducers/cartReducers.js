import { CART_ADD_ITEM, CART_ADD_LOADING, CART_ADD_FAIL, CART_DELETE_ITEM, CART_UPDATE_ITEM } from "../constants/productConstants"

//La primera vez que llamamos al reducer, como no tiene estado utilizará el parametro por defecto {cartItems: []}, que retornaremos en el default case.
const cartReducer = (state = { cartItems: [] }, action) => {
    console.log(action.type, "comprobanndo")
    switch (action.type) {
        case CART_ADD_LOADING:
            return { ...state, loading: true }
        case CART_ADD_ITEM:
            const item = action.payload
            const product = state.cartItems.find(x => x.id === item.id)
            if (product) {
                const kaka = state.cartItems.map(x => {
                    if (x.id === item.id) { x.qty += item.qty }
                    return x
                }
                )
                const koko = kaka.map(x => {
                    if (x.stock < x.qty) {
                        x.qty = x.stock
                        console.log("EEEXCEDEDEE")
                    }

                    console.log(x.stock, "stoock")
                    console.log(x.qty, "qtyyy")
                    return x
                }
                )
                return {
                    cartItems: koko
                    ,
                    loading: false
                }
            }
            else {
                return {
                    cartItems: [...state.cartItems, item],
                    loading: false
                }
            }
        case CART_ADD_FAIL:
            return { error: action.payload }

        case CART_DELETE_ITEM:
            const cleanArray = state.cartItems.filter(item => item.id !== action.payload)
            return { cartItems: cleanArray }

        case CART_UPDATE_ITEM:
            const { productId, qty } = action.payload
            const updatedArray = state.cartItems.map(item => {
                if (item.id === productId) item.qty = qty
                return item
            })
            return { cartItems: updatedArray }

        default:
            return state
    }
}


export { cartReducer }