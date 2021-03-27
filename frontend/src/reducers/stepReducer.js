import Cookies from "js-cookie"

export const setStepReducer = (state = { currentStep: 0 }, action) => {

    switch (action.type) {
        case "SET_STEP":
            Cookies.set("currentStep", JSON.stringify(action.payload))
            return { currentStep: action.payload }
        default:
            return state
    }
}