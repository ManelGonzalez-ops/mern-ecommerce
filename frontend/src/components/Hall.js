import React, { useEffect, useState, Fragment, useLayoutEffect, useRef } from 'react';


import { useSelector, useDispatch } from "react-redux"
import { listProducts, sortProducts, searchProduct, searchByCartegory } from '../actions/productActions';

import Product from "./Products"
import {LoaderPnp, Loader1} from "./Products"



function App() {

    const [selectFilter, setSelectFilter] = useState("lower price")
    const [searchFilter, setSearchFilter] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [iconClicked, setIconClicked] = useState(false)
    const [filterClicked, setFilterClicked] = useState(false)
    const [openAside, setOpenAside] = useState(false)
    const [productHovered, setProductHovered] = useState(false)
    const spanToFade = useRef(null)
    const search = useRef(null)
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userSignin)
    const userRegister = useSelector(state => state.userSignup)

    const [hasBeenTouched, setHasBeenTouched] = useState(false)

    useEffect(() => {

        hasBeenTouched && dispatch(sortProducts(selectFilter))

    }, [selectFilter])


    useEffect(() => {

        dispatch({ type: "SET_CURRENT_PATH", payload: "hide" })
        dispatch(listProducts())

    }, [])




    const handleChangeFilter = (e) => {

        setSelectFilter(e.target.value)
        if (!hasBeenTouched) setHasBeenTouched(true)


    }

    const categoryList = ["Software", "Toys", "Hardware", "Accesories", "Kitchen & Dining", "Clothing & Jewelry", "Books", "Baby", "Sports", "Other"]

    const handleSearch = () => {
        spanToFade.current.style.display = "none"
        search.current.style.marginLeft = "7px"
        dispatch(searchProduct(searchFilter))
        setIsSearching(true)
    }

    const removeSearch = () => {
        setSearchFilter("")
        dispatch(listProducts())
        setIsSearching(false)
    }

    //category
    const handleCategorySearch = (categoryType) => {
        dispatch(searchByCartegory(categoryType))
        setOpenAside(false)
    }
    const handleHide = () => {


    }


    return (

        <Fragment>

            {loading ? <Loader1/>
                :
                error ? <p>{error}</p>
                    :
                    <div className="hall__container">

                        <div className="filter__container">

                            <div
                                ref={search}
                                className={iconClicked ? "filter-group left with-hide" : "filter-group left"}>
                                <span
                                    onClick={() => { setIconClicked(false) }}><HideIcon /></span>
                                <div className="responsive-inner search">

                                    <button className={iconClicked ? "btn-search-name animated" : "btn-search-name"} onClick={handleSearch} ><SearchIcon /></button>

                                    <input

                                        type="text" name="by-name" id="by-name"
                                        className={iconClicked ? "search-name animated" : "search-name"}
                                        value={searchFilter}
                                        onChange={(e) => {

                                            setSearchFilter(e.target.value)
                                        }} />
                                    {isSearching && <span className="close-search" onClick={removeSearch}>
                                        <CloseBtnAside />
                                    </span>}
                                    <span
                                        ref={spanToFade}
                                        id="spanAnimated" className={iconClicked ? "animated left" : "left"}
                                        onClick={() => { setIconClicked(true) }}><SearchIcon /></span>

                                </div>


                            </div>
                            <div className={filterClicked ? "filter-group with-hide right" : "filter-group right"}>
                                <span onClick={() => { setFilterClicked(false) }}><HideIcon /></span>
                                {/* <label htmlFor="sort-by">Sort By</label> */}
                                <div className="responsive-inner">
                                    <span
                                        id="spanAnimated" className={filterClicked ? "animated right" : "right"}
                                        onClick={() => { setFilterClicked(true) }}><SortIcon /></span>

                                    <span
                                        className={filterClicked ? "select-overflow animated" : "select-overflow"}
                                        style={{ display: "inline-block", width: "300px", overflow: "hidden" }}>

                                        <select id="sort-by"
                                            onChange={(e) => { handleChangeFilter(e) }}
                                            className={filterClicked ? "animated" : ""}
                                            value={selectFilter} >
                                            <option className={filterClicked ? "hasAnimated" : ""} value="higher price">higher price</option>
                                            <option className={filterClicked ? "hasAnimated" : ""}
                                                value="lower price">lower price</option>
                                            <option className={filterClicked ? "hasAnimated" : ""} value="newest">newest</option>
                                        </select>
                                    </span>

                                </div>
                            </div>
                        </div>

                        <p className={openAside ? "categories close" : "categories"}
                            onClick={() => { setOpenAside(true) }}
                        ><stong>Categories &#8594;</stong></p>
                        <aside className={openAside ? "aside open" : "aside"}>
                            <header className="header-aside">
                                <h3>Categories</h3>
                                <span
                                    onClick={() => { setOpenAside(false) }}>
                                    <CloseBtnAside /></span>
                            </header>
                            <ul>
                                {categoryList.map((item, index) => <li
                                    key={index}
                                    onClick={() => { handleCategorySearch(item) }}>{item}</li>)}
                            </ul>
                        </aside>
                        <div className="product-grid">

                            {products.map(item => {

                                return item && <Product key={item._id} item={item}/>
                                   
                            }
                            )}
                        </div>
                    </div>
            }

        </Fragment>
    );
}


