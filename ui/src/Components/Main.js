import React from 'react';
import {Route, Switch } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";
import About from "./About";
import Home from "./Home";
import FoodMenu from "./FoodMenu";
import SignIn from './SignIn';
import Logo from '../Images/Logo.png';
import Img from 'react-image'
import WaiterDashboard from "./WaiterDashboard"


const Main = props => (

    <div className="container">



        <div className="container-header">
            <Img src={Logo} style={{width:"150px",height:"150px"}}/>

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
                    <Route path="/LogInPage" component={SignIn}/>
                    <Route path="/WaiterDashboard" component={WaiterDashboard}/>

                </Switch>
        </div>

        <div className="container-footer">
            <p>© 2019 Oaxaca</p>
        </div>

    </div>


);

export default Main;