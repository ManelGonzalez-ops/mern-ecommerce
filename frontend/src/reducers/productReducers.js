import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_CREATOR_CREATED, PRODUCT_CREATOR_FAIL, PRODUCT_CREATOR_REQUEST, PRODUCT_CREATOR_DELETE, PRODUCT_CREATOR_UPDATE, REVIEW_ADD_REQUEST, REVIEW_ADD_SUCCESS, REVIEW_ADD_FAIL, SORT_BY_REQUEST, SORT_BY_DATE, SORT_BY_PRICE, SORT_BY_ERROR, SHOW_SEARCH_REQUEST, SHOW_SEARCH_SUCCESS, SHOW_SEARCH_FAIL } from "../constants/productConstants";

function productListReducer(state = { products: [] }, action) {

    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        case SORT_BY_REQUEST:
            return { loading: true }
        case SORT_BY_DATE:
            return { loading: false, products: action.payload }
        case SORT_BY_PRICE:
            return { loading: false, products: action.payload }
        case SORT_BY_ERROR:
            return { loading: false, error: action.payload }
        case SHOW_SEARCH_REQUEST:
            return { loading: true }
        case SHOW_SEARCH_SUCCESS:
            return { loading: false, products: action.payload }
        case SHOW_SEARCH_FAIL:
            return { loading: false, error: action.payload }
        case "CATEGORY_LOOKUP_REQUEST":
            return { loading: true }
        case "CATEGORY_LOOKUP_SUCCESS":
            return { products: action.payload, loading: false }
        case "CATEGORY_LOOKUP_FAIL":
            return { error: action.payload, loading: false }
        default:
            return state
    }
}

const initialState = {
    filteredProducts: [],
    category: ""
}
function filteredProductsReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_FILTERED_PRODUCTS":
            const { products, category } = action.payload
            return {
                filteredProducts: products,
                category: category
            }
        default:
            return state
    }
}

function productDetailsReducer(state = { details: {} }, action) {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, details: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case REVIEW_ADD_REQUEST:
            return { loading: true };
        case REVIEW_ADD_SUCCESS:
            return { loading: false, details: action.payload }
        case REVIEW_ADD_FAIL:
            return { loading: false, reviewError: action.payload }

        default:
            return state
    }
}


function productCreatorReducer(state = { newproduct: {} }, action) {

    switch (action.type) {
        case PRODUCT_CREATOR_REQUEST:
            return { saveLoading: true, success: false };
        case PRODUCT_CREATOR_CREATED:
            return { saveLoading: false, success: true, newproduct: action.payload }
        case PRODUCT_CREATOR_UPDATE:
            return { saveLoading: false, success: true, newproduct: action.payload }
        case PRODUCT_CREATOR_DELETE:
            return { saveLoading: false, success: true, newproduct: action.payload }
        case PRODUCT_CREATOR_FAIL:
            return { saveLoading: false, saveError: action.payload }
        default:
            return state
    }
}


// function productReviewReducer(state = { reviews: [] }, action) {

//     switch (action.type) {
//         case REVIEW_ADD_REQUEST:
//             return { loading: true };
//         case REVIEW_ADD_SUCCESS:
//             return { loading: false, reviews: action.payload }
//         case REVIEW_ADD_FAIL:
//             return { loading: false, reviewError: action.payload }
//         default:
//             return state
//     }
// }


export { productListReducer, productDetailsReducer, productCreatorReducer, filteredProductsReducer }