import { CART_ADD_ITEM, CART_ADD_FAIL, CART_ADD_LOADING, CART_DELETE_ITEM, CART_UPDATE_ITEM } from "../constants/productConstants" 
import Cookie from "js-cookie"

export const cartProduct = (productId, qty) => async (dispatch, getState) => {
    try {
        dispatch({ type: CART_ADD_LOADING })
        const rawData = await fetch(`http://localhost:8000/products/${productId}`)
        const data = await rawData.json()
        console.log(data)
        dispatch({
            type: CART_ADD_ITEM, payload: {
                id: data._id,
                qty,
                ...data
            }
        })
        const { cart: { cartItems } } = getState()
        Cookie.set("cartItems", JSON.stringify(cartItems))
    }

    catch (err) {
        dispatch({ type: CART_ADD_FAIL, payload: err.message })
    }
}


export const cartModification = (productId, qty = 0) => async (dispatch, getState) => {
    if (qty === 0) {
        dispatch({ type: CART_DELETE_ITEM, payload: productId })
        const { cart: { cartItems } } = getState()
        Cookie.set("cartItems", JSON.stringify(cartItems))
    }
    else {
        dispatch({
            type: CART_UPDATE_ITEM, payload: {
                productId,
                qty
            }
        })
        const { cart: { cartItems } } = getState()
        Cookie.set("cartItems", JSON.stringify(cartItems))
    }
}