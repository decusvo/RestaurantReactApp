import React from 'react';
import './App.css';
import history from "./utils/history";
import NavBar from "./Components/NavBar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router history={history}>
          <div className="Index">
              <NavBar></NavBar>

              <Switch>
                  <Route exact path="/">
                      <Home />
                  </Route>
                  <Route path="/Home">
                      <Home/>
                  </Route>
                  <Route path="/Menu">
                      <Menu />
                  </Route>
              </Switch>
          </div>
      </Router>
    </div>
  );
}

function Home() {
    return(
        <div className="container">

            <div className="row">
                <div className="one-half column" style={{marginTop:"15%"}}>
                    <h4>About this restaurant.</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                </div>
            </div>

        </div>
    );
}

function Menu() {
    return(
        <div className="row">
            <div className="twelve columns">
                <h4>Our Menu</h4>

                <div className="Food-Menu-Container">

                </div>


            </div>
        </div>
    );
}
export default App;
