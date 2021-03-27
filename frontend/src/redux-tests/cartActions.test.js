import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from "../actions/productActions"
import * as types from "../constants/productConstants"
import { helpers } from "../actions/productActions"
import fetchMock from "fetch-mock"
import { cartProduct, cartModification } from '../actions/cartActions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

fetchMock.config.fallbackToNetwork = true

describe("cart actions", () => {

    afterEach(() => {
        fetchMock.restore()
    })

    describe("cartPorduct thunk", () => {

        it("dispatches CART_ADD_LOADING and then calls CART_ADD_ITEM", () => {

            const initialState = { cart: { cartItems: [] } }
            const store = mockStore(initialState)
            const productId = "48h34jhd"
            const qty = 10
            fetchMock.get("*", { _id: "48h34jhd" })

            const expectedActions = [{ type: types.CART_ADD_LOADING }, { type: types.CART_ADD_ITEM, payload: [{ id: productId, qty: 10 }] }]
            return store.dispatch(cartProduct(productId, qty)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })

        })
        it("adds quantity on existing cart product", () => {

            const initialState = {
                cart: { cartItems: [{ id: "1234", qty: 15 }] }
            }
            const store = mockStore(initialState)
            const productId = "1234"
            const qty = 10
            fetchMock.get("*", { _id: "1234" })

            const expectedActions = [{ type: types.CART_ADD_LOADING }, { type: types.CART_ADD_ITEM, payload: [{ id: productId, qty: 25 }] }]

            return store.dispatch(cartProduct(productId, qty)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })

        it("dispatches CART_ADD_FAIL when error comes from the API", () => {

            const initialState = { cart: { cartItems: [] } }
            const store = mockStore(initialState)
            const errormsg = "product not found, unable to add to cart"
            fetchMock.get("*", { throws: new Error(errormsg) })
            const expectedActions = [{ type: types.CART_ADD_LOADING }, { type: types.CART_ADD_FAIL, payload: errormsg }]

            return store.dispatch(cartProduct("43gyg", 10)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })

        })

    })

    describe("cart MOdificationTHunk", () => {

        it("dispatch action with the correct updated state CART_UPDATE_ITEM", () => {

            const initialState = {
                cart: { cartItems: [{ id: "1234", qty: 15 }] }
            }
            const store = mockStore(initialState)
            const productId = "1234"
            const qty = 10

            const expectedActions = [{ type: types.CART_ADD_LOADING }, { type: types.CART_UPDATE_ITEM, payload: [{ id: productId, qty }] }]

            return store.dispatch(cartModification(productId, qty)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
        it("dispatch CART_DELETE_ITEM which payload is the state without the the item when quantity 0 passed", () => {

            const initialState = {
                cart: { cartItems: [{ id: "1234", qty: 15 }, { id: "5678", qty: 10 }] }
            }
            const store = mockStore(initialState)

            const expectedActions = [{ type: types.CART_ADD_LOADING }, { type: types.CART_DELETE_ITEM, payload: [{ id: "5678", qty: 10 }] }]

            return store.dispatch(cartModification("1234", 0)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
    })
})
