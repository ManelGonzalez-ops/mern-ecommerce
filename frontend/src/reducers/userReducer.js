const { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } = require("../constants/userConstants")

export const userLoginReducer = ((state = { userInfo: {} }, action) => {

    switch (action.type) {

        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case "USER_LOGOUT":
            return { userInfo: "" }

        default:
            return state
    }
})
export const userRegisterReducer = ((state = { userInfo: {} }, action) => {

    switch (action.type) {

        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
})


export const userShippingReducer = ((state = { userInfo: {} }, action) => {

    switch (action.type) {

        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
})

//we have to thing if I really need to be userSignin or new state

export const userUpdateReducer = ((state={userInfo: {}}, action)=>{

    switch(action.type){

        case USER_UPDATE_REQUEST:
            return {loading: true}
        case USER_UPDATE_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
})