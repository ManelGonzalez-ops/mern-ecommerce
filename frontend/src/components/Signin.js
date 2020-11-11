import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { userActionsSignin } from "../actions/userActions"
import { useHistory } from 'react-router-dom'
import { Box, Button, Paper, TextField, Typography, Link } from '@material-ui/core'
import { useDataLayer } from '../Context'

export const Signin = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //if there's search param ? we redirect to shipping page instead of home
    const {setOpenSnackbar} = useDataLayer()

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

    const redirect = props.location.search ? props.location.search.split("=")[1] : "/"
    useEffect(() => {

        if (props.location.search) {
            dispatch({ type: "SET_CURRENT_PATH", payload: "show" })
        }
        // if(document.referrer === "http://localhost:3000/shipping") {
        //     props.history.push("/cart")
        // }
        // lo comentamos para probar, la app acabada debe llevar esto para evitar hacer login dos veces
        if (userInfo) {

            dispatch({ type: "SET_STEP", payload: 1 })
            props.history.push(redirect)
            setOpenSnackbar(true)

        }

    }, [userInfo])

    const handleSignin = (e) => {
        e.preventDefault()
        dispatch(userActionsSignin(email, password))
    }

    const stepState = useSelector(state => state.currentStep)
    const { currentStep } = stepState

    const history = useHistory()

    const handleSignup = () => {
        redirect === "/" ?
            history.push("/signup") : history.push(`signup?redirect=${redirect}`)
    }

    return (
        <div className="signin-wrapper">
           
            {loading && <p>Loading ...</p>}

            <Paper className="form"
                style={{ boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)' }}
            >
                <form method="POST" onSubmit={handleSignin}>
                    <p style={{ background: "red", color: "white" }}>{error && error}</p>
                    <h1 className="form-title">Signin</h1>
                    <div className="form-group">
                      
                        <TextField
                            size="small"
                            fullWidth
                            label="email"
                            variant="filled"
                            color="primary"
                            id="email" type="email" name="email" value={email} onChange={(e) => { handleInput(e) }} required></TextField>
                    </div>
                    <div
                        className="form-group"

                    >
                        
                        <TextField
                            fullWidth
                            size="small"
                            label="password"
                            id="password" type="password" name="password"
                            value={password} onChange={(e) => { handleInput(e) }}
                            variant="filled"

                            required>
                        </TextField>
                    </div>
                    <Box pb={2} fullWidth />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >Submit</Button>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="body2">Are you new?</Typography>
                            <Link
                                color="primary"
                                component="button"
                                onClick={handleSignup}
                            >Create and account</Link>

                        </div>
                    </div>

                </form>
            </Paper>

        </div>
    )
}


