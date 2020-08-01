import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_CREATOR_CREATED, PRODUCT_CREATOR_FAIL, PRODUCT_CREATOR_REQUEST, PRODUCT_CREATOR_UPDATE, PRODUCT_CREATOR_DELETE, REVIEW_ADD_REQUEST, REVIEW_ADD_SUCCESS, REVIEW_ADD_FAIL, SORT_BY_ERROR, SORT_BY_DATE, SORT_BY_PRICE, SORT_BY_REQUEST, SHOW_SEARCH_REQUEST, SHOW_SEARCH_FAIL, SHOW_SEARCH_SUCCESS } from "../constants/productConstants"
import Cookie from "js-cookie"

const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const rawData = await fetch("http://localhost:8000/products");
        //extraemos directamente el valor de la key products 
        const { data } = await rawData.json();
        console.log("MMMMMMMMMMMMMAMAMAMAMAMAM", data)     
        //cokie is too big that i get's deleted, so let's use localstorage
        localStorage.setItem("productList", JSON.stringify(data))
        console.log(Cookie.getJSON("productList"), "aver.....")
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId })
        const rawData = await fetch(`http://localhost:8000/products/${productId}`)
        const data = await rawData.json()
        console.log(data, "maamaa")
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
            const rawData = await fetch("http://localhost:8000/products", {
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

                console.log(product._id, "thee id")
                const rawData = await fetch("http://localhost:8000/products/update", {
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

                const rawData = await fetch("http://localhost:8000/products", {
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

        const rawData = await fetch("http://localhost:8000/products/review", {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId, review, rating, author: author}),
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
    try {

        const { productList: { products } } = getState()

        switch (criterio) {

            case "lower price":
                dispatch({ type: SORT_BY_REQUEST })
                await products.sort((a, b) => a.price - b.price)
                dispatch({ type: SORT_BY_PRICE, payload: products })
                break
            case "higher price":
                dispatch({ type: SORT_BY_REQUEST })
                await products.sort((a, b) => b.price - a.price)
                dispatch({ type: SORT_BY_PRICE, payload: products })
                break

            case "date added":
                dispatch({ type: SORT_BY_REQUEST })
                await products.sort((a, b) => a.getTime() - b.getTime())
                dispatch({ type: SORT_BY_DATE, payload: products })
                break

            default:
                dispatch({ type: SORT_BY_ERROR, payload: "filtro erroneo" })


        }

    }
    catch (err) {
        dispatch({ type: SORT_BY_ERROR, payload: err.message })
    }

}


const searchProduct = (palabra) => async (dispatch, getState) => {

        try{
            const productArray = JSON.parse(localStorage.getItem("productList"))
            dispatch({type: SHOW_SEARCH_REQUEST})
           
            const newArr = productArray.map(item=> {
                let patron = new RegExp(palabra, "g")
                if( patron.test(item.name) || patron.test(item.brand)){
                    return item
                }
            })

            dispatch({type: SHOW_SEARCH_SUCCESS, payload: newArr})

        }
        catch(err){

            dispatch({type: SHOW_SEARCH_FAIL, payload: err.message})
        }
}


const searchByCartegory =(category)=> async (dispatch, getState)=>{
  
    try{
        
        dispatch({type: "CATEGORY_LOOKUP_REQUEST"})
        const rawData = await fetch("http://localhost:8000/products");
        const {data} = await rawData.json()
       
        const newArr = data.filter(item=>item.category[0] === category)
        Object.keys(newArr).length > 0?
        dispatch({type: "CATEGORY_LOOKUP_SUCCESS", payload: newArr})
        :
        dispatch({type: "CATEGORY_LOOKUP_FAIL", payload: "There aren't products of this category in stock right now"})
    }
    catch(err){
        dispatch({type: "CATEGORY_LOOKUP_FAIL", payload: err.message})
    }
}


export { listProducts, detailsProduct, saveProduct, addReview, sortProducts, searchProduct, searchByCartegory }

