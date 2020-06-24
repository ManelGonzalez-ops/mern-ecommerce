import React, { useState, useEffect, Fragment } from 'react'
import Products from "../data"
import { useSelector, useDispatch } from "react-redux"
import { userActionsSignup } from "../actions/userActions"
import Cookie from "js-cookie"

export default function Users(props) {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [rpassword, setRpassword] = useState("")

    const handleInput = (e) => {
        const { name, value } = e.target
        switch(name){
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
    useEffect(() => {
        //    if(Cookie.getJSON("userInfo")){
        //        cookie = Cookie.getJSON("userInfo")
        //        {}
        //    }
       console.log(userInfo)
            if (userInfo) {
                console.log(userInfo)
                props.history.push("/")
            }
        
        console.log(userInfo)
        console.log("hola")
    }, [userInfo])

    const handleSignup = (e) => {
        console.log("hola")
        e.preventDefault()
        if(password === rpassword){
            dispatch(userActionsSignup(name, email, password))
        }
        else{
            alert("passwords don't coincide")
        }
    }


    return (
        <Fragment>
            {loading && <p>Loading ...</p>}
    <p>{error && error}</p>
                <a href="/cart/">Cart</a>
                <form method="POST" onSubmit={handleSignup}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" name="email" value={email} onChange={(e) => { handleInput(e) }}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" value={name} onChange={(e) => { handleInput(e) }}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" value={password} onChange={(e) => { handleInput(e) }}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rpassword">Confirm Password</label>
                        <input id="rpassword" type="password" name="rpassword" value={rpassword} onChange={(e) => { handleInput(e) }}></input>
                    </div>
                    <button type="submit">Signin</button>
                </form>
        </Fragment> 
    )
}
