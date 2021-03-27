import React from "react";
import * as Contexto from "../Context";
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import store from '../store';
import { render, getByTestId, fireEvent, screen, act, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import { createMemoryHistory } from "history"
import { Router } from "react-router-dom"
import Cart from "../components/Cart";
import { jssPreset } from "@material-ui/styles";

describe("<Cart/>", () => {

    let props
    beforeEach(() => {
        props = {
            match: { params: { productId: "3445" } },
            location: { search: "" }
        }
    })
    it("renders correctly", () => {
        //const history = createMemoryHistory()
        const { queryByTestId } = render(

            <Provider store={store}>
                <Cart {...props} />
            </Provider>
        )

        expect(queryByTestId("cart-view")).toBeInTheDocument()
    })
    it("renders loading only when loading", () => {
        //const history = createMemoryHistory()
        const useSelector = jest.spyOn(redux, "useSelector")

        useSelector.mockReturnValue({ cartItems: [], loading: true, error: null })

        const { queryByTestId, rerender } = render(
            <Provider store={store}>
                <Cart {...props} />
            </Provider>
        )

        expect(queryByTestId("loader")).toBeInTheDocument()

        useSelector.mockReturnValue({ cartItems: [], loading: false, error: null })
        rerender(<Provider store={store}>
            <Cart {...props} />
        </Provider>)
        expect(queryByTestId("loader")).not.toBeInTheDocument()
    })
    it("shows error when there's error", () => {
        //const history = createMemoryHistory()
        const useSelector = jest.spyOn(redux, "useSelector")

        useSelector.mockReturnValue({ cartItems: [], loading: false, error: { message: "server error" } })

        const { queryByText, rerender } = render(
            <Provider store={store}>
                <Cart {...props} />
            </Provider>
        )

        expect(queryByText(/server error/i)).toBeInTheDocument()

        useSelector.mockReturnValue({ cartItems: [], loading: false, error: "" })
        rerender(<Provider store={store}>
            <Cart {...props} />
        </Provider>)
        expect(queryByText(/server error/i)).not.toBeInTheDocument()
    })
    it("shows alert empty cart when it's empty", () => {
        //const history = createMemoryHistory()
        const useSelector = jest.spyOn(redux, "useSelector")

        useSelector.mockReturnValue({ cartItems: [], loading: false, error: "" })

        const { queryByText, rerender } = render(
            <Provider store={store}>
                <Cart {...props} />
            </Provider>
        )

        expect(queryByText(/Cart is empty/i)).toBeInTheDocument()

    })
})

