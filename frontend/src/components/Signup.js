import React, { useState, useEffect, Fragment } from 'react'
import Products from "../data"
import { useSelector, useDispatch } from "react-redux"
import { userActionsSignup } from "../actions/userActions"
import Cookie from "js-cookie"
import { Link } from 'react-router-dom'

export default function Users(props) {


    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [rpassword, setRpassword] = useState("")

    const handleInput = (e) => {
        const { name, value } = e.target
        switch (name) {
            case "email":
                setEmail(value)
                return
            case "name":
                setName(value)
                return
            case "password":
                setPassword(value)
                return
            case "rpassword":
                setRpassword(value)
                return
        }
    }

    const userSignup = useSelector((state) => state.userSignup)
    const { userInfo, loading, error } = userSignup
    const dispatch = useDispatch()

    const redirect = props.location.search ? "/shipping" : "/"
    useEffect(() => {
        
        if(props.location.search){
            dispatch({type: "SET_CURRENT_PATH", payload: "show"})
        }

        console.log(userInfo)
        if (userInfo) {
            console.log(userInfo)
            props.history.push(redirect)
        }

        console.log(userInfo)
    }, [userInfo])

    const handleSignup = (e) => {

        e.preventDefault()
        if (password === rpassword) {
            dispatch(userActionsSignup(name, email, password))
        }
        else {
            alert("passwords don't coincide")
        }
    }


    return (
        <Fragment>
            
            {loading && <p>Loading ...</p>}

            <p>{error && error}</p>

            <form method="POST" className="form form-signup" onSubmit={handleSignup}>
                <h1 className="form-title">Signup</h1>
                <div className="form-responsive-section">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" value={email} onChange={(e) => { handleInput(e) }} required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" value={name} onChange={(e) => { handleInput(e) }} required></input>
                    </div>
                </div>
                <div className="form-responsive-section">
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" value={password} onChange={(e) => { handleInput(e) }} required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rpassword">Confirm Password</label>
                        <input id="rpassword" type="password" name="rpassword" value={rpassword} onChange={(e) => { handleInput(e) }} required></input>
                    </div>
                </div>
                <button className="button-pnp" type="submit">Register</button>
                <p className="placeholder-user">Already have and account?</p>
                <Link className="button-pnp" to={redirect === "/" ? "signin" : `signin?redirect=${redirect}`} >Sign in</Link>
            </form>



        </Fragment>
    )
}
