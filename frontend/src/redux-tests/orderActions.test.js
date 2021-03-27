import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from "../actions/orderActions"
import * as types from "../constants/orderConstants"
import fetchMock from "fetch-mock"
import Cookie from "js-cookie"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)


fetchMock.config.fallbackToNetwork = true

describe("order actions", () => {

    afterEach(() => {
        fetchMock.restore()
    })

    describe(" addOrdeerDB thunk", () => {

        it("dispatches ADD_ORDERDB_REQUEST and ADD_ORDERDB_SUCCESS if requets is succesfull", () => {

            fetchMock.post("*", { data: { order: "bla bla bla" } })

            jest.spyOn(Cookie, "getJSON").mockReturnValue("okey")
            const expectedActions = [{ type: types.ADD_ORDERDB_REQUEST }, { type: types.ADD_ORDERDB_SUCCESS, payload: { order: "bla bla bla" } }]

            const store = mockStore({})

            return store.dispatch(actions.addOrderDB(true)).then(() => {
                expect(store.getActions()).toEqual(expectedActions)
            })
        }),

            it("dispatches ADD_ORDERDB_FAIL when API request fails", () => {
                const errorMsg = "can't create order"
                fetchMock.post("*", { throws: new Error(errorMsg) })

                const expectedActions = [{ type: types.ADD_ORDERDB_REQUEST }, { type: types.ADD_ORDERDB_FAIL, payload: errorMsg }]

                const store = mockStore({})

                return store.dispatch(actions.addOrderDB(true)).then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })
            })
    })
})
