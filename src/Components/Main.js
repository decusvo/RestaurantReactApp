import React from 'react';
import '../Styling/normalize.css'
import '../Styling/skeleton.css'
import {Route, Switch } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";
import About from "./About";
import Home from "./Home";
import FoodMenu from "./FoodMenu";


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
                <Switch>
                    <Route path="/About" component={About}/>
                    <Route path="/Home" component={Home}/>
                    <Route path="/" exact />
                    <Route path="/FoodMenu" component={FoodMenu}/>

                </Switch>
        </div>

    </div>


);

export default Main;