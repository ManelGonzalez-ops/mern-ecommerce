import React, { useState, useEffect, Fragment, useRef, useLayoutEffect, useDebugValue } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { detailsProduct, addReview } from "../actions/productActions"
import RatingStars from "./ratingStar"
import Cookie from "js-cookie"
import useScrollTop from "../utils/useScrollTop"
import { Box, Button, Chip, Divider, FormControl, List, ListItem, makeStyles, MenuItem, Select, Snackbar, Typography, useTheme } from "@material-ui/core"
import Image from "material-ui-image"
import { motion, useCycle } from 'framer-motion'
import LibraryAddIcon from '@material-ui/icons/LibraryAdd'
import { useLocation } from 'react-router-dom'
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { Loader } from './Loader'
import { Alert } from '@material-ui/lab'

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
    }

}))


export function Details(props) {

    useScrollTop()

    const [review, setReview] = useState("")
    const [ratingSelect, setRatingSelect] = useState(3)
    const [quantity, setQuantity] = useState(0)
    const { productId } = props.match.params
    const productDetails = useSelector(state => state.productDetails)
    const { details, loading, error } = productDetails
    const dispatch = useDispatch()
    const [openAlert, setOpenAlert] = useState(false)
    const selectQty = useRef(null)
    const [shake, setShake] = useState(false)
    useDebugValue(shake)
    useEffect(() => {

        dispatch(detailsProduct({productId}))

    }, [])
    const loc = useLocation()

    useEffect(() => {
        if (selectQty.current) {
            selectQty.current.focus()
        }
    }, [details])

    const handleAddToCart = () => {
        if (!quantity) {
            setOpenAlert(true)
            cycleAnimation()
            return
        }
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
    //const [animation, cycleAnimation] = useCycle("animationOne")
    const cycleAnimation = async () => {
        setShake(true)
        const animDuration = () => {
            return new Promise((resolve) => {
                let timer = setTimeout(() => {
                    clearTimeout(timer)
                    resolve()
                }, 500)
            })
        }
        await animDuration()
        setShake(false)
    }
    const selectVariants = {
        animationOne: {
            y: [5, -5],
            transition: {
                repeatType: "switch",
                y: {
                    repeat: 2,
                    duration: 0.25,
                    ease: "easeIn"
                }
            },
            transitionEnd: {
                y: 0
            }
        },
    }

    return (

        <div className="container-details" style={{ minHeight: "90vh", marginTop: "2rem" }}
            data-testid="details-view"
        >
            {loading ? <Loader />
                :
                error ? <p
                    data-testid="error-msg"
                >{error}</p> :
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
                                                    data-testid={`producto-${details.name}`}
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
                                                    <motion.div
                                                        variants={selectVariants}
                                                        animate={shake && "animationOne"}
                                                    >
                                                        <FormControl variant="outlined"
                                                        >

                                                            <Select
                                                                ref={selectQty}
                                                                aria-label="select-quantity"
                                                                mb={0}
                                                                defaultValue={0}
                                                                value={quantity}
                                                                onChange={(e) => { setQuantity(e.target.value) }}>
                                                                <MenuItem value={0} disabled={true}>0</MenuItem>
                                                                {[...Array(details.stock).keys()].map((item, index) => {
                                                                    return (<MenuItem key={index + 1}
                                                                        value={index + 1}
                                                                    >{index + 1}</MenuItem>)
                                                                })}
                                                            </Select>
                                                        </FormControl>
                                                    </motion.div>
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

                                    <AlertEmpty {...{ openAlert, setOpenAlert }} />
                                </>

                            }
                            :
                            <p
                                data-testid="no-stock-msg"
                            >No units left for {details.name}</p>

                        </>)}

        </div>

    )
}

const AlertEmpty = ({ openAlert, setOpenAlert }) => {

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;

        setOpenAlert(false)
    }
    return (

        <Snackbar open={openAlert} autoHideDuration={4000} 
        onClose={handleClose}
        >
            <Alert onClose={handleClose} 
            severity="error"
            >
                Choose a quantity to continue
        </Alert>
        </Snackbar>
    )
}

const Imoge = (props) =>
    <Image {...props} />


