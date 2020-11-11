import React, { useState, useEffect, useRef } from 'react'
import { sortProducts } from '../actions/productActions';
import { useDispatch } from "react-redux";
import { Box, Button, createMuiTheme, Fade, Input, makeStyles, MenuItem, Select } from '@material-ui/core';
import clsx from 'clsx';
import SortIcon from '@material-ui/icons/Sort';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';



SelectFilter.propTypes = {
    searchIconWidth: PropTypes.number,
    selectIconWidth: PropTypes.number,
    viewport: PropTypes.number,
    handleFocus: PropTypes.func,
    isActive: PropTypes.bool,
    getIconsWidth: PropTypes.func,
    isColored: PropTypes.bool,
    isOut: PropTypes.bool,
    setIsOut: PropTypes.func,
    selectFilter: PropTypes.string,
    setSelectFilter: PropTypes.func
}

const styles = makeStyles(theme => {
    return {
        select: {
            transition: theme.transitions.create(["width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            width: 0,
            overflow: "hidden"
        },
        desplegado: {
            width: (props)=> props.viewport < 500 ? `${props.viewport - props.searchIconWidth - props.selectIconWidth - 60}px` : `${250}px`,
            transition: theme.transitions.create(["width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        },
        icon: {
            transition: theme.transitions.create(["opacity"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
                delay: "300ms"
            }),
            opacity: 1
        },
        iconfaded: {
            transition: theme.transitions.create(["opacity"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            opacity: 0
        },
        button: {
            minWidth: "37px",
            padding: 0
        },
        contained: {
            transition: theme.transitions.create(["background-color"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            })
        },
        triangle: {
            fill: (props)=>props.isColored ? "white" : "black"
        },
        underline: {
           
            "&:before":{
                borderBottom: "1px solid white !important",

                "&:focus":{
                    borderBottom: "1px solid white"
                }
            },
            // "&:after":{
            //         borderBottom: "1px solid white"
                
            // }
        }
    }
})
export default function SelectFilter({ selectFilter, setSelectFilter, viewport, isActive, handleFocus, getIconsWidth, isColored, isOut, setIsOut, selectIconWidth, searchIconWidth, tema }) {
    
    const [filterClicked, setFilterClicked] = useState(false)
    const [hasBeenTouched, setHasBeenTouched] = useState(false)
    
    const icon = useRef()
    const select = useRef(null)
   
    const dispatch = useDispatch()

    useEffect(() => {
        if (icon && icon.current) {
            getIconsWidth("select", icon.current.offsetWidth)
        }
    }, [])

    useEffect(() => {
        hasBeenTouched && dispatch(sortProducts(selectFilter))
    }, [selectFilter])


    const handleMouseOver = () => {
        if (viewport > 500) {
            isActive && handleFocus("select")
        }
    }

    const handleChangeFilter = (e) => {

        setSelectFilter(e.target.value)
        if (!hasBeenTouched) setHasBeenTouched(true)
    }
    const props = { viewport, searchIconWidth, selectIconWidth, isColored }
    const clases = styles(props)

    useEffect(() => {
        if (isOut) {
            handleFocus("select")
            select.current.focus()
        }
    }, [isOut])

    const handleTransitionEnd = () => {
        select.current.focus()
    }

    const theme = createMuiTheme({
        palette: {
            type:"dark"
        }
    })

    return (
        <div className={filterClicked ? "filter-group with-hide right" : "filter-group right"}>
            <div className="responsive-inner">
                <Fade in={!isActive}>
                    <Disiper
                        isOut={isOut}
                        delay={40}
                        isActive={isActive}
                    >
                        <Button
                            id="spanAnimated" className={filterClicked ? "animated right" : "right"}

                            ref={icon}
                            classes={{ root: clases.button, contained: clases.contained }}
                            variant="contained"
                            onMouseOver={handleMouseOver}
                            onTransitionEnd={() => { setIsOut(true) }}
                            onClick={() => { setIsOut(true) }}

                            color={isColored ? "secondary" : "default"}

                        >
                            <SortIcon
                                style={{ cursor: "pointer", fontSize: "33px" }}

                                className={clsx({
                                    [clases.icon]: !isActive,
                                    [clases.iconfaded]: isActive
                                })}
                            />

                        </Button>
                    </Disiper>
                </Fade>
                <ThemeProvider theme={tema}>
                    <Select id="sort-by"
                        ref={select}
                        onChange={(e) => { handleChangeFilter(e) }}
                        // className={filterClicked ? "animated" : ""}
                        onMouseOver={() => !isActive ? handleFocus("select") : undefined}
                        className={clsx(clases.select, {
                            [clases.desplegado]: isActive
                        })}
                        value={selectFilter}
                        onTransitionEnd={handleTransitionEnd}
                        style={isColored?{color: "white"}:{color: "black"}}
                        
                        input={<Input classes={{
                            underline: clases.underline
                        }} />}
                        classes={{icon: clases.triangle}}
                        color="secondary"
                    //onBlur={()=>{ handleBlur("select")}}
                    >
                        <MenuItem className={filterClicked ? "hasAnimated" : ""} value="higher price">higher price</MenuItem>
                        <MenuItem className={filterClicked ? "hasAnimated" : ""}
                            value="lower price">lower price</MenuItem>
                        <MenuItem className={filterClicked ? "hasAnimated" : ""} value="newest">newest</MenuItem>
                    </Select>
                </ThemeProvider>

            </div>
        </div>
    )
}




const Disiper = ({ children, isOut }) => {

    return (
        <Box display={isOut ? "none" : "unset"}>
            {children}
        </Box>
    )
}

Disiper.propTypes = {
    isOut: PropTypes.bool
}