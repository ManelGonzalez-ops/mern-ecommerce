import { SHIPPING_SAVE_REQUEST, SHIPPING_SAVE_SUCCESS, SHIPPING_SAVE_FAIL } from "../constants/shippingConstants"
import Cookie from "js-cookie"

export const shippingReducer = ((state = { shippingInfo: {} }, action) => {

    switch (action.type) {

        case SHIPPING_SAVE_REQUEST:
            return { loading: true }
        case SHIPPING_SAVE_SUCCESS:
            return { loading: false, shippingInfo: action.payload }
        case SHIPPING_SAVE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
})

export const setStepReducer = (state = { currentStep: 0 }, action) => {

    switch (action.type) {
        case "SET_STEP":
            Cookie.set("currentStep", JSON.stringify(action.payload))
            return { currentStep: action.payload }
        default:
            return state
    }
}