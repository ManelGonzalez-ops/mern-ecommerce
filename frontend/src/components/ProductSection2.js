import React, { useEffect, useState, Fragment, useLayoutEffect, useRef } from 'react';
import ReactDOM from "react-dom"
import { useSelector, useDispatch } from "react-redux"
import { listProducts, searchByCartegory } from '../actions/productActions';

import ProductDispatcher from "./ProductDispatcher"

import Aside from './Aside';

import { AppBar, Box, Button, CircularProgress, IconButton, makeStyles, Select, Typography, useTheme } from '@material-ui/core';

import { StickyBar } from './StickyBar';

import CustomButton from './CustomButton';
import { Pagination, Skeleton } from "@material-ui/lab"
import { useDataLayer } from '../Context';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1
    },
    pagination: {
        justifyContent: "center",
        margin: "2em 0"
    },
    selecta: {
        left: props => props.viewport > 800 ? "7.5%" : "2.5%",
        position: "absolute",
        display: "flex",
        alignItems: "center"
    }
}))



export const ProductSection2 = () => {
    const stickyLabel = useRef(null)
    const galerie = useRef(null)
    const aside = useRef(null)
    const [searchIconWidth, setSearchIconWidth] = useState(0)
    const [selectIconWidth, setSelectIconWidth] = useState(0)
    const [selectFilter, setSelectFilter] = useState("lower price")
    const [searchFilter, setSearchFilter] = useState("")
    const [openAside, setOpenAside] = useState(false)
    const [category, setCategory] = useState("")
    const { viewport, isDark } = useDataLayer()
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const dispatch = useDispatch()


    const [hasBeenTouched, setHasBeenTouched] = useState(false)

    const [active, setActive] = useState("")
    const navHeight = useRef(0)
    const barra = useRef(null)
    const grid = useRef()
    const firstRender = useRef(true)
    const [isOut, setIsOut] = useState(false)
    //use this to avoid memory leaks by unmounted components that handle async operations
    const isMounted = useRef(null)
    const [isLoading, setIsLoading] = useState(true)

    const [isColored, setIsColored] = useState(false)
    const [resultsPerPage, setResultPerPage] = useState(20)
    const [pagination, setPagination] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        let timer
        if (!loading) {
            timer = setTimeout(() => {
                setIsLoading(false)
             
            }, 800)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [loading])



    const closeAside = () => {
        setOpenAside(false)
    }


    const handleBlur = (which) => {
        if (viewport < 500) {
            setActive("")
        } else {
            setActive(prev => prev.filter(item => item !== which))
        }
    }

    const handleFocus = (which) => {
        viewport < 500 ?
            setActive(which)
            :
            setActive(prev => [...prev, which])
    }

    const tema = useTheme()

    //vamos a hacer aparecer la navegacio justo cuando toquemos el techo


    const handleStikyPosition = (e) => {
        //here are doing a bit complex and lets explain:

        //1. add fixed when we scroll all the height stickyLabel component
        if (stickyLabel.current && galerie.current) {

            if (stickyLabel && stickyLabel.current.getBoundingClientRect().top < 0) {
                if (stickyLabel.current.style.position !== "fixed") {
                    document.querySelector(".app-wrapper").style.opacity = 0
                    document.querySelector(".app-wrapper").style.animation = "none"
                
                    // galerie.current.style.paddingTop = window.pageYOffset + "px"
                    // galerie.current.style.paddingTop = stickyLabel.current.getBoundingClientRect().height + "px"
                    galerie.current.style.height = `${stickyLabel.current.getBoundingClientRect().height}px`
                    stickyLabel.current.style.transform = "translateX(-50%)"
                    stickyLabel.current.style.position = "fixed"
                    stickyLabel.current.style.boxShadow = "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px"
                    stickyLabel.current.style.backgroundColor = "#3f51b5"
                    galerie.current.style.transition = "none"
                    setIsColored(true)

                }


            }
            //2.Check when galerie has just left a height equivalent to the stickyLabel to show its top at the begining of the viewport. or we can when we see space between the top of the vieport and the top of the galerie.

            else if (stickyLabel && stickyLabel.current && galerie.current.getBoundingClientRect().top > 0) {

                if (stickyLabel.current.style.position === "fixed") {
                    stickyLabel.current.style.backgroundColor = !isDark ? "white" : "#424242"
                    document.querySelector(".app-wrapper").style.animation = "fadein 0.5s ease forwards"
                    stickyLabel.current.style.boxShadow = "none"
                    galerie.current.style.transition = "height 0.3s ease"
                    // galerie.current.style.paddingTop = 0
                    stickyLabel.current.style.transform = "translateX(0)"
                    stickyLabel.current.style.position = "static"
                    galerie.current.style.height = 0
                    setIsColored(false)

                }

            }

        }
    }


    useLayoutEffect(() => {
        isMounted.current = true
        if (isMounted.current) {
            dispatch({ type: "SET_CURRENT_PATH", payload: "hide" })
            dispatch(listProducts())
        }

        if (barra.current) {
            navHeight.current = barra.current.getBoundingClientRect()
        }

        stickyLabel.current.style.transition = "none"
        window.addEventListener("scroll", handleStikyPosition)


        return () => {
            window.removeEventListener("scroll", handleStikyPosition)
            isMounted.current = false
        }
    }, [isDark])


    // }


    //category
    const handleCategorySearch = (categoryType) => {
        dispatch(searchByCartegory(categoryType))
        setOpenAside(false)
        setCategory(categoryType)
    }



    const goBack = () => {
        dispatch(listProducts())
    }

    const getIconsWidth = (which, val) => {
        switch (which) {
            case "search":
                setSearchIconWidth(val)
            case "select":
                setSelectIconWidth(val)
        }

    }

    useEffect(() => {
        if (!firstRender.current) {
            if (!active.includes("select")) {
                setIsOut(false)
            }
        }
        else {
            firstRender.current = false
        }
    }, [active])

    const slices = [
        { page: 1, data: [] }
    ]

    const updatePageNumber = (resultsXPage) => {
        if (products) {
            const pageNumber = Math.ceil(products.length / resultsXPage)
            setTotalPages(pageNumber)
        }
    }
    useEffect(() => {
        updatePageNumber(resultsPerPage)
    }, [resultsPerPage, products])

    useEffect(() => {
        if (products) {

            setPagination(Array(totalPages).fill(null).map((item, index) => ({
                page: index + 1,
                data: products.slice(index * resultsPerPage, index * resultsPerPage + resultsPerPage)
            })))
        }

    }, [totalPages, products])

    const handleUpdatePagination = (e) => {
        setResultPerPage(e.target.value)
        setCurrentPage(1)
    }

    const clases = useStyles({ viewport })

    return (

        <div
            style={{ minHeight: "80vh" }}
        >

            <StickyBar
                ref={stickyLabel}
                setOpenAside={setOpenAside}
                goBack={goBack}
                category={category}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
                viewport={viewport}
                handleFocus={handleFocus}
                active={active}
                getIconsWidth={getIconsWidth}
                handleBlur={handleBlur}
                selectFilter={selectFilter}
                setSelectFilter={setSelectFilter}
                searchIconWidth={searchIconWidth}
                selectIconWidth={selectIconWidth}
                isColored={isColored}
                isOut={isOut}
                setIsOut={setIsOut}
            />

            {
                viewport < 500 && <FixedButton
                    style={{ position: "fixed", bottom: "5%", left: "5%" }}
                    onClick={() => { setOpenAside(true) }}
                />}




            <Aside
                ref={aside}
                search={handleCategorySearch}
                isOpen={openAside} closeAs={closeAside} />


            {isLoading ? <ResponsiveSkeleton
                viewport={viewport} />
                :
                error ? <ErrorMsg error={error} goBack={goBack} />
                    :
                    <Fragment>
                        <div ref={galerie} style={{ background: "transparent", width: "100%" }}></div>
                        <div className="product-grid"
                            ref={grid}
                        >
                            <ProductDispatcher
                                openAside={openAside}
                                products={pagination.length > 0
                                    && pagination.find(item => item.page === currentPage)
                                    && pagination.find(item => item.page === currentPage).data
                                } />
                        </div>
                        <Box
                            position="relative"
                            display="flex"
                            alignItems="center"
                            mb="3rem"
                        >
                            {
                                viewport > 800 &&
                                (
                                    <Box
                                        className={clases.selecta}
                                    >
                                        <Typography
                                            style={{ marginRight: "0.5rem" }}
                                        >Results per page:</Typography>
                                        <Select
                                            value={resultsPerPage}
                                            onChange={handleUpdatePagination}
                                        >
                                            {Array(5).fill(0).map((item, index) => (
                                                <option 
                                                key={index}
                                                value={(index + 1) * 5}
                                                >
                                                    {(index + 1) * 5}
                                                </option>
                                            ))}
                                        </Select>
                                    </Box>)}

                            <Pagination
                                classes={{ root: clases.root, ul: clases.pagination }}
                                color="secondary"
                                count={totalPages}
                                onChange={(e, newPage) => { setCurrentPage(newPage) }}
                            />

                        </Box>
                    </Fragment>
            }

        </div>
    );
}

