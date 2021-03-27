import configureMockStore from 'redux-mock-store'
import * as context from "../../Context"
import thunk from 'redux-thunk'
import * as actions from "../../actions/shippingActions"
import * as types from "../../constants/shippingConstants"
import { helpers } from "../../actions/productActions"
import fetchMock from "fetch-mock"
import Cookies from 'js-cookie'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


fetchMock.config.fallbackToNetwork = true

describe("shipping actions", () => {

    beforeEach(()=>{
        jest.spyOn(context, "useDataLayer").mockImplementation(() => ({ isDark: false }))
        jest.spyOn(Cookies, "getJSON").mockReturnValue({ token: "fkjdfhiuf" })
    })
    afterAll(() => {
        
        fetchMock.restore()
    })

    describe("saveShipping thunk", () => {

        it("SHIPPING_SAVE_REQUEST is called and after succesful request SHIPPING_SAVE_SUCCESS is dispatched", () => {

            const response = { datus: "datos return form api" }
            fetchMock.put("*", { data: response }, {overwriteRoutes: false})



            const expectedActions = [{ type: types.SHIPPING_SAVE_REQUEST }, { type: types.SHIPPING_SAVE_SUCCESS, payload: response }]

            const store = mockStore({})

            return store.dispatch(actions.saveShipping({})).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })

        it("SHIPPING_SAVE_FAIL is dispathced after API request returns an error", () => {

            const errorMsg = "data no encontrado"
            fetchMock.put("*", { throws: new Error(errorMsg) }, {overwriteRoutes: true})
            const expectedActions = [{ type: types.SHIPPING_SAVE_REQUEST }, { type: types.SHIPPING_SAVE_FAIL, payload: errorMsg }]

            const store = mockStore({})

            return store.dispatch(actions.saveShipping({})).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        })
    })
})