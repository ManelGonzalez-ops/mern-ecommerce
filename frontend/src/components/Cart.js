import React, { useEffect, Fragment, useState } from 'react'
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { cartProduct, cartModification } from "../actions/cartActions"
import isEmpty from "../utils/emptyObject"
import useScrollTop from "../utils/useScrollTop"
import { Button, CircularProgress, makeStyles, Typography, Zoom } from '@material-ui/core'
import { useWindowWidth } from '../utils/useWindowWidth'
import { Alert } from '@material-ui/lab'
import { CartContent } from './CartContent'
import { Loader } from './Loader'


const styles = makeStyles(theme => ({
    paper: {
        boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)'
    },
    padder: {
        padding: "9px",

    },
    checkout: {
        background: theme.palette.background.paper
    },

    subheader: {
        flex: 1,
        color: theme.palette.secondary.dark
    },
    titulo: {
        color: theme.palette.primary.dark
    },
    number: {
        textAlign: "end"
    },
    alert: {
        alignItems: "center",
        [theme.breakpoints.up("sm")]: {
            padding: "calc(0.5rem + 1%) calc(1rem + 2%)"
        }
    },
    alertContent: {
        flex: 1,
        display: "flex",
        alignItems: "center",

    },
    shopbutton: {
        marginLeft: "auto",
        fontSize: "clamp(0.75rem, 1.5vw, 2rem)"
    },
    warningmsg: {
        fontSize: "clamp(0.75rem, 1.5vw, 2rem)",
    },
    icon: {
        fontSize: "clamp(1.5rem, 3vw, 10rem)"
    },
    manualdark: {
        backgroundColor: theme.palette.type === "dark" ? "#303030" : "inherit"
    },
    batonLabel: {
        fontSize: "0.9rem",
        textTransform: "none"
    },
    selectwrap: {
        marginRight: "7px"
    },
    productName: {
        color: theme.palette.type === "dark" ?
            theme.palette.primary.light : theme.palette.primary.dark,
        marginBottom: "0.5rem"
    }
}))



export default function Cart(props) {



    const { productId } = props.match.params
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const { cartItems, loading, error } = useSelector(state => state.cart)

    useScrollTop()

    const dispatch = useDispatch()

    useEffect(() => {
        if (productId) {
            dispatch(cartProduct(productId, qty))
        }
    }, [])



    const deleteItem = (e) => {
        const { name } = e.currentTarget
        dispatch(cartModification(name))
    }

    const updateCart = (e) => {
        const { name, value } = e.target
        if (value) {
            dispatch(cartModification(name, value))
        }
        else {
            console.log("no value selected")
        }
    }

    const user = useSelector(state => state.userSignin)
    const { userInfo } = user
    const toCheckout = () => {

        if (isEmpty(userInfo)) {
            props.history.push("/signin?redirect=shipping")
        }
        else {
            props.history.push("/shipping")
        }
    }

    const { currentOrder } = useSelector(state => state.currentOrder)
    const clases = styles()
    const history = useHistory()

    return (
        <div className="cart-wrapper">

            {cartItems && cartItems.length === 0 &&
                <Zoom in={true} timeout={300}>
                    <Alert
                        variant="filled"
                        severity="warning"
                        classes={{ root: clases.alert, message: clases.alertContent, icon: clases.icon }}

                    >
                        <Typography
                            classes={{ root: clases.warningmsg }}

                        >Cart is empty</Typography>
                        <Button
                            variant="outlined"
                            color="inherit"
                            classes={{ root: clases.shopbutton }}
                            onClick={() => { history.push("/") }}
                        >
                            Back to shop
                            </Button>
                    </Alert>
                </Zoom>
            }
            <div className="cart">

                {
                    loading ? <Loader/>
                        :
                        error ? <p>{error.message}</p>
                            :

                            (
                                <CartContent  {...{ clases, productId, cartItems, loading, toCheckout, updateCart,deleteItem, currentOrder }} />
                            )
                }
            </div>
            
        </div>
    )
}



