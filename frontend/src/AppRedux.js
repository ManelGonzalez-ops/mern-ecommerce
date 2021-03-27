import React, { useEffect, useState, Fragment } from 'react';
import './App.css';
// import Products from "./data"
import { Details } from "./components/DetailsRedux"
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
import { createMuiTheme, Paper, ThemeProvider, Typography } from "@material-ui/core";
import { InfoSnackbar } from './components/InfoSnackbar';
import { PaymentMethod } from './components/PaymentMethod';
import { InView } from 'react-intersection-observer';


function App() {

    const { setViewport, isDark, setIsColored } = useDataLayer()


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
    console.log(setViewport, isDark, "teste")


    return (

        <HashRouter>
            <ThemeProvider theme={theme}>
                <Paper>
                    <div className="app-wrapper">
                        <InView
                            onChange={(inView) => {
                                inView ? setIsColored(false)
                                    :
                                    setIsColored(true)
                            }}
                        >
                            {({ ref, inView }) => (
                                <Nav ref={ref} inView={inView} />
                            )}
                        </InView>
                        <div onClick={() => setViewport(400)}></div>
                    </div>
                    {currentPath === "show" && <Stepper2 />}


                    <Route path="/shipping" exact component={Shipping} />

                    <Route path="/signin" exact component={Signin} />

                    <Route path="/signup" exact component={Signup} />

                    <Route path="/checkout" exact component={Checkout} />


                    <Switch>
                        <Route path="/product/:productId" exact component={Details} />

                        <Route path="/user" exact component={UserView} />

                        <Route path="/order/:id" exact component={OrderDetails} />

                        <Route path="/cart/:productId?" exact component={Cart} />

                        <Route path="/addstore" exact component={ProductCreator} />

                        <Route path="/" exact component={Hall}>
                        </Route>
                        <Route path="/payment_method">
                            <PaymentMethod />
                        </Route>
                    </Switch>
                    <InfoSnackbar message="you are already signin" />

                    <footer className="footer">
                        <Typography> All rights reserved	&copy;</Typography>
                    </footer>
                </Paper>
            </ThemeProvider>


        </HashRouter>

    );
}

export default App;
