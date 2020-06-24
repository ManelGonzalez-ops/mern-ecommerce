import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { productListReducer, productDetailsReducer, productCreatorReducer } from "./reducers/productReducers"
import thunk, { getState } from "redux-thunk"
import { cartReducer } from "./reducers/cartReducers"
import {userLoginReducer, userRegisterReducer} from "./reducers/userReducer"
import Cookie from "js-cookie"

const cartItems = Cookie.getJSON("cartItems") || []
const userInfo = Cookie.getJSON("userInfo") || null

const initialState = {
    cart: { cartItems },
    userSignin: { userInfo }
}


//cuando importamos un estado del reducer al component podemos desestructurarlo
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userLoginReducer,
    userSignup: userRegisterReducer,
    productCreate: productCreatorReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store