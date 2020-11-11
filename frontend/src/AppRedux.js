import React, { useEffect, useState, Fragment } from 'react';
import './App.css';
// import Products from "./data"
import DetailsRedux from "./components/DetailsRedux"
import { HashRouter, Route, Switch } from "react-router-dom"
import Nav from "./components/Nav"
import Cart from "./components/Cart"
import { Signin } from "./components/Signin"
import Signup from "./components/Signup"
import ProductCreator from "./components/ProductCreator"
import Hall from "./components/Hall"
import Shipping from "./components/Shipping"
import Checkout from "./components/Checkout"
import { useSelector, useDispatch } from "react-redux"
import UserView from "./components/userView"
import OrderDetails from "./components/OrderDetails"
import { Stepper2 } from './components/Stepper2';
import { useDataLayer } from './Context';
import { createMuiTheme, Paper, ThemeProvider } from "@material-ui/core";
import { InfoSnackbar } from './components/InfoSnackbar';



function App() {

    const { setViewport, isDark } = useDataLayer()
    

    const theme = createMuiTheme({
        palette: {
            type: isDark ? "dark" : "light"
        },
        overrides: {
            MuiLink: {
                root: {
                    cursor: "pointer"
                }
            }
        }
    })

    useEffect(() => {
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])


    const handleResize = () => {
        setViewport(window.innerWidth)
    }


    //tenemos que renderizar dodicionalmente StepTimeline

    const { currentPath } = useSelector(state => state.currentPath)



    return (

        <HashRouter>
            <ThemeProvider theme={theme}>
                <Paper>
                    <div className="app-wrapper">
                        <Nav />

                    </div>
                    {currentPath === "show" && <Stepper2 />}


                    <Route path="/shipping" exact component={Shipping} />

                    <Route path="/signin" exact component={Signin} />

                    <Route path="/signup" exact component={Signup} />

                    <Route path="/checkout" exact component={Checkout} />


                    <Switch>
                        <Route path="/product/:productId" exact component={DetailsRedux} />
                    </Switch>
                    <Switch>
                        <Route path="/user" exact component={UserView} />
                    </Switch>
                    <Switch>
                        <Route path="/order/:id" exact component={OrderDetails} />
                    </Switch>
                    <Switch>
                        <Route path="/cart/:productId?" exact component={Cart} />
                    </Switch>
                    <Switch>
                        <Route path="/addstore" exact component={ProductCreator} />
                    </Switch>
                    <Switch>
                        <Route path="/" exact component={Hall}>
                        </Route>
                    </Switch>
                   <InfoSnackbar message="you are already signin"/>

                    <footer className="footer">
                        All rights reserved	&copy;
            </footer>
                </Paper>
            </ThemeProvider>


        </HashRouter>

    );
}

export default App;
