import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_CREATOR_CREATED, PRODUCT_CREATOR_FAIL, PRODUCT_CREATOR_REQUEST, PRODUCT_CREATOR_UPDATE, PRODUCT_CREATOR_DELETE } from "../constants/productConstants"


const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const rawData = await fetch("http://localhost:8000/products");
        //extraemos directamente el valor de la key products 
        const { data } = await rawData.json();
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


//Instead of userAction, here we are getting the full object instead of populating each variable 
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
        dispatch({ type: PRODUCT_CREATOR_FAIL, payload: false })
    }



}

export { listProducts, detailsProduct, saveProduct }