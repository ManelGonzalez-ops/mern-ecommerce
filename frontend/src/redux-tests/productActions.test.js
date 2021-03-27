import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from "../actions/productActions"
import * as types from "../constants/productConstants"
import { helpers } from "../actions/productActions"
import fetchMock from "fetch-mock"
import store from '../store'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


fetchMock.config.fallbackToNetwork = true
describe("product actions", () => {


    afterEach(() => {
        fetchMock.restore()
    })

    describe("detailsProducts thunk action", () => {

        const actionCreator = { productId: "12345" }

        it("dispatches PRODUCT_DETAILS_REQUEST  and if the response is succesfull PRODUCT_DETAILS_SUCCESS is dispathced", () => {

            const resContent = { id: "12345", name: "comeme el culo" }
            fetchMock.get("*", resContent)

            const expectedActions = [{ type: types.PRODUCT_DETAILS_REQUEST }, { type: types.PRODUCT_DETAILS_SUCCESS, payload: resContent }]
            const store = mockStore({ details: { details: {} } })

            return store.dispatch(actions.detailsProduct(actionCreator)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })

        it("when the API call returns an error PRODUCT_DETAILS_FAIL is dispatch", () => {
            const error = "product details not available"
            fetchMock.get("*", { throws: new Error(error) })
            const expectedActions = [{ type: types.PRODUCT_DETAILS_REQUEST }, { type: types.PRODUCT_DETAILS_FAIL, payload: error }]
            const store = mockStore({ details: { details: {} } })

            return store.dispatch(actions.detailsProduct(actionCreator)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
    })

    describe("listProducts thunk action", () => {

        it("disptches PRODUCT_LIST_REQUEST and after fetching succesfully PRODUCT_LIST_SUCCESS is dispatched", () => {
            //mock parseDates Implementation to assure it does nothing
            const parseDates = jest.spyOn(helpers, "parseDates")
            parseDates.mockImplementation((val) => val)

            const resContent = [{ producto1: "raqueta", producto2: "bolas" }]
            fetchMock.get("*", { data: resContent })

            const store = mockStore({ productList: { products: [] } })
            const expectedActions = [{ type: types.PRODUCT_LIST_REQUEST }, { type: types.PRODUCT_LIST_SUCCESS, payload: resContent }]

            return store.dispatch(actions.listProducts()).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })

        }),
            it("when the API call returns an error PRODUCT_LIST_FAIL is dispatched", () => {

                const parseDates = jest.spyOn(helpers, "parseDates")
                parseDates.mockImplementation((val) => val)

                const resError = "server responsded with a 500 status"
                fetchMock.get("*", { throws: new Error(resError) })
                const expectedActions = [{ type: types.PRODUCT_LIST_REQUEST }, { type: types.PRODUCT_LIST_FAIL, payload: resError }]

                const store = mockStore({ productList: { products: [] } })

                return store.dispatch(actions.listProducts()).then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
            })
    })

    describe("searchporoducts thunk action", () => {

        it("dispatches SET_FILTERED_PRODUCTS anytime searchProducts is called", () => {
            //this time is not an action creator
            const word = "abaa"
            const data = [{ id: 1, name: "producto1" }, { id: 2, name: "producto2" }]
            const initialState = { filteredProducts: { filteredProducts: data, category: "" } }
            const store = mockStore(initialState)
            const result = { products: data, category: "" }
            
            jest.spyOn(data, "filter").mockReturnValue(data)
            //jest.spyOn(obj, "filter").mockImplementation(val => val)
            const expectedActions = [{ type: "SET_FILTERED_PRODUCTS", payload: result }]

            return store.dispatch(actions.searchProduct(word)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
    })
})