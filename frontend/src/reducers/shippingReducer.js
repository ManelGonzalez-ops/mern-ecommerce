import { SHIPPING_SAVE_REQUEST, SHIPPING_SAVE_SUCCESS, SHIPPING_SAVE_FAIL } from "../constants/shippingConstants"
import Cookie from "js-cookie"

export const shippingReducer = ((state = { shippingInfo: {} }, action) => {

    switch (action.type) {

        case SHIPPING_SAVE_REQUEST:
            return { 
                ...state,
                loading: true }
        case SHIPPING_SAVE_SUCCESS:
            return { loading: false, shippingInfo: action.payload }
        case SHIPPING_SAVE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
})

