import React from 'react'
import { Button, CircularProgress, Divider, FormControl, List, ListItem, ListItemText, makeStyles, MenuItem, Paper, Select, Typography, Zoom } from '@material-ui/core'
import { Link } from "react-router-dom"
import CheckIcon from '@material-ui/icons/Check'

export const CartContent = (
    { clases,
        cartItems,
        toCheckout,
        updateCart,
        deleteItem,
        currentOrder }) => {
    return (

        <>
            <Paper className="right"
                classes={{ root: clases.manualdark }}
                data-testid="cart-content-view"
            >
                <div className="header">
                    <Typography
                        variant="h4"
                        className={clases.titulo}
                    >Shopping Cart</Typography>
                    <p className="price-title">Price</p>
                </div>
                <Divider />

                {cartItems && cartItems.map((item, index) => {

                    return (
                        <div key={item.id}
                        data-testid={`product-${index}`}
                        >
                            <div className="cart-content">
                                <img src={item.image} alt="pantalones" alt={item.name} />
                                <div className="info-cart">
                                    <Link to={`/product/${item.id}`}
                                    >
                                        <Typography variant="h6"
                                            classes={{ root: clases.productName }}
                                        >{item.name}</Typography>
                                    </Link>

                                    <div className="info-cantidad">
                                        <QuantitySelect
                                            {...{
                                                item, updateCart, clases
                                            }}
                                        />
                                        <Button

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
                                <p className="cart-price">{item.price} $</p>
                            </div>
                            <Divider />
                        </div>
                    )
                })}
            </Paper>

            <div className="resumen"
            >
                <Paper
                    classes={{ root: clases.manualdark }}
                >
                    <List>
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
        </>

    )
}


const QuantitySelect = ({ item, updateCart, clases }) => {
    return (
        <FormControl variant="outlined"
            classes={{ root: clases.selectwrap }}
        >
            <Select
                classes={{ outlined: clases.padder }}
                mb={0}
                inputProps={{ name: item.id }}
                defaultValue={item.qty}
                onChange={(e) => { updateCart(e) }}>

                {[...Array(item.stock).keys()].map((itam, index) => {

                    return <MenuItem key={index + 1}
                        value={index + 1}
                    >{index + 1}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}


