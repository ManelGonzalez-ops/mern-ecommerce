import React from "react";
import * as Contexto from "../Context";
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import store from '../store';
import { Signin } from "../components/Signin";
import { render, getByTestId, fireEvent, screen, act, cleanup, waitForElementToBeRemoved, queryByTestId } from '@testing-library/react';
import configureStore from "redux-mock-store"
import { userActionsSignin } from "../actions/userActions";
import thunk from "redux-thunk";

//jest.mock("../actions/userActions")
jest.mock("../actions/userActions")

describe.skip("<SignIn/> component", () => {
    let props
    //let storeMock
    beforeEach(() => {
        const contextvals = { setOpenSnackbar: jest.fn() }
        jest
            .spyOn(Contexto, "useDataLayer")
            .mockImplementation(() => contextvals)

        props = {
            location: { search: "" }
        }

        // const mockStore = configureStore([thunk])
        // storeMock = mockStore(store)
    })


    it("renders form correctly", () => {

        jest.spyOn(redux, "useSelector")
            .mockReturnValue({ userInfo: "", loading: false, error: "" })

        const { getByTestId } = render(
            <Provider store={store} >
                <Signin {...props} />
            </Provider>
        )

        expect(getByTestId("form")).toBeInTheDocument()

    })
    it("form inputs work fine", () => {
        jest.spyOn(redux, "useSelector")
            .mockReturnValue({ userInfo: "", loading: false, error: "" })

        const { getByTestId, queryByRole, debug } = render(
            <Provider store={store} >
                <Signin {...props} />
            </Provider>
        )
        //email input
        const email = queryByRole("textbox", { name: "email" })
        fireEvent.change(email, { target: { value: "manolito@gmail.com" } })
        expect(email.value).toBe("manolito@gmail.com")

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
        const signinAction = userActionsSignin.mockImplementation(()=>({type: "bla bla"}))
        const { getByTestId, queryByRole, debug } = render(
            <Provider store={store} >
                <Signin {...props} />
            </Provider>
        )
        expect(signinAction).toHaveBeenCalledTimes(0)
        const submitbtn = queryByRole("button", { name: /submit/i })
        fireEvent.click(submitbtn)
        //debug()
        expect(signinAction).toHaveBeenCalledTimes(1)
    }),
    it("show loading indicator when loading is true", ()=>{
        jest.spyOn(redux, "useSelector")
            .mockReturnValue({ userInfo: "", loading: true, error: "" })

            const { queryByTestId } = render(
                <Provider store={store} >
                    <Signin {...props} />
                </Provider>
            )

            expect(queryByTestId("loader")).toBeInTheDocument()
    }),
    it("show error when there's error signing in", ()=>{
        jest.spyOn(redux, "useSelector")
            .mockReturnValue({ userInfo: "", loading: false, error: "singin failed" })

            const { queryByTestId } = render(
                <Provider store={store} >
                    <Signin {...props} />
                </Provider>
            )

            expect(queryByTestId("loader")).not.toBeInTheDocument()
            expect(queryByTestId("signin-error")).toBeInTheDocument()
    })
})