export default App;

export const CloseBtnAside = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" viewBox="0 0 18 18" className="svg-icons"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" /></svg>

export const SortIcon = () => <svg className="svg-icons" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 0V22.5H0L9.375 30L18.75 22.5H11.25V0H7.5ZM15 0V3.75H22.5V0H15ZM15 7.5V11.25H26.25V7.5H15ZM15 15V18.75H30V15H15Z" fill="black" />
</svg>

export const SearchIcon = () => <svg width="25" height="26" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icons">
    <path d="M18.7806 3.2543C20.5638 5.05474 21.6799 7.41807 21.9422 9.94897C22.2045 12.4799 21.597 15.0248 20.2214 17.1581C20.4615 17.3599 20.6616 17.5819 20.9418 17.7837C21.342 18.1066 21.8823 18.5102 22.5627 18.9743C23.2431 19.4586 23.6833 19.7613 23.8834 19.9228C24.7239 20.5483 25.3442 21.073 25.7645 21.4968C26.4048 22.1425 26.9651 22.8085 27.4454 23.5148C27.9457 24.2211 28.3259 24.9072 28.6261 25.6135C28.9062 26.3198 29.0463 26.9857 28.9863 27.6314C28.9463 28.2772 28.7061 28.822 28.2659 29.266C27.8256 29.71 27.2853 29.9521 26.645 29.9925C26.0246 30.0328 25.3442 29.9118 24.6639 29.6091C23.9635 29.3265 23.2631 28.9229 22.5827 28.4185C21.8823 27.9341 21.2219 27.3691 20.5816 26.7234C20.1613 26.2996 19.641 25.674 19.0407 24.8466C18.8406 24.5843 18.5404 24.1403 18.1002 23.5148C17.6599 22.869 17.2997 22.3645 16.9795 21.9407C16.6594 21.5372 16.3992 21.2345 16.099 20.9318C14.022 22.0285 11.652 22.4281 9.33408 22.0724C7.01617 21.7167 4.87134 20.6243 3.2118 18.9541C-1.0706 14.6155 -1.0706 7.57277 3.2118 3.2543C4.23362 2.22264 5.44708 1.40421 6.78278 0.845815C8.11849 0.287417 9.55024 0 10.9962 0C12.4421 0 13.8739 0.287417 15.2096 0.845815C16.5453 1.40421 17.7587 2.22264 18.7806 3.2543V3.2543ZM15.959 16.0886C17.2663 14.7607 17.9999 12.9653 17.9999 11.0941C17.9999 9.22292 17.2663 7.4276 15.959 6.09964C15.3092 5.44251 14.5373 4.92113 13.6874 4.56539C12.8375 4.20964 11.9264 4.02652 11.0062 4.02652C10.086 4.02652 9.17483 4.20964 8.32493 4.56539C7.47504 4.92113 6.70312 5.44251 6.0534 6.09964C5.40176 6.75483 4.88473 7.53325 4.53195 8.3903C4.17918 9.24735 3.99759 10.1662 3.99759 11.0941C3.99759 12.0221 4.17918 12.9409 4.53195 13.798C4.88473 14.655 5.40176 15.4334 6.0534 16.0886C6.70312 16.7458 7.47504 17.2671 8.32493 17.6229C9.17483 17.9786 10.086 18.1617 11.0062 18.1617C11.9264 18.1617 12.8375 17.9786 13.6874 17.6229C14.5373 17.2671 15.3092 16.7458 15.959 16.0886V16.0886Z" fill="#9a1b0e" />
</svg>

const HideIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icons hide-icon">
    <path d="M6.72758 10.1617L3.51008 6.94422C2.24341 8.32505 1.76341 9.70839 1.75508 9.73672L1.66675 10.0001L1.75425 10.2634C1.77258 10.3192 3.68425 15.8334 10.0451 15.8334C10.8192 15.8334 11.5242 15.7484 12.1717 15.6059L9.88341 13.3176C9.05948 13.2772 8.28004 12.9317 7.69673 12.3484C7.11343 11.7651 6.76797 10.9857 6.72758 10.1617V10.1617ZM10.0451 4.16672C8.49925 4.16672 7.23258 4.50339 6.17675 4.99839L3.08925 1.91089L1.91091 3.08922L16.9109 18.0892L18.0892 16.9109L15.3409 14.1626C17.5392 12.5351 18.3234 10.2984 18.3351 10.2634L18.4226 10.0001L18.3351 9.73672C18.3167 9.68089 16.4059 4.16672 10.0451 4.16672ZM11.6334 10.4551C11.7892 9.89089 11.6567 9.25589 11.2234 8.82172C10.7901 8.38755 10.1542 8.25589 9.59008 8.41172L8.33342 7.15506C8.84839 6.83837 9.44054 6.66943 10.0451 6.66672C11.8834 6.66672 13.3784 8.16172 13.3784 10.0001C13.3759 10.6045 13.2067 11.1965 12.8892 11.7109L11.6334 10.4551V10.4551Z" fill="black" />
</svg>


