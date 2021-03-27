import React from "react";
import { Provider } from 'react-redux';
import store from '../store';
import { render, getByTestId, fireEvent, screen, act, cleanup, waitForElementToBeRemoved } from '@testing-library/react';
import { ProductSection2 } from '../components/ProductSection2';
import { ItemAssignmentContext } from "twilio/lib/rest/numbers/v2/regulatoryCompliance/bundle/itemAssignment";
import { StickyBar } from "../components/StickyBar";
import * as context from "../Context"


describe("testing <StickyNav/>", () => {

    let props
    beforeEach(() => {
        props = {
            setOpenAside: jest.fn(),
            goBack: jest.fn(),
            //category: jest.fn(),
            //viewport: jest.fn(),
            handleFocus: jest.fn(),
            //active: jest.fn(),
            handleBlur: jest.fn(),
            //selectFilter: jest.fn(),
            setSelectFilter: jest.fn(),
            getIconsWidth: jest.fn(),
            //searchIconWidth: jest.fn(),
            //selectIconWidth: jest.fn(),
            //isColored: jest.fn(),
            //isOut: jest.fn(),
            selectFilter: "",
            setIsOut: jest.fn(),
            handleCategorySearch: jest.fn(),
        }

        jest.spyOn(context, "useDataLayer").mockImplementation(() => ({ isDark: false }))
    })

    it("it renders search and sort select and search inputs", () => {

        const { queryByLabelText, queryByTestId } = render(
            <Provider store={store}>
                <StickyBar {...props} />
            </Provider>
        )

        expect(queryByTestId("searcher")).toBeInTheDocument()
        expect(queryByTestId("sorter")).toBeInTheDocument()

    })
})
