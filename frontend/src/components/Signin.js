import React, { useState, useEffect, Fragment } from 'react'
import Products from "../data"
import { useSelector, useDispatch } from "react-redux"
import { userActionsSignin } from "../actions/userActions"
import { Link } from 'react-router-dom'
import Cookie from "js-cookie"
import StepTimeline from "./StepTimeline"

export default function Users(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //if there's search param ? we redirect to shipping page instead of home
    

    const handleInput = (e) => {
        const { name, value } = e.target
        name === "email" ?
            setEmail(value)
            :
            setPassword(value)
    }

    const userSignin = useSelector((state) => state.userSignin)
    const { userInfo, loading, error } = userSignin
    const dispatch = useDispatch()

    const redirect = props.location.search? props.location.search.split("=")[1] : "/"
    useEffect(() => {
       
        if(props.location.search){
            dispatch({type: "SET_CURRENT_PATH", payload: "show"})
        }
        // if(document.referrer === "http://localhost:3000/shipping") {
        //     props.history.push("/cart")
        // }
        // lo comentamos para probar, la app acabada debe llevar esto para evitar hacer login dos veces
            if (userInfo) {
                
                dispatch({type: "SET_STEP", payload: 1})
                props.history.push(redirect)
            }

    }, [userInfo])

    const handleSignin = (e) => {
        e.preventDefault()
        dispatch(userActionsSignin(email, password))
    }

    const stepState = useSelector(state=>state.currentStep)
    const {currentStep} = stepState


    return (
        <div className="signin-wrapper">
            {/* {props.location.search && <StepTimeline/>} */}
            {loading && <p>Loading ...</p>}
               
                <form className="form" method="POST" onSubmit={handleSignin}>
                <p style={{background: "red", color: "white"}}>{error && error}</p>
                    <h1 className="form-title">Signin</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" value={email} onChange={(e) => { handleInput(e) }} required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" value={password} onChange={(e) => { handleInput(e) }}
                        required></input>
                    </div>
                    <button className="button-pnp" type="submit">Signin</button>
                   <p className="placeholder-user">Are you new?</p> 
                   <Link
                to={redirect === "/" ? "signup":`signup?redirect=${redirect}` }
                 className="button-pnp">Create and account</Link>
                </form>
                

        </div> 
    )
}
