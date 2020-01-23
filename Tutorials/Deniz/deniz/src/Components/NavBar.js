import React from 'react';
import {Navbar, Nav} from "react-bootstrap";

class NavBar extends React.Component {
    render() {
        return(
            <div className="NavBar-container">
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossOrigin="anonymous"
                />

                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="\Home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="\Home">Home</Nav.Link>
                        <Nav.Link href="\Menu">Menu</Nav.Link>
                        <Nav.Link href="\Home">Pricing</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;