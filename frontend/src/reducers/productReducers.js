import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_CREATOR_CREATED, PRODUCT_CREATOR_FAIL, PRODUCT_CREATOR_REQUEST, PRODUCT_CREATOR_DELETE, PRODUCT_CREATOR_UPDATE} from "../constants/productConstants";

function productListReducer(state= {products: []}, action){

    switch (action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload}
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

function productDetailsReducer(state= {details: {} }, action){

    switch (action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, details: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, details: action.payload}
        default:
            return state
    }
}


function productCreatorReducer(state= {newproduct: {} }, action){

    switch (action.type){
        case PRODUCT_CREATOR_REQUEST:
            return {saveLoading: true, success: false};
        case PRODUCT_CREATOR_CREATED:
            return {saveLoading: false, success: true, newproduct: action.payload}
        case PRODUCT_CREATOR_UPDATE:
            return {saveLoading: false, success: true, newproduct: action.payload}
        case PRODUCT_CREATOR_DELETE:
            return {saveLoading: false, success: true, newproduct: action.payload}
        case PRODUCT_CREATOR_FAIL:
            return {saveLoading: false, saveError: action.payload}
        default:
            return state
    }
}


export {productListReducer, productDetailsReducer, productCreatorReducer}