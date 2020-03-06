import React from 'react';
import './App.css';
import Home from "./Components/Home";
import FoodMenu from "./Components/FoodMenu";
import About from "./Components/About";
import {Route, Router} from "react-router-dom";
import history from "./utils/history";
import NavBar from "./Components/NavBar";
import SignIn from "./Components/Login";
import SignUp from "./Components/SignUp";
import WaiterDashboard from "./Components/WaiterDashboard";
import {useSelector} from "react-redux";
import Order from "./Components/Order";
import OrderTracking from "./Components/OrderTracking";

const App = () => {
    const currentUser = useSelector(state => state.currentUser);

    return (
            <div className="App">
                <Router history={history}>
                    <div className="Index">
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                        <NavBar />

                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/Home">
                            <Home/>
                        </Route>
                        <Route path="/About">
                            <About/>
                        </Route>
                        <Route path="/Menu">
                            <FoodMenu />
                        </Route>
                        <Route path="/Login">
                            <SignIn />
                        </Route>
                        <Route path="/Register">
                            <SignUp />
                        </Route>
                        <Route path="/WaiterDashboard">
                            <WaiterDashboard />
                        </Route>
                        <Route path="/OrderTracking">
                            <OrderTracking />
                        </Route>

                        {currentUser.loggedIn ?
                            <>
                                <Route path="/Order">
                                    <Order />
                                </Route>

                            </>
                            :
                            <>
                                <Route path="/Order">
                                    <SignIn />
                                </Route>
                            </>}

                    </div>
                </Router>
            </div>
        );
};

export default App;
