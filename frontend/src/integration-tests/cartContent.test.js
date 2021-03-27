import React from "react";
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import store from '../store';
import { render, getByTestId, fireEvent, screen, act, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import { CartContent } from "../components/CartContent";
import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"

describe("<CartContent/>", () => {
    let defaultProps = {
        clases: {},
        toCheckout: jest.fn(),
        updateCart: jest.fn(),
        deleteItem: jest.fn(),
        currentOrder: [],
        cartItems: []
    }
    it("renders correctly", () => {

        const { queryByTestId } = render(<CartContent
            {...defaultProps}
        />)

        expect(queryByTestId("cart-content-view")).toBeInTheDocument()
    }),
        it("renders correctly", () => {

            const { queryByTestId } = render(<CartContent
                {...defaultProps}
            />)

            expect(queryByTestId("cart-content-view")).toBeInTheDocument()
        }),
        it("shows 1 product when there's one product", () => {
            const cartItems = [
                {
                    id: "fdhdwit74",
                    qty: 5,
                    price: 30,
                    category: ["Sports"],
                    stock: 40,
                    rating: 0,
                    numReviews: 0,
                    reviews: [],
                    dateAdded: "2020-07-04T17:01:49.399Z",
                    name: "raqueta tennis",
                    image: "https://www.theroombarcelona.com/wp-content/uploads/2019/10/pam_jogger-Pants_blk1.jpg",
                    brand: "Ginova",
                    description: "muy buen producto"

                },
                {
                    id: "fdhdw54it74",
                    qty: 5,
                    price: 30,
                    category: ["Sports"],
                    stock: 40,
                    rating: 0,
                    numReviews: 0,
                    reviews: [],
                    dateAdded: "2020-07-04T17:01:49.399Z",
                    name: "raqueta tennis",
                    image: "https://www.theroombarcelona.com/wp-content/uploads/2019/10/pam_jogger-Pants_blk1.jpg",
                    brand: "Ginova",
                    description: "muy buen producto"

                },
            ]
            defaultProps = { ...defaultProps, cartItems }
            const history = createMemoryHistory()
            const { queryAllByTestId, queryByAltText } = render(
                <Router history={history} >
                    <CartContent
                        {...defaultProps}
                    />
                </Router>
            )

            expect(queryAllByTestId(/product/i)).toHaveLength(2)
            // expect(queryByAltText(/raqueta tennis/i)).toBeInTheDocument()
        })
})