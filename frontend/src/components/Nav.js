import React, { useState, useEffect, useRef } from 'react'
import {  useHistory, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { userLogout } from "../actions/userActions"
import { AppBar, Badge, Box, IconButton, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Tab, Tabs, Toolbar, Typography, withStyles } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'
import { useWindowWidth } from '../utils/useWindowWidth'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FaceIcon from '@material-ui/icons/Face';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { Switcher } from './Switcher'
import { useDataLayer } from '../Context'

const styles = makeStyles(theme => ({

    toolbar: {
        display: "flex",
        width: "100%",
        paddingRight: "-5px"
    },

    logo: {
        flex: 1
    },
    items: {

        display: "flex",
        alignItems: "center",
        [theme.breakpoints.up("sm")]: {
            flex: 1,
            justifyContent: "space-evenly",

        },
    },
    tab: {

        [theme.breakpoints.up("sm")]: {
            minWidth: "auto"
        },
        [theme.breakpoints.up("md")]: {
            minWidth: "120px"
        },
        [theme.breakpoints.up("lg")]: {
            minWidth: "160px"
        },
    },
    nav: {
        [theme.breakpoints.up("md")]: {
            paddingRight: "1.7rem",
            paddingLeft: "1.7rem"
        },
        [theme.breakpoints.up("lg")]: {
            paddingRight: "2.5rem",
            paddingLeft: "2.5rem"
        },
        [theme.breakpoints.up("xl")]: {
            paddingRight: "4rem",
            paddingLeft: "4rem"
        }
    },
    tabs: {
        alignItems: "center"
    },

}))


export default function Nav() {


    const [qty, setQty] = useState(0)
    const taba = useRef(null)
    const { userInfo } = useSelector(state => state.userSignin)
    const [tabVal, setTabVal] = useState(1)
    const windowwidth = useWindowWidth()[0]
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const { viewport } = useDataLayer()
    const logout = () => {
        dispatch(userLogout())
    }

    const { cartItems } = useSelector(state => state.cart)

    useEffect(() => {
        const total = cartItems.reduce((x, y) => x + parseInt(y.qty), 0)
        setQty(total)
    }, [cartItems])

    console.log(location, "location")
    useEffect(() => {
        console.log(tabVal, "historyytaabval")
        console.log(location.pathname, "historyy")
        if (location.pathname === "/") {
            setTabVal(0)
        }
        else if (location.pathname.includes("/cart")) {
            setTabVal(1)
        }
        else if (location.pathname.includes("/signin") || location.pathname.includes("/signup")) {
            setTabVal(2)
        }

    }, [location.pathname])



    const handleTabChange = (e, val) => {
        // history.push(val)

        history.push(e.currentTarget.name)
        setTabVal(val)
    }
    const all11props = (index) => ({
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    })


    const clases = styles()


    return (


        <>
            <AppBar position="static"

                //style={{background: "white"}}
                classes={{ root: clases.nav }}
            >
                <Toolbar
                    classes={{ root: clases.toolbar }}
                >

                    <Typography variant="h6" noWrap
                        className={clases.logo}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 16 16" style={{marginRight: "7px"}}>
                            <path fill="white" d="M16 16h-16l16-16z" />
                        </svg>
                        Corner Shop
                    </Typography>

                    <Box
                        classes={{ root: clases.items }}
                    >

                        {windowwidth > 460 &&

                            <Tabs
                                value={tabVal}
                                ref={taba}
                                indicatorColor="secondary"
                                textColor="inherit"
                                onChange={handleTabChange}
                                aria-label="disabled tabs example"
                                scrollButtons="desktop"
                                centered
                                classes={{ root: clases.tabs }}
                            // classes={{scrollButtonsDesktop:clases.scrollButtons,indicator: clases.indicator}}
                            >
                                <Tab
                                    classes={{ root: clases.tab }}
                                    label="Shop" {...all11props(0)} name="/" />
                                <Tab
                                    classes={{ root: clases.tab }}
                                    label="Cart" {...all11props(1)} name="/cart" />
                                {
                                    userInfo ? <Tab
                                        classes={{ root: clases.tab }}
                                        label="Sign in" {...all11props(2)} name="/signin" />
                                        :
                                        <Tab
                                            classes={{ root: clases.tab }}
                                            label="Sign up" {...all11props(2)} name="/signup" />
                                }

                            </Tabs>
                        }


                        <IconButton aria-label="show 4 new mails" color="inherit"
                            onClick={() => { history.push("/cart") }}
                        >
                            <Badge badgeContent={qty} color="secondary"
                            >
                                <ShoppingCartIcon
                                    style={viewport > 500 ? { fontSize: "28px" } : { fontSize: "25px" }}
                                />
                            </Badge>
                        </IconButton>


                        {/* <div >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => { setopenMovile(true) }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div> */}

                        <CustomizedMenus
                            viewport={viewport}
                        />
                        <Switcher />
                    </Box>
                </Toolbar>
            </AppBar>

        </>
    )
}


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);



function CustomizedMenus({ viewport }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const history = useHistory()
    const handleRouteChange = (param) => {
        console.log("vuva")
        history.push(param)
    }


    return (
        <div >
            <IconButton
                edge="end"
                aria-label="account"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}
            >
                <AccountCircle
                    style={viewport > 500 ? { fontSize: "28px" } : { fontSize: "25px" }}

                />
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem
                    onClick={() => { handleRouteChange("/user") }}
                >
                    <ListItemIcon>
                        <FaceIcon />
                    </ListItemIcon>
                    <ListItemText primary={"User Section"}
                    />
                </StyledMenuItem>
                <StyledMenuItem
                    onClick={() => { handleRouteChange("/addstore") }}
                >
                    <ListItemIcon>
                        <AddToPhotosIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add product" />
                </StyledMenuItem>

            </StyledMenu>
        </div>
    );
}



export const CloseBtn = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" /></svg>


