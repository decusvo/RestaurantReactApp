import React from 'react';
import './App.css';
import Main from "./Components/Main";
import {Router} from "react-router-dom";
import Sidebar from "react-sidebar";
import history from "./utils/history";
import SidebarContent from "./Components/Sidebar";

class App extends React.Component {

    constructor(props) {
        super(props);
        {/* sidebar is docked when the media query matches. */
        }
        this.state = {
            buttonOpen: false,
            sidebarOpen: false,
        };

        {/* binds the functions to the class. */
        }
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
        this.handleSidebarClick = this.handleSidebarClick.bind(this);
    }

    onSetSidebarOpen(open) {
        this.setState({sidebarOpen: open});
        {/* Set sidebar as open.*/
        }
        this.setState({buttonOpen: false});
    }

    handleClick() {
        this.setState({
            buttonOpen: !this.state.buttonOpen,
            sidebarOpen: !this.state.sidebarOpen,
        });
    }

    handleSidebarClick() {
        this.handleClick();
    }

    render() {
        return (
            <div className="App">
                <Router history={history}>
                    <div className="Index">
                        <Sidebar
                            sidebar={<SidebarContent onChange={this.handleSidebarClick}/>}
                            open={this.state.sidebarOpen}
                            onSetOpen={this.onSetSidebarOpen}

                            styles={{sidebar: {background: "#87D333"}, content: {background: "#FFEFFF"}}}>

                            <Main menuClicked={() => this.handleClick()} buttonState={this.state.buttonOpen}/>


                        </Sidebar>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
