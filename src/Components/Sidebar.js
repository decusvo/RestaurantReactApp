import React from "react";
import {NavLink} from "react-router-dom";
import "../Styling/Sidebar.scss";



class SidebarContent extends React.Component {

    render() {
        return (
            <div className="Sidebar-container">

                <button>
                    <NavLink
                        to="/LogInPage"
                        className="Log-In-Button"
                        activeClassName="activeRoute"
                    >
                        Log In
                    </NavLink>
                </button>

                <ul className="Nav_menu">
                    <li>
                        <NavLink
                            to="/Home"
                            exact
                            className="Nav_link"
                            activeClassName="activeRoute"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/About"
                            className="Nav_link"
                            activeClassName="activeRoute"
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/FoodMenu"
                            className="Nav_link"
                            activeClassName="activeRoute"
                        >
                            Food
                        </NavLink>
                    </li>
                </ul>

            </div>
        )
    }
}


export default SidebarContent;
