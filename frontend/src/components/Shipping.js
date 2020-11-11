import React, { Fragment, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { saveShipping } from "../actions/shippingActions"
import { addOrderDB } from "../actions/orderActions"
import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, ListItem, ListItemIcon, makeStyles, Paper, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';

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
    const [shippingCookie, setShippingC] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [postal, setPostal] = useState("")
    const [country, setCountry] = useState("")

    const [paymentP, setPaymentP] = useState("")
    const [errur, setError] = useState(false)

    const addressRef = useRef(null)
    const cityRef = useRef(null)
    const postalRef = useRef(null)
    const countryRef = useRef(null)
    
    const labelradio = useRef(false)
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
            <Paper className="form" >
                <form onSubmit={handleCheckout}>
                    <Typography className="form-title">Payment Method</Typography>
                    <div className="form-group small-mb">
                        <FormControl component="fieldset" error={errur}>
                            <FormLabel component="legend" focused={labelradio.current}>Credit Card</FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={paymentP} onChange={handleRadio} >
                                <FormControlLabel value="stripe" control={<Radio />} label="stripe" />
                            </RadioGroup>
                           { errur && <FormHelperText>Select at least one option</FormHelperText>}
                        </FormControl>
                    </div>
                    <Button variant="contained"
                        color="primary"
                        className="with-loader"
                        type="submit"
                        style={{ minWidth: "113px" }}
                    >{(loading && <Spinner2 />) || "checkout"}</Button>
                </form>
            </Paper>
        </div>

const handleRadio = (e)=>{
    labelradio.current = true
    errur && setError(false)

    setPaymentP(e.target.value)
}
    const handleCheckout = (e) => {
        e.preventDefault()
        if (paymentP){
            errur && setError(false)
            dispatch(addOrderDB(userInfo))
        }
        else{
            setError(true)
        }

    }

    useEffect(() => {
        //si no hay user info redireccionamos al signin
        !userInfo && props.history.push("/signin")
        // si el usuario viene del checkout, saltamos la redireccion perpetua al checkout y le permitimos volver al shipping

        let serialUrl = localStorage.getItem("lastUrl")
        if (JSON.parse(serialUrl) == "/shipping") {


            if (currentOrder && Object.keys(currentOrder).length) {

                if (shippingInfo && Object.keys(shippingInfo).length) {


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






            if (currentOrder && Object.keys(currentOrder).length) {
                if (shippingInfo && Object.keys(shippingInfo).length) {

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

        dispatch({ type: "SET_CURRENT_PATH", payload: "show" })

        currentStep !== 1 && dispatch({ type: "SET_STEP", payload: 1 })


        if (JSON.parse(serialUrl) === "/checkout") {
            localStorage.setItem("lastUrl", JSON.stringify(props.history.location.pathname))

        }
        else {

            if (currentOrder && Object.keys(currentOrder).length) {
                if (shippingInfo && Object.keys(shippingInfo).length) {

                    dispatch({ type: "SET_STEP", payload: 3 })
                    props.history.push("/checkout")

                }
            }
        }

    }, [])




    return (
        <div style={{ minHeight: "80vh" }}>


            {currentStep === 2 ? <NextStep />
                :
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
                                            value={address || shippingInfo && shippingInfo.address || ""}
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
                                            value={city || shippingInfo && shippingInfo.city || ""}
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
                                            value={postal || shippingInfo && shippingInfo.postal || ""}
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
                                            value={country || shippingInfo && shippingInfo.country || ""}
                                            onChange={(e) => { handleInput(e) }}
                                            variant="filled"
                                            ref={countryRef}
                                            required />

                                    </Box>
                                </Grid>
                            </Grid>

                            {/* <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <input id="address" type="text" name="address"
                                value={address || shippingInfo && shippingInfo.address || ""} onChange={(e) => { handleInput(e) }}
                                ref={addressRef} required />
                        </div> */}
                            {/* <div className="form-group">
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
                        </div> */}
                        </Box>
                        <Button variant="contained" color="primary" type="submit">Next Step</Button>

                    </form>
                </Paper>
            }
        </div>
    )
}


export const Spinner2 = () => <svg className="spinner" width="40px" height="40px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
</svg>