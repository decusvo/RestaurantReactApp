import React from 'react';
import '../Styling/normalize.css'
import '../Styling/skeleton.css'
import {Route, Switch } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";
import About from "./About";
import Home from "./Home";

const landing = props => (

            <div className="container">

                <div className="page-router">
                <Switch>
                    <Route path="/About" component={About}/>
                    <Route path="/Home" component={Home}/>
                </Switch>
                </div>


                <div className="container-header">
                    <h3>Landing page</h3>

                    <div className="header-menu-button">
                        <HamburgerMenu
                            isOpen={props.buttonState}
                            menuClicked = {props.menuClicked}
                            color={"#87D333"}
                            animationDuration={0.5} />
                    </div>

                </div>
                <div className="row">
                    <div className="one-half column" style={{marginTop:"15%"}}>
                        <h4>Welcome to Waxaca</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                    </div>
                </div>
            </div>


        );

export default landing;