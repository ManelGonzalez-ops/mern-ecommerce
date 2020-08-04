import React, { useEffect, Fragment, useState, useRef } from 'react'

import { useSelector, useDispatch } from "react-redux"
import ModalPayment from "./modalPayment"
import StepTimeline from "./StepTimeline"


export default function Checkout(props) {

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


        // console.log(props.history.location.pathname, "pagina actual")
        // localStorage.setItem("lastUrl", JSON.stringify(props.history.location.pathname))
    }, [])

    useEffect(() => {
        if (modalIsOpen) {
            mask.current.addEventListener("click", handleModalMask)
        }
        return () => mask.current.removeEventListener("click", handleModalMask)
    }, [modalIsOpen])


    return (
        <Fragment>

            <div className="checkout__wrap">
                <div className="checkout__container">
                    <div className="info">
                        <div className="info__section">
                            <h2>Shipping</h2>
                            <div className="shippingInfo">

                                {shippingInfo ?
                                    <Fragment>
                                        <p>{shippingInfo.address}</p>
                                        <p>{shippingInfo.city}</p>
                                        <p>{shippingInfo.postal}</p>
                                        <p>{shippingInfo.country}</p>
                                    </Fragment>
                                    :
                                    <p>No info provided</p>
                                }
                            </div>
                        </div>
                        <div className="info__section">
                            <h2>Payment</h2>
                            <p >Payment method: Paypal</p>
                        </div>
                        <div className="info__section">
                            <h2>Order</h2>
                            <p className="floatedd">Price</p>

                            {cartItems && cartItems.length !== 0 &&
                                cartItems.map((item, index) => {
                                
                                    return (
                                        <div key={index} className="item__table">
                                            <img src="https://nodereact-ecommerce-app.herokuapp.com/images/p1.jpg" alt="panalones" />
                                            <div className="cell__2">
                                                <p>{item.name}</p>
                                                <p className="qty">Quantity: {item.qty}</p>
                                            </div>
                                            <p className="priceC">${item.price}</p>
                                        </div>)
                                }
                                )}
                        </div>
                    </div>
                    <div className="summary">
                        <button className="button-pnp" onClick={() => { setModalIsOpen(true) }}>Place Order</button>
                        <h2 className="caption">Summary</h2>
                        <div className="summary__item">
                            <p>Items</p>
                            <p>{cartItems.reduce((total, item) => total + parseInt(item.qty, 10), 0)} uds</p>

                        </div>
                        <div className="summary__item">
                            <p>Shipping</p>
                            <p>$13</p>
                        </div>
                        <div className="summary__item">
                            <p>Tax</p>
                            <p>$23</p>
                        </div>
                        <div className="summary__item amazone">
                            <h2>Order Total</h2>
                            <h2>
                                {
                                    parseFloat(cartItems.reduce((total, item) => total + (item.qty * item.price), 0).toFixed(2))
                                }</h2>
                        </div>

                    </div>
                </div>
            </div>

            <div className={modalIsOpen ? "payment-mask" : "payment-mask hide"}
                ref={mask} ></div>
            <ModalPayment modalOpen={modalIsOpen} setModal={setModalIsOpen} />

        </Fragment>
    )
}
