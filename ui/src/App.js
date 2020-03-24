import React, {useEffect} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import Order from "./Components/Order";
import Tracking from "./Components/Payment/Tracking";
import WaiterMenu from "./Components/WaiterMenu";
import userActions from "./actions/userActions";
import OrderSummary from "./Components/Payment/OrderSummary";
import PaymentForm from "./Components/Payment/PaymentForm";
import PostPaymentPage from "./Components/Payment/PostPaymentPage";

const App = () => {
    const currentUser = useSelector(state => state.currentUser);

    const dispatch = useDispatch();
    useEffect(() => dispatch(userActions.autoLogIn()),
        [dispatch]);

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

                        {currentUser.staff ?
                            <>
                                <Route path="/WaiterDashboard">
                                    <WaiterDashboard />
                                </Route>
                                <Route path="/WaiterMenu">
                                    <WaiterMenu />
                                </Route>

                            </>
                            :
                            <>
                                <Route path="/WaiterDashboard">
                                    <FoodMenu />
                                </Route>
                                <Route path="/WaiterMenu">
                                    <FoodMenu />
                                </Route>
                            </>
                        }

                        {currentUser.loggedIn ?
                            <>
                                <Route path="/Login">
                                    <FoodMenu />
                                </Route>
                                <Route path="/Register">
                                    <FoodMenu />
                                </Route>
                                <Route path="/Order">
                                    <Order />
                                </Route>
                                <Route path="/Tracking">
                                    <Tracking/>
                                </Route>
                                <Route path="/PaymentForm">
                                    <PaymentForm/>
                                </Route>
                                <Route path="/OrderSummary">
                                    <OrderSummary/>
                                </Route>
                                <Route path="/PostPaymentPage">
                                    <PostPaymentPage/>
                                </Route>
                            </>
                            :
                            <>
                                <Route path="/Login">
                                    <SignIn />
                                </Route>
                                <Route path="/Register">
                                    <SignUp />
                                </Route>
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
