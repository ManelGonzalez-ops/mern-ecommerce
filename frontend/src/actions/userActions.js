import Cookie from "js-cookie"
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL,USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL } from "../constants/userConstants"


//cada vez que logeamos o regitramos a alguien, estamos cambiando actualizando las cookies.
const userActionsSignin = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const rawData = await fetch("http://localhost:8000/users/login", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
            method: "POST"
        })
        //data constains jwt token as well, that we send from server
        const data = await rawData.json()
        Cookie.set("userInfo", JSON.stringify(data))
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    }
    catch (err) {
        dispatch({ type: USER_LOGIN_FAIL, payload: err.message })
    }
}



const userActionsSignup = (name, email, password) => async (dispatch) => {

    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const rawData = await fetch("http://localhost:8000/users/register ", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            }),
            method: "POST"
        })
        //we send back jwt token as well
        const data = await rawData.json()
        Cookie.set("userInfo", JSON.stringify(data))
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
    }
    catch (err) {
        dispatch({ type: USER_REGISTER_FAIL, payload: err.message })
    }
}


export { userActionsSignin, userActionsSignup }