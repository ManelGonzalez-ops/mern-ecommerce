import React, { useEffect, useState, Fragment, useLayoutEffect, useRef } from 'react';
import { Link } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import { listProducts, sortProducts, searchProduct, searchByCartegory } from '../actions/productActions';


import { LoaderPnp, Loader1 } from "./Products"
import Slider from "./Slider"
import Background from "../media/images/watercolor.png"
import ProductDispatcher from "./ProductDispatcher"
import Sorter from "./SelectIcon"
import Search from "./SearchIcon"

function App() {
    const stickyLabel = useRef(null)
    const galerie = useRef(null)
    const [selectFilter, setSelectFilter] = useState("lower price")
    const [searchFilter, setSearchFilter] = useState("")

    const [openAside, setOpenAside] = useState(false)
    const [marginTop, setMarginTop] = useState(0)
    const productList = useSelector(state => state.productList)
    const { products, loading, error } = productList
    const dispatch = useDispatch()

    const [hasBeenTouched, setHasBeenTouched] = useState(false)


    useEffect(() => {



        dispatch({ type: "SET_CURRENT_PATH", payload: "hide" })
        dispatch(listProducts())

    }, [])


    const handleStikyPosition = (e) => {
        
        //here are doing a bit complex and lets explain:

        //1. add fixed when we scroll all the height stickyLabel component  
        if (stickyLabel.current) {

            if (stickyLabel && stickyLabel.current.getBoundingClientRect().top < 0) {
                if (stickyLabel.current.style.position !== "fixed") {
                    stickyLabel.current.style.position = "fixed"
                    galerie.current.style.marginTop = stickyLabel.current.getBoundingClientRect().height + "px"
                }


            }
            //2.Check when galerie has just left a height equivalent to the stickyLabel to show its top at the begining of the viewport. or we can when we see space between the top of the vieport and the top of the galerie.
            
            else if (stickyLabel && stickyLabel.current && galerie.current.getBoundingClientRect().top > stickyLabel.current.getBoundingClientRect().height) {

                if(stickyLabel.current.style.position === "fixed"){

                    stickyLabel.current.style.position = "static"
                    galerie.current.style.marginTop = 0
                
                }

            }
           
        }
    }

    useLayoutEffect(() => {

        document.addEventListener("scroll", handleStikyPosition)
    }, [stickyLabel])



    const categoryList = ["Toys", "Hardware", "Accesories", "Kitchen & Dining", "Clothing & Jewelry", "Books", "Baby", "Sports", "Other"]


    //category
    const handleCategorySearch = (categoryType) => {
        dispatch(searchByCartegory(categoryType))
        setOpenAside(false)
    }



    return (

        <div style={{margin: 0}} onClick={()=>{openAside && setOpenAside(false)}}>

            {loading ? <Loader1 />
                :
                error ? <p>{error}</p>
                    :
                    <Fragment>

                        <div className="filter__container" ref={stickyLabel}>
                            <p className={openAside ? "categories close" : "categories"}
                                onClick={() => { setOpenAside(true) }}
                            ><stong>Categories &#8594;</stong></p>
                            <Search searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
                            <Sorter selectFilter={selectFilter} setSelectFilter={setSelectFilter} />
                        </div>




                        <aside className={openAside ? "aside open" : "aside"}>
                            <header className="header-aside">
                                <h3 style={{ color: "orange" }}>Categories</h3>
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


                        <div className="product-grid" ref={galerie}>
                            <ProductDispatcher products={products} />
                        </div>
                    </Fragment>
            }

        </div>
    );
}


export default App;

export const CloseBtnAside = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" viewBox="0 0 18 18" className="svg-icons"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" /></svg>


export const SearchIcon = () => <svg width="25" height="26" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icons fixed">
    <path d="M18.7806 3.2543C20.5638 5.05474 21.6799 7.41807 21.9422 9.94897C22.2045 12.4799 21.597 15.0248 20.2214 17.1581C20.4615 17.3599 20.6616 17.5819 20.9418 17.7837C21.342 18.1066 21.8823 18.5102 22.5627 18.9743C23.2431 19.4586 23.6833 19.7613 23.8834 19.9228C24.7239 20.5483 25.3442 21.073 25.7645 21.4968C26.4048 22.1425 26.9651 22.8085 27.4454 23.5148C27.9457 24.2211 28.3259 24.9072 28.6261 25.6135C28.9062 26.3198 29.0463 26.9857 28.9863 27.6314C28.9463 28.2772 28.7061 28.822 28.2659 29.266C27.8256 29.71 27.2853 29.9521 26.645 29.9925C26.0246 30.0328 25.3442 29.9118 24.6639 29.6091C23.9635 29.3265 23.2631 28.9229 22.5827 28.4185C21.8823 27.9341 21.2219 27.3691 20.5816 26.7234C20.1613 26.2996 19.641 25.674 19.0407 24.8466C18.8406 24.5843 18.5404 24.1403 18.1002 23.5148C17.6599 22.869 17.2997 22.3645 16.9795 21.9407C16.6594 21.5372 16.3992 21.2345 16.099 20.9318C14.022 22.0285 11.652 22.4281 9.33408 22.0724C7.01617 21.7167 4.87134 20.6243 3.2118 18.9541C-1.0706 14.6155 -1.0706 7.57277 3.2118 3.2543C4.23362 2.22264 5.44708 1.40421 6.78278 0.845815C8.11849 0.287417 9.55024 0 10.9962 0C12.4421 0 13.8739 0.287417 15.2096 0.845815C16.5453 1.40421 17.7587 2.22264 18.7806 3.2543V3.2543ZM15.959 16.0886C17.2663 14.7607 17.9999 12.9653 17.9999 11.0941C17.9999 9.22292 17.2663 7.4276 15.959 6.09964C15.3092 5.44251 14.5373 4.92113 13.6874 4.56539C12.8375 4.20964 11.9264 4.02652 11.0062 4.02652C10.086 4.02652 9.17483 4.20964 8.32493 4.56539C7.47504 4.92113 6.70312 5.44251 6.0534 6.09964C5.40176 6.75483 4.88473 7.53325 4.53195 8.3903C4.17918 9.24735 3.99759 10.1662 3.99759 11.0941C3.99759 12.0221 4.17918 12.9409 4.53195 13.798C4.88473 14.655 5.40176 15.4334 6.0534 16.0886C6.70312 16.7458 7.47504 17.2671 8.32493 17.6229C9.17483 17.9786 10.086 18.1617 11.0062 18.1617C11.9264 18.1617 12.8375 17.9786 13.6874 17.6229C14.5373 17.2671 15.3092 16.7458 15.959 16.0886V16.0886Z" fill="#9a1b0e" />
</svg>





