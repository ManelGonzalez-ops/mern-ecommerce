import { Box, Breadcrumbs, Button,  Divider, List, ListItem, ListItemText,  makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect, Fragment, useState, useRef } from 'react'

import { useSelector, useDispatch } from "react-redux"
import ModalPayment from "./modalPayment"


const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        
    },
    paper: {
        boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)'
    },
    kaka: {
        padding: "9px"
    },


    checkout: {
        background: theme.palette.background.paper
    },

    subheader: {
        flex: 1
    },
    number: {
        textAlign: "end"
    },
    productName: {

        [theme.breakpoints.up("xs")]: {
            fontSize: "small",
            marginBottom: "3px",
        },
        [theme.breakpoints.up("sm")]: {
            fontSize: "inherit"
        },
    },
    manualDark: {
        color: theme.palette.secondary.light
    },
    title:{
        //needcheck
        color: theme.palette.type === "dark"? 
        theme.palette.primary.light : theme.palette.primary.main
    }
}));



export default function Checkout(props) {

    const styles = useStyles()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const mask = useRef(null)

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const order = useSelector(state => state.currentOrder)
    const { currentOrder } = order

    const shipping = useSelector(state => state.shipping)
    const { shippingInfo } = shipping

    const { currentStep } = useSelector(state => state.currentStep)
    const dispatch = useDispatch()

    const handleModalMask = () => {
        setModalIsOpen(false)
    }
    useEffect(() => {

        dispatch({ type: "SET_CURRENT_PATH", payload: "show" })
        currentStep !== 3 && dispatch({ type: "SET_STEP", payload: 3 })

        localStorage.setItem("lastUrl", JSON.stringify(props.history.location.pathname))

    }, [])

    useEffect(() => {
        if (modalIsOpen) {
            mask.current.addEventListener("click", handleModalMask)
        }
        return () => mask.current.removeEventListener("click", handleModalMask)
    }, [modalIsOpen])


    return (

        <Fragment >
            <div className="checkout__wrap">
                <div className="checkout__container">
                    <Paper className="info">
                        <div className="info__section">
                            {/* <Typography variant="h5">Shipping</Typography> */}
                            <InsideLeftLineTag title={"Shipping"} styles={styles}/>
                            <div className="shippingInfo">

                                {shippingInfo ?
                                    <div className={styles.root}>
                                        <Breadcrumbs separator="-">
                                            <Typography color="textPrimary">{shippingInfo.address}</Typography>
                                            <Typography color="textPrimary">{shippingInfo.city}</Typography>
                                            <Typography color="textPrimary">{shippingInfo.postal}</Typography>
                                            <Typography color="textPrimary">{shippingInfo.country}</Typography>
                                        </Breadcrumbs>
                                    </div>
                                    :
                                    <p>No info provided</p>
                                }
                            </div>
                        </div>
                        <div className="info__section">
                            <InsideLeftLineTag title="Payment" styles={styles}/>
                            <Box mt="1rem">
                                <Typography >Payment method: Paypal</Typography>
                            </Box>
                        </div>
                        <div className="info__section">
                            {/* <Typography variant="h5">Order</Typography> */}
                            <InsideLeftLineTag title="Order" styles={styles}/>
                            <Typography className="floatedd"
                                classes={{ root: styles.manualDark }}
                            >Price</Typography>

                            {cartItems && cartItems.length !== 0 &&
                                cartItems.map((item, index) => {

                                    return (
                                        <Box key={index} className="item__table">
                                            <img src={item.image} alt="panalones"
                                                style={{ borderRadius: "4px" }}
                                            />
                                            <Box className="cell__2">
                                                <Typography
                                                    classes={{ root: styles.productName }}
                                                >{item.name}</Typography>
                                                <Box display="flex">
                                                    <Typography
                                                        classes={{ root: styles.manualDark }}
                                                        style={{ marginRight: "5px" }}
                                                    >Quantity:
                                                     </Typography>
                                                    <Typography>{item.qty}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Typography className="priceC"
                                            >${item.price}</Typography>
                                        </Box>)
                                }
                                )}

                        </div>
                    </Paper>
                    <Paper className="summary"
                        style={{ textAlign: "right" }}
                    >

                        <List>
                            <ListItem>
                                <InsideLeftLineTag variant="h4" styles={styles}
                                title="Summary"
                                />
                            </ListItem>
                            <Divider />
                            <ListItem className="summary__item">
                                <Typography
                                    className={styles.subheader}
                                >Items</Typography>
                                <ListItemText
                                    className={styles.number}
                                >{cartItems.reduce((total, item) => total + parseInt(item.qty, 10), 0)} uds</ListItemText>

                            </ListItem>
                            <Divider />
                            <ListItem className="summary__item">
                                <Typography
                                    className={styles.subheader}
                                >Shipping</Typography>
                                <ListItemText
                                    className={styles.number}
                                >$13</ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem className="summary__item">
                                <Typography
                                    className={styles.subheader}
                                >Tax</Typography>
                                <ListItemText
                                    className={styles.number}
                                >$23</ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem className="summary__item amazone">
                                <Typography
                                    classes={{ root: styles.manualDark }}
                                    className={styles.subheader}
                                >Order Total</Typography>
                                <ListItemText
                                    className={styles.number}
                                >
                                    {
                                        parseFloat(cartItems.reduce((total, item) => total + (item.qty * item.price), 0).toFixed(2))
                                    }</ListItemText>
                            </ListItem>
                        </List>
                        <Button
                            onClick={() => { setModalIsOpen(true) }}
                            color="primary"
                            variant="contained"
                        >Place Order</Button>
                    </Paper>
                </div>
            </div>

            <div className={modalIsOpen ? "payment-mask" : "payment-mask hide"}
                ref={mask} ></div>
            <ModalPayment modalOpen={modalIsOpen} setModal={setModalIsOpen} />

        </Fragment>
    )
}


const styles = makeStyles(({ spacing, palette }) => ({
    root: {
        minWidth: 100,
        padding: 0,
    },
    tag: {
        borderRadius: '0 3px 3px 0',
        background: '#FFFFFF',
        borderLeft: `3px solid ${palette.primary.main}`,
        fontWeight: 'bold',
        padding: '8px 16px',
        margin: spacing(1),
    },
}));

const InsideLeftLineTag = ({title, styles, ...props}) => {

    return (
           
            <Typography variant="h5" {...props} classes={{root: styles.title}}>{title}</Typography>
    );
};