const FixedButton = (props) => ReactDOM.createPortal(<CustomButton {...props} />, document.getElementById("portal"));


const ResponsiveSkeleton = ({ viewport }) => {


    if (viewport < 500) {

        return <Skeleton width="95vw" height="100vh" />
    }

    return (
        <div className="product-grid">
            {Array(8).fill(0).map((item, index) => (
                <div style={{ marginBottom: "1.5rem" }} key={index}>
                    <Skeleton variant="rect" animation="wave" height={200}
                        style={{ marginBottom: "1rem" }}
                    />
                    {Array(5).fill(0).map((item, index) =>
                        (<Skeleton
                            key={index}
                            style={{ marginBottom: "4px" }} />)
                            )}
                </div>
            ))}
        </div>
    )

}

const ErrorMsg = ({ error, goBack }) => {

    return (
        <div
            className="products-error">
            <p>{error}</p>
            <Button
                variant="outlined"
                onClick={goBack}
            >
                Go Back
        </Button>
        </div>
    )
}



export const CloseBtnAside = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" viewBox="0 0 18 18" className="svg-icons"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" /></svg>


export const SearchIcon = () => <svg width="25" height="26" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icons fixed">
    <path d="M18.7806 3.2543C20.5638 5.05474 21.6799 7.41807 21.9422 9.94897C22.2045 12.4799 21.597 15.0248 20.2214 17.1581C20.4615 17.3599 20.6616 17.5819 20.9418 17.7837C21.342 18.1066 21.8823 18.5102 22.5627 18.9743C23.2431 19.4586 23.6833 19.7613 23.8834 19.9228C24.7239 20.5483 25.3442 21.073 25.7645 21.4968C26.4048 22.1425 26.9651 22.8085 27.4454 23.5148C27.9457 24.2211 28.3259 24.9072 28.6261 25.6135C28.9062 26.3198 29.0463 26.9857 28.9863 27.6314C28.9463 28.2772 28.7061 28.822 28.2659 29.266C27.8256 29.71 27.2853 29.9521 26.645 29.9925C26.0246 30.0328 25.3442 29.9118 24.6639 29.6091C23.9635 29.3265 23.2631 28.9229 22.5827 28.4185C21.8823 27.9341 21.2219 27.3691 20.5816 26.7234C20.1613 26.2996 19.641 25.674 19.0407 24.8466C18.8406 24.5843 18.5404 24.1403 18.1002 23.5148C17.6599 22.869 17.2997 22.3645 16.9795 21.9407C16.6594 21.5372 16.3992 21.2345 16.099 20.9318C14.022 22.0285 11.652 22.4281 9.33408 22.0724C7.01617 21.7167 4.87134 20.6243 3.2118 18.9541C-1.0706 14.6155 -1.0706 7.57277 3.2118 3.2543C4.23362 2.22264 5.44708 1.40421 6.78278 0.845815C8.11849 0.287417 9.55024 0 10.9962 0C12.4421 0 13.8739 0.287417 15.2096 0.845815C16.5453 1.40421 17.7587 2.22264 18.7806 3.2543V3.2543ZM15.959 16.0886C17.2663 14.7607 17.9999 12.9653 17.9999 11.0941C17.9999 9.22292 17.2663 7.4276 15.959 6.09964C15.3092 5.44251 14.5373 4.92113 13.6874 4.56539C12.8375 4.20964 11.9264 4.02652 11.0062 4.02652C10.086 4.02652 9.17483 4.20964 8.32493 4.56539C7.47504 4.92113 6.70312 5.44251 6.0534 6.09964C5.40176 6.75483 4.88473 7.53325 4.53195 8.3903C4.17918 9.24735 3.99759 10.1662 3.99759 11.0941C3.99759 12.0221 4.17918 12.9409 4.53195 13.798C4.88473 14.655 5.40176 15.4334 6.0534 16.0886C6.70312 16.7458 7.47504 17.2671 8.32493 17.6229C9.17483 17.9786 10.086 18.1617 11.0062 18.1617C11.9264 18.1617 12.8375 17.9786 13.6874 17.6229C14.5373 17.2671 15.3092 16.7458 15.959 16.0886V16.0886Z" fill="#9a1b0e" />
</svg>





