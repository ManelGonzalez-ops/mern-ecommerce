import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_CREATOR_CREATED, PRODUCT_CREATOR_FAIL, PRODUCT_CREATOR_REQUEST, PRODUCT_CREATOR_UPDATE, PRODUCT_CREATOR_DELETE, REVIEW_ADD_REQUEST, REVIEW_ADD_SUCCESS, REVIEW_ADD_FAIL, SORT_BY_ERROR, SORT_BY_DATE, SORT_BY_PRICE, SORT_BY_REQUEST, SHOW_SEARCH_REQUEST, SHOW_SEARCH_FAIL, SHOW_SEARCH_SUCCESS } from "../constants/productConstants"
import Cookie from "js-cookie"

const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        console.log("productlist() ejectued")
        const rawData = await fetch("https://mern-ecomerce.herokuapp.com/products");
        //extraemos directamente el valor de la key products 
        const { data } = await rawData.json();
        //console.log("MMMMMMMMMMMMMAMAMAMAMAMAM", data)     
        //cokie is too big that i get's deleted, so let's use localstorage

        const readyData = helpers.parseDates(data)
        localStorage.setItem("productList", JSON.stringify(readyData))
        console.log(Cookie.getJSON("productList"), "aver.....")
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: readyData })
    }
    catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
    }
}

const helpers = {
    parseDates: (data) => data.map(item => {
        item.date_added = Date.parse(item.date_added)
        return item
    })
}


const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const rawData = await fetch(`https://mern-ecomerce.herokuapp.com/products/${productId}`)
        const data = await rawData.json()
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    }
    catch (err) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.message })
    }
}


const saveProduct = (product) => async (dispatch, getState) => {
    try {

        dispatch({ type: PRODUCT_CREATOR_REQUEST, loading: true })
        const { userSignin: { userInfo } } = getState()

        if (product.delete) {
            const rawData = await fetch("https://mern-ecomerce.herokuapp.com/products", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.token}`
                },
                body: JSON.stringify(product),
                method: "DELETE"
            })
            const { data } = await rawData.json()
            //that's reaaly a delete
            dispatch({ type: PRODUCT_CREATOR_DELETE, payload: data })
        }

        else {

            if (product._id) {

                //console.log(product._id, "thee id")
                const rawData = await fetch("https://mern-ecomerce.herokuapp.com/products/update", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userInfo.token}`
                    },
                    body: JSON.stringify(product),
                    method: "PUT"
                })
                const { data } = await rawData.json()
                dispatch({ type: PRODUCT_CREATOR_UPDATE, payload: data })
            }

            else {

                const rawData = await fetch("https://mern-ecomerce.herokuapp.com/products", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userInfo.token}`
                    },
                    body: JSON.stringify(product),
                    method: "POST"
                })

                const { data } = await rawData.json()
                dispatch({ type: PRODUCT_CREATOR_CREATED, payload: data })
            }
        }
    }
    catch (err) {
        console.log(err.message, "errrrrrrrrrrrrror")
        dispatch({ type: PRODUCT_CREATOR_FAIL, payload: err.message })
    }

}

const addReview = (productId, review, rating, author) => async (dispatch) => {

    try {
        dispatch({ type: REVIEW_ADD_REQUEST })

        const autorChecked = typeof author === "string" ? author : author.name
        const rawData = await fetch("https://mern-ecomerce.herokuapp.com/products/review", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId, review, rating, author: autorChecked }),
            method: "PUT"
        })

        const { data } = await rawData.json()
        dispatch({ type: REVIEW_ADD_SUCCESS, payload: data })
    }
    catch (err) {

        dispatch({ type: REVIEW_ADD_FAIL, payload: err.message })
    }
}


const sortProducts = (criterio) => async (dispatch, getState) => {

    const { filteredProducts: { filteredProducts, category } } = getState()
    let sortedResults;
    const resultsCopy = [...filteredProducts]
    if (criterio === "lower price") {
        sortedResults = resultsCopy.sort((a, b) => a.price - b.price)
    }
    if (criterio === "higher price") {
        sortedResults = resultsCopy.sort((a, b) => b.price - a.price)
    }
    if (criterio === "newest") {
        sortedResults = resultsCopy.sort((a, b) => a.date_added - b.date_added)
    }
    console.log(sortedResults, criterio, "sorted")
    dispatch({
        type: "SET_FILTERED_PRODUCTS", payload: {
            products: sortedResults,
            category
        }
    })


}


const searchProduct = (palabra) => async (dispatch, getState) => {


    const { filteredProducts: { filteredProducts, category } } = getState()
    if (!filteredProducts.length) return;
    console.log(filteredProducts, "q coll")
    const newArr = filteredProducts.filter(item => {
        let patron = new RegExp(palabra, "gi")
        if (patron.test(item.name) || patron.test(item.brand)) {
            return item
        }
    })

    console.log(newArr, "newArr")

    dispatch({
        type: "SET_FILTERED_PRODUCTS", payload: {
            category,
            products: newArr
        }
    })


}


const searchByCartegory = (category) => async (dispatch, getState) => {

    try {

        dispatch({ type: "CATEGORY_LOOKUP_REQUEST" })
        const rawData = await fetch("https://mern-ecomerce.herokuapp.com/products");
        const { data } = await rawData.json()

        const newArr = data.filter(item => item.category[0] === category)
        Object.keys(newArr).length > 0 ?
            dispatch({ type: "CATEGORY_LOOKUP_SUCCESS", payload: newArr })
            :
            dispatch({ type: "CATEGORY_LOOKUP_FAIL", payload: "There aren't products of this category in stock right now" })
    }
    catch (err) {
        dispatch({ type: "CATEGORY_LOOKUP_FAIL", payload: err.message })
    }
}


export { listProducts, detailsProduct, saveProduct, addReview, sortProducts, searchProduct, searchByCartegory }

