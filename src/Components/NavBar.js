import React from 'react';
import {AppBar, Button, Toolbar, Typography} from '@material-ui/core';
import Logo from '../Images/Logo.png';
import Img from 'react-image'
import {makeStyles} from "@material-ui/core/styles";
import DropDown from "./DropDown";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    blank: {
        flexGrow: 1,
    },
}));

export default function NavBar() {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button href={"/Home"}><Img src={Logo} style={{width:"50px",height:"50px"}}/></Button>
                    <Button href={"/Menu"} color={"inherit"}>Menu</Button>
                    <Button href={"/About"} color={"inherit"}>About</Button>
                    <DropDown> </DropDown>

                    <Typography variant="h6" className={classes.blank}> </Typography>

                    <Button color={"inherit"}>Register</Button>
                    <Button href={"/Login"} color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
        </div>
        );
}