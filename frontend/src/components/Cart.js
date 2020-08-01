import React, { useEffect, Fragment, useState } from 'react'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { cartProduct, cartModification } from "../actions/cartActions"
import isEmpty from "../utils/emptyObject"
import Cookie from "js-cookie"
import CartEmpty from "./CartEmpty"
import {Loader1} from "./Products"
import useScrollTop from "../utils/useScrollTop"



export default function Cart(props) {

    useScrollTop()
    
    const { productId } = props.match.params
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const { cartItems, loading, error } = useSelector(state => state.cart)

  

    useEffect(() => {
        if (!loading) {
            
            Cookie.set("cartItems", JSON.stringify(cartItems))
            console.log("xuuuuuuuuuuupa Nhjaknnkjlshdsjkdhvsbsjgdbuhsjgdbsjdb")
            console.log(Cookie.getJSON("cartItems"), "PERO QUE COÑO")
        }
    }, [loading])


    const dispatch = useDispatch()

//adds one product every time (clicking in details), updating cartItem array
    useEffect(() => { 
        console.log(cartItems, "CAAAART ITENSSJASBHGDV")
        console.log("mmmmmmmmmmmmamamasmasmsmamasmamas")
        if (productId) {
            console.log("mamamelaaaa")
            dispatch(cartProduct(productId, qty))
        }
      
    }, [])

    


    const updateCart = (e) => {
        const { name, value } = e.target
        // props.history.push(`/cart/${name}?qty=${value}`)
        if (value) {
            console.log("ahora...", value, name)
            dispatch(cartModification(name, value))
        }
        else {
            console.log("ahora...", name)
            dispatch(cartModification(name))
        }
    }

    const user = useSelector(state => state.userSignin)
    const { userInfo } = user
    const toCheckout = () => {
        console.log(userInfo, "useeeer info")
        if (isEmpty(userInfo)) {

            props.history.push("/signin?redirect=shipping")

        }

        else {
            props.history.push("/shipping")
        }

    }

    const { currentOrder } = useSelector(state => state.currentOrder)



    return (

        <div className="cart">
            
            {
            cartItems.length === 0 ? <CartEmpty/>
            :
            loading ? <Loader1/>
                :
                error ? <p>{error.message}</p>
                    :
                    cartItems.length &&
                    <Fragment>
                   
                        <div className="right">
                            <div className="header">
                                <h1>Shopping Cart</h1>
                                <p className="price-title">Price:</p>
                            </div>
                            <hr />

                            {cartItems && cartItems.map(item => {
                                console.log(item, "aaquuuuuuui")
                                return (

                                    <div key={item.id} className="cart-content">
                                        <img src={item.image} alt="pantalones" />
                                        <div className="info-cart">
                                            <Link to={`/product/${item.id}`}
                                            ><h3>{item.name}</h3></Link>

                                            <div className="info-cantidad">

                                                Qty:
                                                        <select
                                                    defaultValue={item.qty}
                                                    onChange={(e) => updateCart(e)}
                                                    name={item.id}
                                                >
                                                    {[...Array(item.stock).keys()].map((itam, index) => {

                                                        return <option key={index + 1} value={index + 1}>{index + 1}</option>
                                                    }
                                                    )}
                                                </select>
                                                <button className="delete" onClick={(e) => updateCart(e)}
                                                    name={item.id}
                                                >delete</button>
                                            </div>

                                        </div>
                                        <p className="cart-price">{item.price}</p>
                                    </div>

                                )
                            })}
                        </div>

                        <div className="left">


                            <div className="box">
                                <p className="box-total">Subtotal
                                (
                                        <span>
                                        {cartItems.reduce((x, y) => x + parseInt(y.qty), 0)}</span>

                                products)
                                     <span>
                                        {cartItems.map(item => item.price * item.qty).reduce((total, valor) => total + valor)}
                                    </span>$</p>
                                {currentOrder && Object.keys(currentOrder).length !== 0 ?
                                    <button
                                        className="button-pnp"
                                        disabled={cartItems.length === 0}
                                        onClick={toCheckout}
                                    >continue checkout</button>
                                    :
                                    <button
                                        className="button-pnp"
                                        disabled={cartItems.length === 0}
                                        onClick={toCheckout}
                                    >proceed to checkout</button>}
                            </div>
                        </div>
                    </Fragment>
            }
       </div>
    )
}

