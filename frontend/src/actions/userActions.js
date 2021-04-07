import Cookie from "js-cookie"
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_FAIL, USER_UPDATE_SUCCESS } from "../constants/userConstants"


//cada vez que logeamos o regitramos a alguien, borramos remplazamos las cookies del usuario anterior por el del nuevo usuario
const userActionsSignin = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const rawData = await fetch("http://localhost:8000/users/login", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            }),
            method: "POST"
        })
        //data constains jwt token as well, that we send from server
        const data = await rawData.json()
        //necesario para lanzar el error en casa¡o d que los datos no fuesen correctos 
        if (data && data.message === "invalid mail or password") throw "invalid mail or password"
        Cookie.set("userInfo", JSON.stringify(data))
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
    }
    catch (err) {

        dispatch({ type: USER_LOGIN_FAIL, payload: err })
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

const userLogout = () => (dispatch) => {

    Cookie.set("userInfo", JSON.stringify(""))
    dispatch({ type: "USER_LOGOUT" })


}

const userUpdateInfo = (newInfo) => async (dispatch, getState) => {

    try {
        dispatch({ type: USER_UPDATE_REQUEST })
        const { userSignin: { userInfo } } = getState()

        const rawData = await fetch("http://localhost:8000/users/updateAccount", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userInfo.token}`
            },
            body: JSON.stringify({ ...newInfo, id: userInfo._id })
            ,
            method: "PUT"
        })
        const { data } = await rawData.json()
        Cookie.set("userInfo", JSON.stringify(data))
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
    }
    catch (err) {
        dispatch({ type: USER_UPDATE_FAIL, payload: err.message })
    }
}

export { userActionsSignin, userActionsSignup, userLogout, userUpdateInfo }