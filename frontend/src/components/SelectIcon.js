import React, {useState, useEffect} from 'react'
import { listProducts, sortProducts, searchProduct, searchByCartegory } from '../actions/productActions';
import {useDispatch} from "react-redux"

export default function SelectFilter({selectFilter, setSelectFilter}) {

    const [filterClicked, setFilterClicked] = useState(false)
    const [hasBeenTouched, setHasBeenTouched] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {

        hasBeenTouched && dispatch(sortProducts(selectFilter))

    }, [selectFilter])


    const handleChangeFilter = (e) => {

        setSelectFilter(e.target.value)
        if (!hasBeenTouched) setHasBeenTouched(true)
    }


    return (
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
    )
}


const HideIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="svg-icons hide-icon fixed">
    <path d="M6.72758 10.1617L3.51008 6.94422C2.24341 8.32505 1.76341 9.70839 1.75508 9.73672L1.66675 10.0001L1.75425 10.2634C1.77258 10.3192 3.68425 15.8334 10.0451 15.8334C10.8192 15.8334 11.5242 15.7484 12.1717 15.6059L9.88341 13.3176C9.05948 13.2772 8.28004 12.9317 7.69673 12.3484C7.11343 11.7651 6.76797 10.9857 6.72758 10.1617V10.1617ZM10.0451 4.16672C8.49925 4.16672 7.23258 4.50339 6.17675 4.99839L3.08925 1.91089L1.91091 3.08922L16.9109 18.0892L18.0892 16.9109L15.3409 14.1626C17.5392 12.5351 18.3234 10.2984 18.3351 10.2634L18.4226 10.0001L18.3351 9.73672C18.3167 9.68089 16.4059 4.16672 10.0451 4.16672ZM11.6334 10.4551C11.7892 9.89089 11.6567 9.25589 11.2234 8.82172C10.7901 8.38755 10.1542 8.25589 9.59008 8.41172L8.33342 7.15506C8.84839 6.83837 9.44054 6.66943 10.0451 6.66672C11.8834 6.66672 13.3784 8.16172 13.3784 10.0001C13.3759 10.6045 13.2067 11.1965 12.8892 11.7109L11.6334 10.4551V10.4551Z" fill="black" />
</svg>



export const SortIcon = () => <svg className="svg-icons fixed" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 0V22.5H0L9.375 30L18.75 22.5H11.25V0H7.5ZM15 0V3.75H22.5V0H15ZM15 7.5V11.25H26.25V7.5H15ZM15 15V18.75H30V15H15Z" fill="black" />
</svg>