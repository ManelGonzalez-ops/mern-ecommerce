import React, { useState, useEffect, Fragment } from 'react'
import Products from "../data"
import { useSelector, useDispatch } from "react-redux"
import { detailsProduct, addReview } from "../actions/productActions"
import isEmpty from "../utils/emptyObject"
import RatingStars from "./ratingStar"
import Cookie from "js-cookie"
import {Loader1} from "./Products"
export default function Details(props) {

    const [review, setReview] = useState("")
    const [ratingSelect, setRatingSelect] = useState(3)
    const [quantity, setQuantity] = useState(2)
    const { productId } = props.match.params
    
    const productDetails = useSelector(state => state.productDetails)
    const { details, loading, error } = productDetails
    const dispatch = useDispatch()

    useEffect(() => {


        dispatch({ type: "SET_CURRENT_PATH", payload: "hide" })
        dispatch(detailsProduct(productId))

    }, [])

    const handleAddToCart = () => {
        props.history.push(`/cart/${productId}?qty=${quantity}`)
    }

    const handleNotFound = () => {
        props.history.push("/")
    }

    // const theReviews = useSelector(state=>state.reviews)
    // const {reviews, reviewError} = theReviews
    const userInfo = Cookie.getJSON("userInfo")

    const handleReview = (e) => {
        e.preventDefault()
        dispatch(addReview(productId, review, ratingSelect, userInfo.name))

    }



    return (
        <Fragment>
            {loading ? <Loader1/> :
                error ? <p>{error}</p> :
                    (
                        <Fragment>
                            {details.stock ?
                                <Fragment>


                                    <div className="details-wrapper">
                                        <img src="https://nodereact-ecommerce-app.herokuapp.com/images/p3.jpg" alt="pantalones" />
                                        <div className="flex-container">
                                            <div className="description1">
                                                <h2 className="details-name">{details.name}</h2>
                                                <p>Puntuación: <span>{details.rating}</span>
                                                    <RatingStars rating={details.rating} inline="no" /></p>

                                                <p>Precio: <span>{details.price}</span></p>
                                                <p>{details.description}</p>
                                            </div>
                                            <div className="description2">
                                                <p>Price: <span>{details.price}</span></p>
                                                <p className="status">Status: <span>In stock</span></p>
                                                <label> Quantity: &nbsp;
                                                <select value={quantity} onChange={(e) => { setQuantity(e.target.value) }}>
                                                        {[...Array(details.stock).keys()].map((item, index) => {

                                                            return <option key={index + 1}>{index + 1}</option>
                                                        })}
                                                    </select>
                                                </label>
                                                <button
                                                    className="button-pnp"
                                                    onClick={handleAddToCart}>Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>


                                </Fragment>
                                :
                                <div className="details_notfound">
                                    <button onClick={handleNotFound}>The product is out of stock, sorry.</button>
                                </div>
                            }

                        </Fragment>)}
        <div className="reviews-container">
            <h1>Reviews</h1>
            <ul className="reviews">
                {loading ? <p>Loading...</p> :
                    error ? <p>{error}</p> :
                        (
                            <Fragment>
                                {details.reviews && details.reviews.map(review =>
                                    <li>
                                        <p className="comment">{review.review}</p>
                                        
                                        <RatingStars display="inline" rating={review.rating} />
                                        
                                        <p className="author">{review.author}</p>
                                    </li>
                                )}
                            </Fragment>)}
            </ul>
            </div>
            <form className="form" onSubmit={handleReview}>
                <div className="form-group">
                <label htmlFor="review">Add Review</label>
                <textarea type="text" name="review" id="review"
                    onChange={(e) => { setReview(e.target.value) }}
                    value={review}
                    required
                />
                </div>
                <div className="form-group">
                <label>Add rating</label>
                &nbsp;
                &nbsp;
                <select value={ratingSelect}
                    onChange={(e) => { setRatingSelect(e.target.value) }}
                >
                    <option value="1" >1</option>
                    <option value="2" >2</option>
                    <option value="3" >3</option>
                    <option value="4" >4</option>
                    <option value="5" >5</option>
                </select>
                </div>
                <button className="review-btn" type="submit">Send</button>
            </form>
        </Fragment>
    )
}
