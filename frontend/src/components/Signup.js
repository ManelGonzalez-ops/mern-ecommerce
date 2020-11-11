import React, { useState, useEffect, Fragment } from 'react'
import Products from "../data"
import { useSelector, useDispatch } from "react-redux"
import { userActionsSignup } from "../actions/userActions"
import Cookie from "js-cookie"
import { useHistory } from 'react-router-dom'
import { Paper, TextField, Link, Box, Typography, Button, Grid, makeStyles } from '@material-ui/core'
import { useDataLayer } from '../Context'



const useStyles = makeStyles(theme => ({
    paper: {
        margin: "0 auto",
        [theme.breakpoints.up("xs")]: {
            width: "90vw",
            maxWidth: "400px",
            padding: "1.5rem"
        },
        [theme.breakpoints.up("md")]: {
            maxWidth: "550px"
        }
    },
  
    item: {
        [theme.breakpoints.up("md")]: {
            paddingRight: "1rem",
        }
    }
}))
export default function Users(props) {

    const {setOpenSnackbar} = useDataLayer()
    const styles = useStyles()
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

        if (props.location.search) {
            dispatch({ type: "SET_CURRENT_PATH", payload: "show" })
        }


        if (userInfo) {
            props.history.push(redirect)
            setOpenSnackbar(true)
        }

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

    const history = useHistory()

    const handleSignin = () => {
        redirect === "/" ?
            history.push("/signin") : history.push(`signin?redirect=${redirect}`)
    }
    return (
        <div
            style={{ minHeight: "80vh", marginTop: "4rem" }}
        >

            {loading && <p>Loading ...</p>}

            <p>{error && error}</p>
            <Paper
                classes={{
                    root: styles.paper
                }}
            >
                <form method="POST" onSubmit={handleSignup}>
                    <Box mb={3}>
                        <Typography variant="h5" >Signup</Typography>
                    </Box>
                    
                        <Box mb={2}>
                            <Grid

                                container
                                classes={{ root: styles.grid }}
                                justify="center"
                            >
                                <Grid xs={12} md={6} item
                                    classes={{ item: styles.item }}
                                >
                                    <Box mb={2}>
                                        <TextField
                                            fullWidth
                                            id="email"
                                            type="email"
                                            label="email"
                                            name="email"
                                            size="small"
                                            value={email}
                                            onChange={(e) => { handleInput(e) }}
                                            variant="filled"
                                            required />

                                    </Box>
                                    <Box mb={2}>
                                        <TextField
                                            label="name"
                                            fullWidth
                                            variant="filled"
                                            size="small"
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={name} onChange={(e) => { handleInput(e) }} required />
                                    </Box>
                                </Grid>
                                <Grid xs={12} md={6} item

                                >
                                    <Box mb={2}>
                                        <TextField
                                            label="password"
                                            fullWidth
                                            variant="filled"
                                            size="small"
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={password} onChange={(e) => { handleInput(e) }}
                                            required />
                                    </Box>
                                    <Box mb={2}>
                                        <TextField
                                            label="rpassword"
                                            fullWidth
                                            variant="filled"
                                            size="small"
                                            id="rpassword"
                                            type="password"
                                            name="rpassword"
                                            value={rpassword}
                                            onChange={(e) => { handleInput(e) }}
                                            required />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box fullWidth display="flex" justifyContent="space-between" >

                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                            >Register</Button>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Typography variant="body2" >Already have and account?</Typography>
                                <Link
                                    color="primary"
                                    component="button"
                                    onClick={handleSignin}
                                >Sign in</Link>
                            </div>
                        </Box>
                    

                </form>
            </Paper>


        </div>
    )
}
