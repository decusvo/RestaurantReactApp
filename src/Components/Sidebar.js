import React from "react";
import {NavLink} from "react-router-dom";
import "../Styling/Sidebar.scss";



const SidebarContent = () => (
    <div className="Sidebar-container">
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

        </ul>


    </div>
);


export default SidebarContent;
