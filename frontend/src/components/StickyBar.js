import { AppBar, createMuiTheme, IconButton, makeStyles, Paper, useTheme } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom"
import ListIcon from '@material-ui/icons/List';
import Breadcrumb from './Breadcrumb';
import Sorter from "./SelectIcon"
import Search from "./SearchIcon"
import clsx from 'clsx';
import AppsIcon from '@material-ui/icons/Apps'
import { useDataLayer } from '../Context';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const styles = makeStyles(theme => ({
    root: {
        background: theme.palette.type === "light"? "white": "#424242"
    },
    buton:{
        zIndex: 1
    }
}))




export const StickyBar =
    React.forwardRef(
        ({
            setOpenAside,
            goBack,
            category,
            searchFilter,
            setSearchFilter,
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
            setIsOut
        }, ref) => {


            const clases = styles()
           
       
            
            

            const theme = useTheme()

            const tema = createMuiTheme({
                palette: {
                    type: theme.palette.type == "dark" ? "dark" : isColored ? "dark" : "light"
                }
            })

            return (
                <Paper
                elevation={0}
                    ref={ref}
                    //top will work when fixed position is set
                    // sx={{
                    //     backgroundColor: isColored ? "primary.main": "default"
                    // }}
                    style={theme.palette.type === "light"? {backgroundColor: "white"} : {backgroundColor: "#424242"}}
                    classes={{ root: clases.root }}
                    className="menubar"
                //color={theme.palette.primary.main}

                // className="filter__container" ref={stickyLabel}
                >

                    {viewport > 500 &&
                        <IconButton
                            color="inherit"
                            onClick={() => { setOpenAside(true) }}
                            classes={{root: clases.buton}}
                        >
                            <AppsIcon fontSize="large" style={{fill: "white"}}/>
                            <span
                            className="ripple"
                            ></span>
                        </IconButton>
                    }


                    {category &&
                        <Breadcrumb 
                        category={category}
                         goBack={goBack} 
                         isColored={isColored}
                         />}

                    <Box
                        display="flex"
                        alignItems="flex-end"
                        height="100%"
                        justifyContent="flex-end"
                        flex={1}
                    >
                        <Search

                            searchFilter={searchFilter}
                            setSearchFilter={setSearchFilter} viewport={viewport}
                            handleFocus={handleFocus}
                            isActive={viewport < 500 ? (active === "search" ? true : false) : (active && active.includes("search") ? true : false)}
                            getIconsWidth={getIconsWidth}
                            selectIconWidth={selectIconWidth}
                            searchIconWidth={searchIconWidth}
                            handleBlur={handleBlur}
                            isColored={isColored}
                            tema={tema}
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
                            tema={tema}
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