import React from 'react';
import {Navbar, Nav, NavDropdown, Button} from "react-bootstrap";
import Logo from '../Images/Logo.png';
import Img from 'react-image'

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

                <Navbar sticky="bottom" bg="dark" variant="dark">
                    <Navbar.Brand href="\Home"><Img src={Logo} style={{width:"50px",height:"50px"}}/></Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="\Home">HOME</Nav.Link>
                        <Nav.Link href="\About">ABOUT</Nav.Link>
                        <NavDropdown title="MENU" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="\Menu">Starters</NavDropdown.Item>
                            <NavDropdown.Item href="\Menu">Mains</NavDropdown.Item>
                            <NavDropdown.Item href="\Menu">Desserts</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="\Menu">Drinks</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="\Login">
                            <Button>LOG IN</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;