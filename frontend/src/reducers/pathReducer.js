import Cookie from "js-cookie"


export const pathReducer = (state = {currentPath: ""}, action) =>{

    switch(action.type){

        case "SET_CURRENT_PATH":
            Cookie.set("currentPath", JSON.stringify(action.payload))
            return {currentPath: action.payload}

        default:
            return state
    }
}
