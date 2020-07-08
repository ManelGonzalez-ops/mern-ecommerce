import React, { useEffect, Fragment, useState, useRef } from 'react'
import Cookie from "js-cookie"



export default function Checkout({ match }) {

    const [info, setInfo] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState({ error: false, msg: "" })

    useEffect(() => {

        const userInfo = Cookie.getJSON("userInfo")
        const orderId = match.params.id

        const fecharOrderDetails = async () => {

            try {
                const rawData =
                    await fetch(`http://localhost:8000/orders/order/${orderId}`, {
                        headers: {
                            "Authorization": `Bearer ${userInfo}`
                        }
                    })

                const { data } = await rawData.json()
                setInfo(data)
                console.log(info, "laaadata")
                setLoading(false)

            } catch (err) {
                console.log(err.message, "errorrrr")
                setLoading(false)
                setError(() => ({
                    error: true,
                    msg: err.message
                }))
            }



        }

        fecharOrderDetails()

    }, [])


    return (
        <Fragment>

            <div className="checkout__wrap">
                {loading? <div>Loading...</div>
                :
                error.error ? <div>Loading...</div>
            :
                <div className="checkout__container">
                    <div className="info">
                        <div className="info__section">
                            <h2>Shipping</h2>
                            <div className="shippingInfo">

                            
                                        <p>{info.order.shipping.address}</p>
                                        <p>{info.order.shipping.city}</p>
                                        <p>{info.order.shipping.postal}</p>
                                        <p>{info.order.shipping.country}</p>
                                    
                            </div>
                        </div>
                        <div className="info__section">
                            <h2>Payment</h2>
                            <p >Payment method: Paypal</p>
                <p >Date Added: {info.order.dateAdded}</p>

                        </div>
                        <div className="info__section">
                            <h2>Order</h2>
                            <p className="floatedd">Price</p>

                            {info.orderItemsArray.map(item => {
                                    console.log(item)
                                    return (
                                        <div className="item__table">
                                            <img src="https://nodereact-ecommerce-app.herokuapp.com/images/p1.jpg" alt="panalones" />
                                            <div className="cell__2">
                                                <p>{item.name}</p>
                                                <p className="qty">Quantity: {item.quantity}</p>
                                            </div>
                                            <p className="priceC">${item.price}</p>
                                        </div>)
                                }
                                )}
                        </div>
                    </div>
                    <div className="summary">
                        
                        <h2 className="caption">Order Total</h2>
                        <div className="summary__item">
                            <p>Items</p>
                            <p>{info.orderItemsArray.reduce((total, item) => total + parseInt(item.quantity, 10), 0)} uds</p>

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
                            <h2>{info.orderItemsArray.reduce((total, item) => total + (item.quantity * item.price), 0)}</h2>
                        </div>

                    </div>
                </div>
                }
            </div>



        </Fragment>
    )
}
