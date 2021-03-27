import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Paper, Radio, RadioGroup, Typography } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { addOrderDB } from '../actions/orderActions'
import { Spinner2 } from './Shipping'

export const PaymentMethod = () => {

    const [errur, setError] = useState(false)
    const labelradio = useRef(false)
    const [paymentP, setPaymentP] = useState("")
    const order = useSelector(state => state.currentOrder)
    const { loading, success, error } = order
    const user = useSelector(state => state.userSignin)
    const { userInfo } = user

    const shouldRedirect = useRef(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const handleRadio = (e) => {
        labelradio.current = true
        errur && setError(false)

        setPaymentP(e.target.value)
    }
    const handleCheckout = (e) => {
        e.preventDefault()
        if (paymentP) {
            errur && setError(false)
            shouldRedirect.current = true
            dispatch(addOrderDB(userInfo))
        }
        else {
            setError(true)
        }
    }

    useEffect(() => {
        dispatch({ type: "SET_STEP", payload: 2 })
    }, [])

    useEffect(() => {

        if (!shouldRedirect.current) return;

        
        if (success) {
            history.push("/checkout")
        }
    }, [success])

    return (
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
                            {errur && <FormHelperText>Select at least one option</FormHelperText>}
                        </FormControl>
                    </div>
                    <Button variant="contained"
                        color="primary"
                        className="with-loader"
                        type="submit"
                        style={{ minWidth: "113px" }}
                    >{(loading && <Spinner2 />) || "checkout"}</Button>
                </form>
                {error && <p>{error}</p>}
            </Paper>
        </div>
    )
}
