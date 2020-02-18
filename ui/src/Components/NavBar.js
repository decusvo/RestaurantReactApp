import React from 'react';
import {AppBar, Button, Toolbar, Typography, useScrollTrigger, Slide, CssBaseline} from '@material-ui/core';
import Logo from '../Images/Logo_new.png';
import Img from 'react-image'
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {ShoppingBasket} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import theme from "../Styling/theme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

function HideOnScroll(props) {
    const {children, window} = props;

    const trigger = useScrollTrigger({target : window ? window() : undefined});

    return(<Slide appear={false} direction="down" in={!trigger}>{children}</Slide>);
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,

    window: PropTypes.func,
};

const useStyles = makeStyles(({
    root: {
        flexGrow: 1,
    },
    blank: {
        flexGrow: 1,
    }
}));

export default function NavBar(props) {
    const classes = useStyles();

    return(
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <HideOnScroll {...props}>
                    <AppBar style={{background: '#68a4a7'}}>
                        <Toolbar>
                            <Button href={"/Home"}><Img src={Logo} style={{width:"50px",height:"50px"}}/></Button>
                            <Button href={"/About"} color={"inherit"}>About</Button>
                            <Button href={"/Menu"} color={"inherit"}>
                                Menu
                            </Button>

                            <Typography variant="h6" className={classes.blank}> </Typography>

                            <IconButton href={"/Basket"}  edge="start" color={"inherit"} aria-label={"basket"}>
                                <ShoppingBasket />
                            </IconButton>
                            <Button href={"/Register"} color={"inherit"}>Register</Button>
                            <Button href={"/Login"} color={"inherit"}>Login</Button>
                            <Button href={"/WaiterDashboard"} color={"inherit"}>Waiter </Button>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Toolbar />
            </div>
        </ThemeProvider>
        );
}