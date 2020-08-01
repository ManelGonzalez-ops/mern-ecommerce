import React, { useState, useEffect, Fragment } from 'react'
import Products from "../data"
import { useSelector, useDispatch } from "react-redux"
import { detailsProduct, addReview } from "../actions/productActions"
import isEmpty from "../utils/emptyObject"
import RatingStars from "./ratingStar"
import Cookie from "js-cookie"
import {Loader1} from "./Products"
import IconSection from "./shoppingIcons"
import useScrollTop from "../utils/useScrollTop"

export default function Details(props) {

    useScrollTop()

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
        <div className="container-details">
            <SvgShop/>
        <IconSection/>
            {loading ? <Loader1/> :
                error ? <p>{error}</p> :
                    (
                        <Fragment>
                            {details.stock ?
                                <Fragment>


                                    <div className="details-wrapper">
                                        <img src={details.image} alt="pantalones" />
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
        </div>
    )
}



const SvgShop = () =>
    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: "fixed", right: "2rem", bottom:"2rem", cursor: "pointer"}}>
         <circle cx="18.5" cy="18.5" r="18.5" fill="#EDD81A" />
        <path d="M2 19.9995H16C16.5304 19.9995 17.0391 19.7888 17.4142 19.4138C17.7893 19.0387 18 18.53 18 17.9995V6.99954C18 6.73432 17.8946 6.47997 17.7071 6.29243C17.5196 6.1049 17.2652 5.99954 17 5.99954H14V5.22254C14 2.61354 12.097 0.277539 9.5 0.0245389C8.80487 -0.0445489 8.10298 0.0326398 7.43949 0.251139C6.77599 0.469638 6.16557 0.824609 5.64752 1.29321C5.12946 1.76182 4.71524 2.33368 4.43149 2.97201C4.14774 3.61033 4.00076 4.30099 4 4.99954V5.99954H1C0.734784 5.99954 0.48043 6.1049 0.292893 6.29243C0.105357 6.47997 0 6.73432 0 6.99954V17.9995C0 18.53 0.210714 19.0387 0.585786 19.4138C0.960859 19.7888 1.46957 19.9995 2 19.9995ZM14 7.99954V9.99954H12V7.99954H14ZM6 4.99954C6 3.34554 7.346 1.99954 9 1.99954C10.654 1.99954 12 3.34554 12 4.99954V5.99954H6V4.99954ZM4 7.99954H6V9.99954H4V7.99954Z" fill="black" />
    </svg>