import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { saveShipping } from "../actions/shippingActions"
import { addOrderDB } from "../actions/orderActions"
import isEmpty from "../utils/emptyObject"
import StepTimeline from "./StepTimeline"
import Cookie from "js-cookie"

//here we still need to handle errors, because we are not notifying errors in the UI

export default function Shipping(props) {


    const [shippingCookie, setShippingC] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [postal, setPostal] = useState("")
    const [country, setCountry] = useState("")

    const [paymentP, setPaymentP] = useState("")


    const addressRef = useRef(null)
    const cityRef = useRef(null)
    const postalRef = useRef(null)
    const countryRef = useRef(null)

    const arrayForm = [addressRef, cityRef, postalRef, countryRef]


    const handleInput = (e) => {
        const { name, value } = e.target
        switch (name) {
            case "address":
                setAddress(value)
                return
            case "city":
                setCity(value)
                return
            case "postal":
                setPostal(value)
                return
            case "country":
                setCountry(value)
                return
        }
    }

    const stepState = useSelector(state => state.currentStep)
    const { currentStep } = stepState
    const dispatch = useDispatch()

    const handleStep = (e) => {
        e.preventDefault()
        let nextStep = true
        arrayForm.forEach(item => {
            if (item.current.value === "") {
                nextStep = false
                item.current.className = "error-red"
            }
        })
        if (nextStep) {
            console.log(nextStep)
            dispatch({ type: "SET_STEP", payload: 2 })
            dispatch(saveShipping({ address, city, postal, country }))
        }
        else {
            alert("faltan campos que introducir")
        }
    }

   



    const order = useSelector(state => state.currentOrder)
    const { currentOrder, success, loading, error } = order
    const shipping = useSelector(state => state.shipping)
    const { shippingInfo } = shipping
    const user = useSelector(state => state.userSignin)
    const { userInfo } = user

    const NextStep = () =>
    <div className="shippingWrapper">
    <form className="form " onSubmit={handleCheckout}>
        <h1 className="form-title">Payment Method</h1>
        <div className="form-group small-mb">
            <label className="inline" htmlFor="stripe">Credit Card
            <input className="inline" type="radio" value="stripe" id="stripe"
            active
                name="stripe"
                onChange={(e) => setPaymentP(e.target.value)}
                value={paymentP} checked="checked" /></label>
        </div>
        <button className="button-pnp with-loader" type="submit">{(loading && <Spinner2/>) || "checkout"}</button>
        
    </form>
    </div>

    
    const handleCheckout = (e) => {
        e.preventDefault()
        console.log(userInfo, "userInfo antes de despahcat addorderdb")
        dispatch(addOrderDB(userInfo))

    }

    useEffect(() => {
        //si no hay user info redireccionamos al signin
        !userInfo && props.history.push("/signin")
        // si el usuario viene del checkout, saltamos la redireccion perpetua al checkout y le permitimos volver al shipping 

        let serialUrl = localStorage.getItem("lastUrl")
        if (JSON.parse(serialUrl) == "/shipping") {
            console.log(JSON.parse(serialUrl), "pero qe coño pasa aqui")


            if (currentOrder && Object.keys(currentOrder).length) {
                console.log("mmamaa 1r nivel")
                if (shippingInfo && Object.keys(shippingInfo).length) {
                    console.log("mmamaa 2n nivel")

                    dispatch({ type: "SET_STEP", payload: 3 })
                    props.history.push("/checkout")

                }
            }

        }


    }, [currentOrder])




    useEffect(() => {
        !userInfo && props.history.push("/signin")
    }, [shippingInfo])






    useEffect(() => {
        let serialUrl = localStorage.getItem("lastUrl")

        if (JSON.parse(serialUrl) !== "/checkout") {


            console.log("remuuumamela GUAAARRONA")



            if (currentOrder && Object.keys(currentOrder).length) {
                if (shippingInfo && Object.keys(shippingInfo).length) {
                    console.log("me cago en toodo")
                    localStorage.setItem("lastUrl", JSON.stringify(props.history.location.pathname))
                    dispatch({ type: "SET_STEP", payload: 3 })
                    props.history.push("/checkout")

                }
            }
        }


    }, [success])



    useEffect(() => {
        let serialUrl = localStorage.getItem("lastUrl")
        !userInfo && props.history.push("/signin")

        dispatch({type: "SET_CURRENT_PATH", payload: "show"})

        currentStep !== 1 && dispatch({ type: "SET_STEP", payload: 1 })


        if (JSON.parse(serialUrl) === "/checkout") {
            localStorage.setItem("lastUrl", JSON.stringify(props.history.location.pathname))

        }
        else {

            if (currentOrder && Object.keys(currentOrder).length) {
                if (shippingInfo && Object.keys(shippingInfo).length) {
                    console.log("me cago en toodo")
                    dispatch({ type: "SET_STEP", payload: 3 })
                    props.history.push("/checkout")

                }
            }
        }

    }, [])




    return (
        <Fragment>


            {currentStep === 2 ? <NextStep />
                :
                <div className="shippingWrapper">
                <form className="form" onSubmit={handleStep}>
                    <h1 className="form-title">Shipping</h1>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input id="address" type="text" name="address"
                            value={address || shippingInfo && shippingInfo.address || ""} onChange={(e) => { handleInput(e) }}
                            ref={addressRef} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" name="city" value={city || shippingInfo && shippingInfo.city || ""} onChange={(e) => { handleInput(e) }}
                            ref={cityRef} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postal">Postal Code</label>
                        <input id="postal" type="text" name="postal" value={postal || shippingInfo && shippingInfo.postal || ""} onChange={(e) => { handleInput(e) }}
                            ref={postalRef} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input id="country" type="text" name="country" value={country || shippingInfo && shippingInfo.country || ""} onChange={(e) => { handleInput(e) }}
                            ref={countryRef} required />
                    </div>
                    <button className="button-pnp" type="submit">Next Step</button>

                </form>
                </div>
            }
        </Fragment>
    )
}


export const Spinner2 =()=><svg class="spinner" width="40px" height="40px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
</svg>