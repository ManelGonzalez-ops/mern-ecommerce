import React, {Fragment} from 'react'

export default function CartEmpty() {
    return (
        
        

            <Fragment>
                <div className="right">
                
                    <div className="header">
                        <h1>Shopping Cart</h1>

                        <span style={{display: "flex", alignSelf: "center", background: "red", color: "white"}}>No items</span> 
                        
                        <p className="price-title">Price:</p>
                    </div>
                    <hr />

                    <div className="cart-content">
                        
                        <div className="info-cart">


                            <div className="info-cantidad">

                                Qty:
                                                        <select

                                >
                                    <option value="0">0uds</option>

                                </select>

                            </div>

                        </div>
                        <p className="cart-price">0€</p>
                    </div>

                </div>

                <div className="left">


                    <div className="box">
                        <p className="box-total">Subtotal
                        (
                                        <span>
                                0€
                                </span>

                                products)
                                     <span>

                            </span>0€</p>

                    </div>
                </div>
            </Fragment>

        
    )
}
