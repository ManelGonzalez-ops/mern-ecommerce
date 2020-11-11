import React, { useEffect, Fragment, useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { cartProduct, cartModification } from "../actions/cartActions"
import isEmpty from "../utils/emptyObject"
import useScrollTop from "../utils/useScrollTop"
import { Button, CircularProgress, Divider, FormControl, List, ListItem, ListItemText, makeStyles, Paper, Select, Typography, Zoom } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { useWindowWidth } from '../utils/useWindowWidth'
import { Alert } from '@material-ui/lab'

const [width, height] = useWindowWidth()


const styles = makeStyles(theme => ({
    paper: {
        boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)'
    },
    kaka: {
        padding: "9px",
        
    },
    checkout: {
        background: theme.palette.background.paper
    },

    subheader: {
        flex: 1
    },
    number: {
        //paddingRight: "0.8rem",
        textAlign: "end"
    },
    alert: {
        alignItems: "center",
        [theme.breakpoints.up("sm")]:{
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
    warningmsg:{
        fontSize: "clamp(0.75rem, 1.5vw, 2rem)",
    },
    icon:{
        fontSize: "clamp(1.5rem, 3vw, 10rem)"
    },
    manualdark: {
        backgroundColor: theme.palette.type === "dark"? "#303030": "inherit"
    },
    batonLabel:{
        fontSize: "0.9rem",
        textTransform: "none"
    },
    selectwrap: {
        marginRight: "7px"
    },
    productName:{
        color: theme.palette.type === "dark"? 
        theme.palette.primary.light : theme.palette.primary.dark,
        marginBottom: "0.5rem"
    }
}))



export default function Cart(props) {



    const { productId } = props.match.params
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const { cartItems, loading, error } = useSelector(state => state.cart)

    useScrollTop()

    console.log(width, "mama")

    const dispatch = useDispatch()

    //adds one product every time (clicking in details), updating cartItem array
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
        console.log(e.target)
        const { name, value } = e.target
        console.log(e.currentTarget)
        // console.log(e.target.children, e.target.component)

        // props.history.push(`/cart/${name}?qty=${value}`)
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
                        classes={{root:clases.warningmsg}}
                        
                        >Cart is empty</Typography>
                        <Button
                            variant="outlined"
                            color="inherit"
                            classes={{ root: clases.shopbutton }}
                            onClick={()=>{history.push("/")}}
                        >
                            Back to shop
                            </Button>
                    </Alert>
                </Zoom>
            }
            <div className="cart">

                {

                    loading ? <CircularProgress />
                        :
                        error ? <p>{error.message}</p>
                            :

                            (
                                <Fragment>

                                    <Paper className="right"
                                    classes={{root: clases.manualdark}}
                                    >
                                        <div className="header">
                                            <Typography
                                                variant="h5"
                                            >Shopping Cart</Typography>
                                            <p className="price-title">Price</p>
                                        </div>
                                        <Divider />

                                        {cartItems && cartItems.map(item => {

                                            return (
                                                <>
                                                    <div key={item.id} className="cart-content">
                                                        <img src={item.image} alt="pantalones" />
                                                        <div className="info-cart">
                                                            <Link to={`/product/${item.id}`}
                                                            >
                                                                <Typography variant="h6"
                                                                classes={{root: clases.productName}}
                                                                >{item.name}</Typography>
                                                            </Link>

                                                            <div className="info-cantidad">
                                                                <QuantitySelect
                                                                    {...{
                                                                        item, updateCart, clases
                                                                    }}
                                                                />

                                                              

                                                                <Button //className="delete"

                                                                    classes={{ contained: clases.baton, label: clases.batonLabel }}
                                                                    size="small"
                                                                    variant="contained"
                                                                    color="secundary"
                                                                    onClick={(e) => { deleteItem(e) }}
                                                                    name={item.id}
                                                                color="secondary"
                                                                >delete</Button>
                                                            </div>

                                                        </div>
                                                        <p className="cart-price">{item.price}</p>
                                                    </div>
                                                    <Divider />
                                                </>
                                            )
                                        })}
                                    </Paper>

                                    <div className="left"
                                        style={{ marginTop: "2rem" }}
                                    >


                                        <Paper 
                                        classes={{root: clases.manualdark}}
                                        >
                                            <List

                                            >
                                                <ListItem >
                                                    <ListItemText
                                                        className={clases.subheader}
                                                    >
                                                        Subtotal
                                                    </ListItemText>
                                                    <ListItemText

                                                        className={clases.number}
                                                    >
                                                        {cartItems.reduce((x, y) => x + parseInt(y.qty), 0)} uds
                                                    </ListItemText>
                                                </ListItem>
                                                <ListItem

                                                >
                                                    <ListItemText
                                                        className={clases.subheader}
                                                    >
                                                        Price
                                                    </ListItemText>
                                                    <ListItemText
                                                        className={clases.number}
                                                    >
                                                        {cartItems.map(item => item.price * item.qty).reduce((total, valor) => total + valor, 0)} $
                                                    </ListItemText>
                                                </ListItem>
                                            </List>

                                            {currentOrder && Object.keys(currentOrder).length !== 0 ?
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    className="button-pnp"

                                                    disabled={cartItems.length === 0}
                                                    onClick={toCheckout}
                                                >continue checkout</Button>
                                                :
                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    startIcon={<CheckIcon />}
                                                    className="button-pnp"
                                                    disabled={cartItems.length === 0}
                                                    onClick={toCheckout}
                                                >proceed to checkout</Button>}
                                        </Paper>
                                    </div>
                                </Fragment>
                            )
                }
            </div>
        </div>
    )
}

const QuantitySelect = ({ item, updateCart, clases }) => {
    return (
        <FormControl variant="outlined"
        classes={{ root: clases.selectwrap }}
        >
            <Select
                classes={{ outlined: clases.kaka }}
                mb={0}
                inputProps={{ name: item.id }}
                defaultValue={item.qty}
                onChange={(e) => { updateCart(e) }}>

                {[...Array(item.stock).keys()].map((itam, index) => {

                    return <option key={index + 1}
                        value={index + 1}
                    >{index + 1}</option>
                })}
            </Select>
        </FormControl>
    )
}

