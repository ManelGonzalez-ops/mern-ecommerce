import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { saveShipping } from "../actions/shippingActions"
import { addOrderDB } from "../actions/orderActions"
import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, ListItem, makeStyles, Paper, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { useHistory } from 'react-router'

//here we still need to handle errors, because we are not notifying errors in the UI

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



export default function Shipping(props) {

    const styles = useStyles()
    const shipping = useSelector(state => state.shipping)
    const { shippingInfo } = shipping
    const [address, setAddress] = useState(shippingInfo.address || "")
    const [city, setCity] = useState(shippingInfo.city || "")
    const [postal, setPostal] = useState(shippingInfo.postal || "")
    const [country, setCountry] = useState(shippingInfo.country || "")




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

    const history = useHistory()
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
            dispatch({ type: "SET_STEP", payload: 2 })
            dispatch(saveShipping({ address, city, postal, country }))
            history.push("/payment_method")
        }
        else {
            alert("faltan campos que introducir")
        }
    }





    const order = useSelector(state => state.currentOrder)
    const { currentOrder, success, loading, error } = order

    const user = useSelector(state => state.userSignin)
    const { userInfo } = user


    useEffect(() => {
        dispatch({ type: "SET_CURRENT_PATH", payload: "show" })
        currentStep !== 1 && dispatch({ type: "SET_STEP", payload: 1 })
    }, [])

    useEffect(() => {
        //si no hay user info redireccionamos al signin
        !userInfo && props.history.push("/signin?redirect=shipping")
        // si el usuario viene del checkout, saltamos la redireccion perpetua al checkout y le permitimos volver al shipping



    }, [currentOrder])




    useEffect(() => {
        console.log(userInfo, "userInfuu")
        !userInfo && props.history.push("/signin?redirect=shipping")
    }, [shippingInfo])



    // useEffect(() => {
    //     let serialUrl = localStorage.getItem("lastUrl")

    //     if (JSON.parse(serialUrl) !== "/checkout") {






    //         if (currentOrder && Object.keys(currentOrder).length) {
    //             if (shippingInfo && Object.keys(shippingInfo).length) {

    //                 localStorage.setItem("lastUrl", JSON.stringify(props.history.location.pathname))
    //                 dispatch({ type: "SET_STEP", payload: 3 })
    //                 props.history.push("/checkout")

    //             }
    //         }
    //     }


    // }, [success])



    // useEffect(() => {
    //     let serialUrl = localStorage.getItem("lastUrl")
    //     !userInfo && props.history.push("/signin?redirect=shipping")

    //     dispatch({ type: "SET_CURRENT_PATH", payload: "show" })

    //     


    //     if (JSON.parse(serialUrl) === "/checkout") {
    //         localStorage.setItem("lastUrl", JSON.stringify(props.history.location.pathname))

    //     }
    //     else {

    //         if (currentOrder && Object.keys(currentOrder).length) {
    //             if (shippingInfo && Object.keys(shippingInfo).length) {

    //                 dispatch({ type: "SET_STEP", payload: 3 })
    //                 props.history.push("/checkout")

    //             }
    //         }
    //     }

    // }, [])




    return (
        <div style={{ minHeight: "80vh" }}>

            <Paper
                classes={{
                    root: styles.paper
                }}
            >
                <form onSubmit={handleStep}>
                    <Box mb={3}>
                        <ListItem
                            disableGutters
                        >
                            <FlightTakeoffIcon
                                style={{ marginRight: "10px" }}
                            />
                            <Typography variant="h5" >
                                Shipping</Typography>
                        </ListItem>
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
                                        id="address"
                                        type="text"
                                        label="address"
                                        name="address"
                                        size="small"
                                        value={address}
                                        onChange={(e) => { handleInput(e) }}
                                        variant="filled"
                                        ref={addressRef}
                                        required />

                                </Box>
                                <Box mb={2}>
                                    <TextField
                                        fullWidth
                                        id="city"
                                        type="text"
                                        label="city"
                                        name="city"
                                        size="small"
                                        value={city}
                                        onChange={(e) => { handleInput(e) }}
                                        variant="filled"
                                        ref={cityRef}
                                        required />

                                </Box>
                            </Grid>
                            <Grid xs={12} md={6} item
                            >
                                <Box mb={2}>
                                    <TextField
                                        fullWidth
                                        id="postal"
                                        type="text"
                                        label="postal"
                                        name="postal"
                                        size="small"
                                        value={postal}
                                        onChange={(e) => { handleInput(e) }}
                                        variant="filled"
                                        ref={postalRef}
                                        required />

                                </Box>
                                <Box mb={2}>
                                    <TextField
                                        fullWidth
                                        id="country"
                                        type="text"
                                        label="country"
                                        name="country"
                                        size="small"
                                        value={country}
                                        onChange={(e) => { handleInput(e) }}
                                        variant="filled"
                                        ref={countryRef}
                                        required />

                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Button variant="contained" color="primary" type="submit">Next Step</Button>

                </form>
            </Paper>

        </div>
    )
}


export const Spinner2 = () => <svg className="spinner" width="40px" height="40px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
</svg>