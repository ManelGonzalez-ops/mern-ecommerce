import { CART_ADDD_ITEM, CART_ADD_FAIL, CART_ADD_LOADING, CART_DELETE_ITEM, CART_UPDATE_ITEM, CART_ADD_ITEM } from "../constants/productConstants"
import Cookie from "js-cookie"

export const cartProduct = (productId, qty) => async (dispatch, getState) => {
    try {
        dispatch({ type: CART_ADD_LOADING })
        const rawData = await fetch(`https://mern-ecomerce.herokuapp.com/products/${productId}`)
        const data = await rawData.json()
        const newItem = {
            id: data._id,
            qty,
            ...data
        }
        const {cart} = getState()
        const product = cart.cartItems.find(x => x.id === newItem.id)
        if (product) {
            const kaka = cart.cartItems.map(x => {
                if (x.id === newItem.id) { x.qty += newItem.qty }
                return x
            })
            const koko = kaka.map(x => {
                if (x.stock < x.qty) {
                    x.qty = x.stock
                    console.log("EEEXCEDEDEE")
                }

                return x
            })
            Cookie.set("cartItems", JSON.stringify(koko))
            dispatch({type: CART_ADD_ITEM, payload: koko})
            
        }
        else {
            const newState = [...cart.cartItems, newItem]
            
            dispatch({type: CART_ADDD_ITEM, payload: newState})
        }

    }

    catch (err) {
        dispatch({ type: CART_ADD_FAIL, payload: err.message })
    }
}


export const cartModification = (productId, qty = 0) => async (dispatch, getState) => {

    dispatch({ type: CART_ADD_LOADING })
    const {cart} = getState()
    

    
    
    if (qty === 0) {
        const updatedArray = cart.cartItems.filter(item =>item.id !== productId)
        Cookie.set("cartItems", JSON.stringify(updatedArray))
        dispatch({ type: CART_DELETE_ITEM, payload: updatedArray })

    }
    else {
        const updatedArr = cart.cartItems.map(item => {
            if (item.id === productId) item.qty = qty
            return item
        })
        Cookie.set("cartItems", JSON.stringify(updatedArr))
        dispatch({
            type: CART_UPDATE_ITEM, payload: updatedArr
        })


    }
}

