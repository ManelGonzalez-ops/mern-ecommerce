import { AppBar, createMuiTheme, IconButton, makeStyles, Paper, useTheme } from '@material-ui/core'
import React, { useState, useEffect, useRef } from 'react'
import Breadcrumb from './Breadcrumb';
import Sorter from "./SelectIcon"
import Search from "./SearchIcon"
import AppsIcon from '@material-ui/icons/Apps'
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const styles = makeStyles(theme => ({
    root: {
        //disable default transitions
        transition: "none",
        //allow breadcrumb collapses
        flexWrap: "wrap"
    },
    buton: {
        zIndex: 1
    }
}))




export const StickyBar =
    React.forwardRef(
        ({
            setOpenAside,
            goBack,
            category,
            viewport,
            handleFocus,
            active,
            handleBlur,
            selectFilter,
            setSelectFilter,
            getIconsWidth,
            searchIconWidth,
            selectIconWidth,
            isColored,
            isOut,
            setIsOut,
            handleCategorySearch
        }, ref) => {

            const navActions = useRef(null)
            const clases = styles()


            const theme = useTheme()



            return (

                <Paper
                    ref={ref}
                    style={isColored ? { boxShadow: "0 4px 2px -2px #c5bbbb" } : { boxShadow: "none" }}
                    classes={{ root: clases.root }}
                    component="nav"
                    className="menubar"

                >

                    <div className="collapsable-wrap">
                        {viewport > 500 &&
                            <IconButton
                                color="inherit"
                                onClick={() => { setOpenAside(true) }}
                                classes={{ root: clases.buton }}
                                data-testid="drawer-button"
                            >
                                <AppsIcon fontSize="large" style={{ fill: "white" }} />
                                <span
                                    className="ripple"
                                ></span>
                            </IconButton>
                        }


                        {viewport > 500 &&
                            <Breadcrumb
                                category={category}
                                goBack={goBack}
                                isColored={isColored}
                            />}
                    </div>
                    <Box
                        display="flex"
                        height="100%"
                        justifyContent="flex-end"
                        flex={1}
                        ref={navActions}
                    >
                        <Search
                            viewport={viewport}
                            handleFocus={handleFocus}
                            isActive={viewport < 500 ? (active === "search" ? true : false) : (active && active.includes("search") ? true : false)}
                            getIconsWidth={getIconsWidth}
                            selectIconWidth={selectIconWidth}
                            searchIconWidth={searchIconWidth}
                            handleBlur={handleBlur}
                            isColored={isColored}
                            tema={theme}
                            handleCategorySearch={handleCategorySearch}
                            parent={navActions.current}
                        />
                        <Sorter selectFilter={selectFilter}
                            setSelectFilter={setSelectFilter}
                            viewport={viewport}
                            handleFocus={handleFocus}
                            isActive={viewport < 500 ? (active === "select" ? true : false) : (active && active.includes("select") ? true : false)}
                            getIconsWidth={getIconsWidth}
                            searchIconWidth={searchIconWidth}
                            selectIconWidth={selectIconWidth}
                            isColored={isColored}
                            isOut={isOut}
                            setIsOut={setIsOut}
                            handleBlur={handleBlur}
                            tema={theme}
                            parent={navActions.current}
                        />
                    </Box>
                </Paper>

            )

        }
    )







StickyBar.propTypes = {
    searchIconWidth: PropTypes.number,
    selectIconWidth: PropTypes.number,
    setOpenAside: PropTypes.func,
    viewport: PropTypes.number,
    handleFocus: PropTypes.func,
    handleBlur: PropTypes.func,
    active: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    getIconsWidth: PropTypes.func,
    isColored: PropTypes.bool,
    isOut: PropTypes.bool,
    setIsOut: PropTypes.func,
    goBack: PropTypes.func,
    category: PropTypes.string,
    setCategory: PropTypes.func,
    searchFilter: PropTypes.string,
    setSearchIconWidth: PropTypes.func,
    selectFilter: PropTypes.string,
    setSelectFilter: PropTypes.func
}