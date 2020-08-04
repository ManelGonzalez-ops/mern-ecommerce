import {SHIPPING_SAVE_REQUEST, SHIPPING_SAVE_SUCCESS, SHIPPING_SAVE_FAIL} from "../constants/shippingConstants"
import Cookie from "js-cookie"
import isEmpty from "../utils/emptyObject"

//we update user info so we should indicate it
export const saveShipping = (shipping) => async (dispatch) =>{

    try{
        console.log(shipping, "esta mierda tendria que estar vacia sin login")
        dispatch({type: SHIPPING_SAVE_REQUEST})
        let info = ""
        if(!Cookie.getJSON("userInfo")){
            info = Cookie.getJSON("userInfoR")
            console.log(info, "pero q cojones")
        }
        else{
            
             info = Cookie.getJSON("userInfo")
             console.log(info, "Lo esta leyendo mal")
        }
        console.log(info, "tu puuta madre")
        console.log(info, "innnnnnnnnnfo")
        const {token} = info
        console.log(shipping, "esta mierda tendria que estar vacia sin login")
        //ojo el orden, ya que info y shipping comparten atributos..
        const allInfo = { ...info, ...shipping }
        console.log(allInfo, "todaa la info")
        const rawData = await fetch("https://mern-ecomerce.herokuapp.com/users/update", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(allInfo),
            method: "PUT"
        })
        const {data} = await rawData.json()
        //aqui estamos pasando las cookies del registro al login, se puede cambiar, ojo al condicial antes del primer depatch en el order actions
        Cookie.set("userInfo", JSON.stringify(data))
        Cookie.set("shippingInfo", JSON.stringify(data))
        console.log(Cookie.getJSON("userInfo"), "aquiiii user info updated")
        dispatch({type: SHIPPING_SAVE_SUCCESS, payload: data})
    }
    catch(err){
        dispatch({type: SHIPPING_SAVE_FAIL, payload: err.message})
    }
}


