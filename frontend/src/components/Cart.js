import React, { useEffect, Fragment, useState } from 'react'
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { cartProduct, cartModification } from "../actions/cartActions"

export default function Cart(props) {
    const { productId } = props.match.params
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const { cartItems, loading, error } = useSelector(state => state.cart)

    const [newCart, setNewCart] = useState(["", ""])

    const dispatch = useDispatch()
    useEffect(() => {
        if (productId) {
            dispatch(cartProduct(productId, qty))
        }
    }, [])


    const updateCart = (e) => {
        const { name, value } = e.target
        // props.history.push(`/cart/${name}?qty=${value}`)
        if(value){
            console.log("ahora...", value, name)
        dispatch(cartModification(name, value))
        }
        else{
            console.log("ahora...", name)
            dispatch(cartModification(name))
        }
    }

    const toCheckout=()=>{
        // props.history.push("/signin?redirect=shipping")
    }

    

    
    return (

        <div className="cart">
            {loading ? <p>Loading...</p>
                :
                error ? <p>{error.message}</p>
                    :
                    cartItems.length &&
                    <Fragment>
                        <div className="right">
                            <div className="header">
                                <h1>Shopping Cart</h1>
                                <p>{cartItems.map(item => item.price * item.qty).reduce((total, valor) => total + valor)} $</p>
                            </div>
                            <hr />
                            <div>

                                {cartItems.map(item => {
                                    console.log(item, "aaquuuuuuui")
                                    return (
                                        <div key={item.id}>
                                            <div className="cart-content">
                                                <img src="https://node-react-ecommerce-app.herokuapp.com/images/p2.jpg" alt="pantalones" />
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
                                                        <button className="delete" onClick={(e)=>updateCart(e)}
                                                        name={item.id}
                                                        >delete</button>
                                                    </div>
                                                </div>
                                                <p className="cart-price">{item.price}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="left">
                            <div className="box">
                                <p>Subtotal
                                (
                                        <span>
                                        {cartItems.reduce((x, y) => x + parseInt(y.qty), 0)}</span>

                                products)
                                     <span>
                                        {cartItems.map(item => item.price * item.qty).reduce((total, valor) => total + valor)}
                                    </span>$</p>

                                <button 
                                disabled={cartItems.length === 0}
                                onClick={toCheckout}
                                >proceed to checkout</button>
                            </div>
                        </div>
                    </Fragment>
            }
        </div>
    )
}
