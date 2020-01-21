import React from 'react';
import '../Styling/normalize.css'
import '../Styling/skeleton.css'
import {Route, Switch } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";
import About from "./About";
import Home from "./Home";


const Main = props => (

    <div className="container">



        <div className="container-header">
            <h3>Wahaca</h3>

            <div className="header-menu-button">
                <HamburgerMenu
                    isOpen={props.buttonState}
                    menuClicked = {props.menuClicked}
                    color={"#87D333"}
                    animationDuration={0.5} />
            </div>

        </div>
        <div className="Main-content">
            <div className="page-router">
                <Switch>
                    <Route path="/About" component={About}/>
                    <Route path="/Home" component={Home}/>
                    <Route path="/" exact />

                </Switch>
            </div>
        </div>

    </div>


);

export default Main;