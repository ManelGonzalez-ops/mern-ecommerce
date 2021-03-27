import React from "react";
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import store from '../store';
import { render, getByTestId, fireEvent, screen, act, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import { Details } from "../components/DetailsRedux";
import { createMemoryHistory } from "history"
import { Router } from "react-router-dom"

describe("<Deatils/>", () => {



    it("renders correctly", () => {

        jest.spyOn(redux, "useSelector")
            .mockReturnValue({ details: { stock: 0 } })
        const props = { match: { params: "" } }

        const history = createMemoryHistory()
        const { getByTestId } = render(
            <Provider store={store}>
                <Router history={history}>
                    <Details {...props} />
                </Router>
            </Provider>
        )

        expect(getByTestId("details-view")).toBeInTheDocument()

    }),

        it("shows loading indicator when loading", () => {

            jest.spyOn(redux, "useSelector")
                .mockReturnValue({ details: {}, loading: true })
            const props = { match: { params: "" } }

            const history = createMemoryHistory()
            const { queryByTestId, rerender } = render(
                <Provider store={store}>
                    <Router history={history}>
                        <Details {...props} />
                    </Router>
                </Provider>
            )

            expect(queryByTestId("loader")).toBeInTheDocument()

            jest.spyOn(redux, "useSelector")
                .mockReturnValue({ details: {}, loading: false })

            //if loading is false we loader should be showing
            rerender(<Provider store={store}>
                <Router history={history}>
                    <Details {...props} />
                </Router>
            </Provider>)

            expect(queryByTestId("loader")).not.toBeInTheDocument()
        }),

        it("shows custom message when there isn't stock", () => {

            const props = { match: { params: "" } }
            const history = createMemoryHistory()
            jest.spyOn(redux, "useSelector")
                .mockReturnValue({ details: { stock: 0 }, loading: false })

            const { queryByTestId, debug } = render(
                <Provider store={store}>
                    <Router history={history}>
                        <Details {...props} />
                    </Router>
                </Provider>
            )
            //debug()
            expect(queryByTestId("no-stock-msg")).toBeInTheDocument()
        }),

        it("shows an error when redux returns error", () => {

            const props = { match: { params: "" } }
            const history = createMemoryHistory()
            const errorMsg = "failed to fetch, product no available"
            jest.spyOn(redux, "useSelector")
                .mockReturnValue({ details: {}, loading: false, error: errorMsg })

            const { queryByTestId, debug } = render(
                <Provider store={store}>
                    <Router history={history}>
                        <Details {...props} />
                    </Router>
                </Provider>
            )
            //debug()
            expect(queryByTestId("error-msg")).toBeInTheDocument
        }),

        it("shows the correct product and all its relevant info", () => {

            const props = { match: { params: "" } }
            const history = createMemoryHistory()
            const productDetails = { name: "Babolat Pure Drive", price: 200, stock: 30, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTam1pKWGjb5js7bYOHHobLWQSFsRDvFomSdLv3ASgjajbJ_1M5jgvH_sv4iT952YSEq1Du21A&usqp=CAc" }
            jest.spyOn(redux, "useSelector")
                .mockReturnValue({ details: productDetails, loading: false, error: false })

            const { queryByTestId, debug, queryByRole, queryByLabelText } = render(
                <Provider store={store}>
                    <Router history={history}>
                        <Details {...props} />
                    </Router>
                </Provider>
            )
            
            //debug()
            expect(queryByRole("img", { name: "Babolat Pure Drive" })).toBeInTheDocument()

            expect(queryByTestId(/Babolat Pure Drive/i)).toBeInTheDocument()
            const select = queryByLabelText("select-quantity")
            expect(select).toBeInTheDocument()
        })
})