import React from "react";
import {Button, Menu} from "@material-ui/core";

export default function MenuDropDown() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color={"inherit"}>
                Menu
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Button href={"/Menu"} color={"inherit"} onClick={handleClose}>Starters</Button>
                <Button href={"/Menu"} color={"inherit"} onClick={handleClose}>Mains</Button>
                <Button href={"/Menu"} color={"inherit"} onClick={handleClose}>Desserts</Button>
                <Button href={"/Menu"} color={"inherit"} onClick={handleClose}>Drinks</Button>
            </Menu>
        </div>
    );
};