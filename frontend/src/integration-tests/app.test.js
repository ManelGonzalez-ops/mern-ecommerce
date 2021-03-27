import React from "react";
import * as Contexto from "../Context";
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import store from '../store';
import { render, getByTestId, fireEvent, screen, act, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import { ProductSection2 } from '../components/ProductSection2';
import { StickyBar } from '../components/StickyBar';
import { ResponsiveSkeleton } from "../components/ProductSection2";
import { expectation } from "sinon";


const productsMock = [
    {
        name: "manilox shoes", brand: "nike", price: 25, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png", description: "mola molte", "rating": 4, category: ["Sports"]
    }
]

const productsMock2 = [
    {
        name: "manilox shoes", brand: "nike", price: 25, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png", description: "mola molte", "rating": 4, category: ["Sports"]
    },
    {
        name: "manilox shoes", brand: "nike", price: 25, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/220px-Image_created_with_a_mobile_phone.png", description: "mola molte", "rating": 4, category: ["Accesories"]
    },

]


describe.skip("<ProductSection2/>", () => {

    beforeEach(() => {
        jest.useFakeTimers("modern")

        //fake useContext
        const contextvals = { setViewport: jest.fn(), isDark: true, viewport: 600 }
        jest
            .spyOn(Contexto, "useDataLayer")
            .mockImplementation(() => contextvals)

        //fake useSelector 
        // const spy = jest.spyOn(redux, "useSelector")
        // spy.mockReturnValue({ products: productsMock, loading: false, error: "" })

        //fake portal
        const modalRoot = global.document.createElement('div');
        modalRoot.setAttribute('id', 'portal');
        const body = global.document.querySelector('body');
        body.appendChild(modalRoot);
    })

    afterEach(() => {
        cleanup()
    })

    it.skip("Loading indicator (skeleton) shows the first 600ms", async () => {

        const spy = jest.spyOn(redux, "useSelector")
        spy.mockReturnValue({ products: productsMock, loading: false, error: "" })

        const { getByLabelText, debug, queryByLabelText } = render(
            <Provider store={store}>
                <ProductSection2
                />
            </Provider>)


        //debug()
        expect(getByLabelText("loading")).toBeTruthy()
        act(() => jest.advanceTimersByTime(600))
        //we can't assert negatively with react-testing-library getBy..

        // const skeleton = getByLabelText("loading")
        // expect(skeleton).toBeFalsy() 
        //<-------------Error throwen

        //we have to use queryBy for negative assertions
        // expect(queryByLabelText("loading")).not.toBeInTheDocument()
        expect(queryByLabelText("loading")).toBeFalsy()
        // await waitForElementToBeRemoved(() => getByLabelText("loading"))
    }),

        it.skip("products are shwon when redux has products in the store", () => {

            const spy = jest.spyOn(redux, "useSelector")
            spy.mockReturnValue({ products: productsMock, loading: false, error: "" })

            const { queryAllByLabelText, debug } = render(
                <Provider store={store}>
                    <ProductSection2
                    />
                </Provider>)

            spy.mockReturnValue({ products: productsMock, loading: false, error: "", filteredProducts: productsMock })
            act(() => jest.advanceTimersByTime(600))
            const producto = queryAllByLabelText(/producto/i)
            console.log(producto, "que coño")
            expect(producto).toHaveLength(1)
            const category = queryAllByLabelText(/sports/i)
            //debug()
            expect(category).toHaveLength(1)
        }),

        it("filters products by category when select category", async () => {

            const spy = jest.spyOn(redux, "useSelector")
            //const miuseSelector = spy

            spy.mockReturnValue({ products: productsMock2, loading: false, error: "", filteredProducts: productsMock2 })

            const { queryByTestId, queryByText, debug, getByTestId, getByLabelText, queryByLabelText, rerender } = render(
                <Provider store={store}>
                    <ProductSection2
                    />
                </Provider>)

            spy.mockReturnValue({ products: productsMock2, loading: false, error: "", filteredProducts: productsMock2 })
            act(() => jest.advanceTimersByTime(600))

            //act(() => jest.advanceTimersByTime(600))
            const accesories = queryByLabelText(/producto-accesories/i)
            //screen.debug(undefined, 300000)
            expect(accesories).toBeTruthy()
            //first we need to open the aside
            //first is close
            expect(queryByTestId(/sidebar/i)).not.toBeInTheDocument()
            //when we click opens
            const drawer = getByTestId(/drawer-button/i)
            fireEvent.click(drawer)
            expect(queryByTestId(/sidebar/i)).toBeInTheDocument()

            const sportsDrawerOption = getByLabelText(/link-sports/i)
            fireEvent.click(sportsDrawerOption)
            spy.mockReturnValue({ products: productsMock, loading: false, error: "", filteredProducts: productsMock })
            //manually rerender to execute useEffect with the updated useSelector values
            rerender(
                <Provider store={store}>
                    <ProductSection2
                    />
                </Provider>)
            //screen.debug(undefined, 300000)
            //here we manually filter products as a result of selecting a categoryy and add them to the reducer



            //  await waitForElementToBeRemoved(() => queryByLabelText(/producto-accesories/i))
            expect(await queryByLabelText(/producto-accesories/i)).toBeFalsy()

        })


})





