import React, { useState, useEffect, Fragment } from 'react'
import Products from "../data"
import { useSelector, useDispatch } from "react-redux"
import { detailsProduct } from "../actions/productActions"

export default function Details(props) {
    const [quantity, setQuantity] = useState(2)
    const { productId } = props.match.params
   
    const productDetails = useSelector(state => state.productDetails)
    const { details, loading, error } = productDetails
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(detailsProduct(productId))
    }, [])

    const handleAddToCart =()=>{
        props.history.push(`/cart/${productId}?qty=${quantity}`)
    }

    const handleNotFound=()=>{
        props.history.push("/")
    }
    return (
        <Fragment>
            {loading ? <p>Loading...</p> :
                error ? <p>{error}</p> :
                    (
                    <Fragment>
                        { details.stock ?
                        <Fragment>
                        <select value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}>
                            {[...Array(details.stock).keys()].map((item,index)=>{
                                
                                return <option key={index + 1}>{index + 1}</option>
                            })}
                        </select>
                        <button onClick={handleAddToCart}>Add to Cart</button>
                        </Fragment>
                        :
                        <div className="details_notfound">
                            <button onClick={handleNotFound}>The product is out of stock, sorry.</button>
                        </div>
                        }
                        <div>
                        {details.name}
                    </div>
                    </Fragment>)}
        </Fragment>
    )
}
