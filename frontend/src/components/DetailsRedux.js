import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { detailsProduct, addReview } from "../actions/productActions"
import RatingStars from "./ratingStar"
import Cookie from "js-cookie"
import useScrollTop from "../utils/useScrollTop"
import { Box, Button, Chip,  Divider, FormControl, List, ListItem, makeStyles, MenuItem, Select, Typography, useTheme } from "@material-ui/core"
import Image from "material-ui-image"
import { motion } from 'framer-motion'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import { useLocation } from 'react-router-dom'
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { Loader } from './Loader'

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
})

const styles = makeStyles(theme => ({
    listitem: {
        paddingTop: "0.7rem",
        paddingBottom: "0.7rem"
    },
    listheaders: {
        flex: 1
    },
    manualdark: {
        backgroundColor: theme.palette.type === "dark" ? "#303030" : "inherit"
    },


}))


export default function Details(props) {

    useScrollTop()

    const [review, setReview] = useState("")
    const [ratingSelect, setRatingSelect] = useState(3)
    const [quantity, setQuantity] = useState(0)
    const { productId } = props.match.params
    const productDetails = useSelector(state => state.productDetails)
    const { details, loading, error } = productDetails
    const dispatch = useDispatch()



    useEffect(() => {

        dispatch(detailsProduct(productId))

    }, [])
    const loc = useLocation()


    const handleAddToCart = () => {
        props.history.push(`/cart/${productId}?qty=${quantity}`)
    }

    // const theReviews = useSelector(state=>state.reviews)
    // const {reviews, reviewError} = theReviews
    const userInfo = Cookie.getJSON("userInfo")

    const handleReview = (e) => {
        e.preventDefault()
        dispatch(addReview(productId, review, ratingSelect, userInfo || "anonimous"))

    }


    const clases = styles();
    const tema = useTheme()

    return (

        <div className="container-details" style={{ minHeight: "90vh", marginTop: "2rem" }}>

            {loading ? <Loader/>
                 :
                error ? <p>{error}</p> :
                    (
                        <>
                            {details && details.stock > 0 &&
                                <>
                                    <div className="details-wrapper">


                                        <motion.img
                                            className="img-wrapper"
                                            src={details.image}
                                            alt={details.name}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        />


                                        <div className="flex-container">
                                            <Box
                                                className="description1"
                                                classes={{ root: clases.manualdark }}
                                            >
                                                <Typography
                                                    color="primary"
                                                    variant="h5"
                                                    style={{ marginBottom: "0.5rem", lineHeight: 1.4 }}
                                                >{details.name}</Typography>
                                                <Box mb="0.5rem" component="span">
                                                    <Typography
                                                        display="inline"
                                                    >
                                                        Puntuación:
                                                    </Typography>
                                                    <RatingStars rating={details.rating} inline="no"
                                                        noSpacing
                                                    />
                                                </Box >

                                                <Box mb={2}><Chip label={"Precio"} /> <Typography display="inline"
                                                    className="altura--corr">{details.price} $</Typography></Box>
                                                <Typography>{details.description}</Typography>
                                            </Box>
                                            <List className="description2"
                                                classes={{ root: clases.manualdark }}
                                            >

                                                <ListItem className={clases.listitem}>
                                                    <Typography
                                                        className={clases.listheaders}
                                                    >Price</Typography>
                                                    <Typography >{details.price} </Typography>

                                                </ListItem>
                                                <Divider />
                                                <ListItem className={clases.listitem}>
                                                    <Typography
                                                        className={clases.listheaders}>Status:</Typography> <Typography>In stock</Typography></ListItem>
                                                <Divider />
                                                <ListItem className={clases.listitem}>
                                                    <Typography
                                                        className={clases.listheaders}> Quantity: </Typography>

                                                    <FormControl variant="outlined"
                                                    >

                                                        <Select

                                                            mb={0}
                                                            inputProps={{ name: "hoal" }}
                                                            defaultValue={0}
                                                            value={quantity}
                                                            onChange={(e) => { setQuantity(e.target.value) }}>
                                                            <MenuItem value={0} disabled={true}>0</MenuItem>
                                                            {[...Array(details.stock).keys()].map((item, index) => {
                                                                return ( <MenuItem key={index + 1}
                                                                    value={index + 1}
                                                                >{index + 1}</MenuItem>)
                                                            })}
                                                        </Select>
                                                    </FormControl>

                                                </ListItem>
                                                <ListItem>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        startIcon={<LibraryAddIcon />}
                                                        onClick={handleAddToCart}>Add to Cart</Button>
                                                </ListItem>
                                            </List>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="reviews-container">
                                            <h1>Reviews</h1>

                                            <ul className="reviews">

                                                <Fragment>
                                                    {details.reviews && details.reviews.map((review, index) =>
                                                        <li key={index}>
                                                            <p className="comment">{review.review}</p>

                                                            <RatingStars display="inline" rating={review.rating} />

                                                            <p className="author">{review.author}</p>
                                                        </li>
                                                    )}
                                                </Fragment>
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
                                </>

                            }

                        </>)}

        </div>

    )
}

const Imoge = (props) =>
    <Image {...props} />


