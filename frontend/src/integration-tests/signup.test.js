import React from "react";
import * as Contexto from "../Context";
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import store from '../store';
import { render, getByTestId, fireEvent, screen, act, cleanup, waitForElementToBeRemoved, queryByTestId } from '@testing-library/react';
import Signup from "../components/Signup"
import { userActionsSignup } from "../actions/userActions";
import { createMemoryHistory } from "history"
import {Router} from "react-router-dom"


//jest.mock("../actions/userActions")
jest.mock("../actions/userActions")

describe("<SignIn/> component", () => {
    let props
    let history
    //let storeMock
    beforeEach(() => {
        const contextvals = { setOpenSnackbar: jest.fn() }
        jest
            .spyOn(Contexto, "useDataLayer")
            .mockImplementation(() => contextvals)

        props = {
            location: { search: "" }
        }
        history = createMemoryHistory()
        // const mockStore = configureStore([thunk])
        // storeMock = mockStore(store)
    })


    it("renders form correctly", () => {

        jest.spyOn(redux, "useSelector")
            .mockReturnValue({ userInfo: "", loading: false, error: "" })

        const { getByTestId } = render(
            <Provider store={store} >
                <Router history={history}>
                    <Signup {...props} />
                </Router>
            </Provider>
        )

        expect(getByTestId("form")).toBeInTheDocument()

    })
    it("form inputs work fine", () => {
        jest.spyOn(redux, "useSelector")
            .mockReturnValue({ userInfo: "", loading: false, error: "" })

        const { getByTestId, queryByRole, debug } = render(
            <Provider store={store} >
                <Router history={history}>
                    <Signup {...props} />
                </Router>
            </Provider>
        )
        //email input
        const email = queryByRole("textbox", { name: "email" })
        fireEvent.change(email, { target: { value: "manolito@gmail.com" } })
        expect(email.value).toBe("manolito@gmail.com")

        //name input
        const name = queryByRole("textbox", { name: "name" })
        fireEvent.change(name, { target: { value: "manolito@gmail.com" } })
        expect(name.value).toBe("manolito@gmail.com")

        //password input
        const password = getByTestId("password")
        expect(password).toBeInTheDocument()
        fireEvent.change(password, { target: { value: "1234" } })
        expect(password.value).toBe("1234")

    })
    it("redux action is called when submitting", () => {
        // const mockStore = configureStore([thunk])
        // const storeMock = mockStore({})
        jest.spyOn(redux, "useSelector")
            .mockReturnValue({ userInfo: "", loading: false, error: "" })
        const signupAction = userActionsSignup.mockImplementation(() => ({ type: "bla bla" }))
        const { getByTestId, queryByRole, debug } = render(
            <Provider store={store} >
                <Router history={history}>
                    <Signup {...props} />
                </Router>
            </Provider>
        )
        expect(signupAction).toHaveBeenCalledTimes(0)
        const submitbtn = queryByRole("button", { name: /register/i })
        fireEvent.click(submitbtn)
        //debug()
        expect(signupAction).toHaveBeenCalledTimes(1)
    }),
        it("show loading indicator when loading is true", () => {
            jest.spyOn(redux, "useSelector")
                .mockReturnValue({ userInfo: "", loading: true, error: "" })

            const { queryByTestId } = render(
                <Provider store={store} >
                    <Signup {...props} />
                </Provider>
            )

            expect(queryByTestId("loader")).toBeInTheDocument()
        }),
        it("show error when there's error signing in", () => {
            jest.spyOn(redux, "useSelector")
                .mockReturnValue({ userInfo: "", loading: false, error: "singin failed" })

            const { queryByTestId } = render(
                <Provider store={store} >
                    <Router history={history}>
                        <Signup {...props} />
                    </Router>
                </Provider>
            )

            expect(queryByTestId("loader")).not.toBeInTheDocument()
            expect(queryByTestId("signup-error")).toBeInTheDocument()
        })
})