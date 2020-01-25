import React from 'react';
import './App.css';
import Home from "./Components/Home";
import FoodMenu from "./Components/FoodMenu";
import About from "./Components/About";
import {Router, Route, Switch} from "react-router-dom";
import history from "./utils/history";
import NavBar from "./Components/NavBar";
import LogInPage from "./Components/LogInPage";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <div className="Index">
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                        <NavBar />

                        <Switch>
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
                                <LogInPage/>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
