import React, { useState, useEffect, Fragment } from 'react'
import Products from "../data"
import { useSelector, useDispatch } from "react-redux"
import { userActionsSignin } from "../actions/userActions"
import Cookie from "js-cookie"

export default function Users(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
    useEffect(() => {
        //we saved the cookie into the redux store as initial state
        //    if(Cookie.getJSON("userInfo")){
        //        cookie = Cookie.getJSON("userInfo")
        //        {}
        //    }
       
            if (userInfo) {
                console.log(userInfo)
                props.history.push("/")
            }
        
        console.log(userInfo)

    }, [userInfo])

    const handleSignin = (e) => {
        e.preventDefault()
        dispatch(userActionsSignin(email, password))
    }


    return (
        <Fragment>
            {loading && <p>Loading ...</p>}
    <p>{error && error}</p>
                <a href="/cart/">Cart</a>
                <form method="POST" onSubmit={handleSignin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" value={email} onChange={(e) => { handleInput(e) }}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" value={password} onChange={(e) => { handleInput(e) }}></input>
                    </div>
                    <button type="submit">Signin</button>
                </form>
        </Fragment> 
    )
}
