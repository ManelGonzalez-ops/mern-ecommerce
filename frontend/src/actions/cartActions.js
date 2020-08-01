import { CART_ADDD_ITEM, CART_ADD_FAIL, CART_ADD_LOADING, CART_DELETE_ITEM, CART_UPDATE_ITEM, CART_ADD_ITEM } from "../constants/productConstants"
import Cookie from "js-cookie"

export const cartProduct = (productId, qty) => async (dispatch, getState) => {
    try {
        dispatch({ type: CART_ADD_LOADING })
        const rawData = await fetch(`http://localhost:8000/products/${productId}`)
        const data = await rawData.json()
        console.log(data)
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

                console.log(x.stock, "stoock")
                console.log(x.qty, "qtyyy")
                return x
            })
            
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


export const cartModification = (productId, qty = 0) => async (dispatch) => {

    dispatch({ type: CART_ADD_LOADING })
    if (qty === 0) {
        dispatch({ type: CART_DELETE_ITEM, payload: productId })


    }
    else {
        dispatch({
            type: CART_UPDATE_ITEM, payload: {
                productId,
                qty
            }
        })


    }
}

