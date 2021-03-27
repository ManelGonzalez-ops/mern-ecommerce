import React from "react"
import * as Contexto from "../Context";
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import store from '../store';
import { render, fireEvent, getByTestId, screen, act, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import { jssPreset } from "@material-ui/styles";
import { Aside } from "../components/Aside";


describe.skip("<Aside/>", () => {

    let initialProps
    beforeEach(() => {
        initialProps = {
            openAside: true
            ,
            search: jest.fn(),
            closeAs: jest.fn(),
            setOpenAside: jest.fn()
        }
    })
    it("renders correctly", () => {

        const { queryByRole, queryByTestId } = render(
            <Provider store={store}>
                <Aside {...initialProps} />
            </Provider>)
        screen.debug()
        const aside = queryByTestId("aside")
        const category = queryByRole("link", {name: /link-accesories/i})
        expect(category).toBeInTheDocument()
        fireEvent.click(category)
        expect(initialProps.search).toHaveBeenCalledWith("Accesories")

    })
})