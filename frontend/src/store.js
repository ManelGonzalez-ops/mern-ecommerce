import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import { productListReducer, productDetailsReducer, productCreatorReducer} from "./reducers/productReducers"
import thunk from "redux-thunk"
import { cartReducer } from "./reducers/cartReducers"
import {userLoginReducer, userRegisterReducer} from "./reducers/userReducer"
import {orderReducer} from "./reducers/orderReducer"
import {shippingReducer, setStepReducer} from "./reducers/shippingReducer"
import {pathReducer} from "./reducers/pathReducer"
import Cookie from "js-cookie"

const cartItems = Cookie.getJSON("cartItems") || []
const userInfo = Cookie.getJSON("userInfo") || null
const userInfoR = Cookie.getJSON("userInfoR") || null
const currentStep = Cookie.getJSON("currentItem") || 0
const shippingInfo = Cookie.getJSON("shippingInfo") || null
const currentOrder = Cookie.getJSON("currentOrder") || null
const currentPath = Cookie.getJSON("currentOrder") || null


const initialState = {
    cart: { cartItems },
    userSignin: { userInfo },
    userSignup: {userInfoR},
    currentStep: {currentStep},
    shipping: {shippingInfo},
    currentOrder: {currentOrder},
    currentPath: {currentPath},
  
}


//cuando importamos un estado del reducer al component podemos desestructurarlo
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userLoginReducer,
    userSignup: userRegisterReducer,
    productCreate: productCreatorReducer,
    currentOrder: orderReducer,
    shipping: shippingReducer,
    currentStep: setStepReducer,
    currentPath: pathReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store