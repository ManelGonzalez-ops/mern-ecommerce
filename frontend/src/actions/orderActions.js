import { ADD_ORDERDB_REQUEST, ADD_ORDERDB_SUCCESS, ADD_ORDERDB_FAIL, SHOW_ORDERS_REQUEST, SHOW_ORDERS_SUCCESS } from "../constants/orderConstants"
import Cookie from "js-cookie"

export const addOrderDB = (hasLogin) => async (dispatch, getState) => {

    const cartItems = Cookie.getJSON("cartItems")
    const shippingInfo = Cookie.getJSON("shippingInfo")


    let userInfo = ""
    if (hasLogin) {
        userInfo = Cookie.getJSON("userInfo")
    }
    else {
        userInfo = Cookie.getJSON("userInfoR")
    }
    try {
        console.log({ cartItems, userInfo }, "basura de mierdaAAAAAAAAAAAAAAAAAAA")
        dispatch({ type: ADD_ORDERDB_REQUEST })
        const rawData = await fetch("https://nodeecommerce.herokuapp.com/orders", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            },
            body: JSON.stringify({ cartItems, userInfo, shippingInfo }),
            method: "POST"
        })
        const { data } = await rawData.json()
        Cookie.set("currentOrder", JSON.stringify(data))
        dispatch({ type: ADD_ORDERDB_SUCCESS, payload: data })
    }
    catch (err) {
        dispatch({ type: ADD_ORDERDB_FAIL, payload: err.message })
    }
}

export const showOrderDetails = () => async (dispatch) => {

    const userInfo = Cookie.getJSON("userInfo")

    try {
        dispatch({ type: SHOW_ORDERS_REQUEST })

        const rawData = 
        await fetch(`https://nodeecommerce.herokuapp.com/orders/completed/${userInfo._id}`, {
            headers: {
                "Authorization": `Bearer ${userInfo}`
            }
        })
        const {data} = await rawData.json()

        //we could save it in the cookies and avoid doing ajax calls
        dispatch({type: SHOW_ORDERS_SUCCESS, payload: data})

    } catch (err) {
        dispatch({ type: SHOW_ORDERS_SUCCESS, payload: err.message})
    }
}