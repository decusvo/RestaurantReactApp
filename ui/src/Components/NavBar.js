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
import {useDispatch, useSelector} from "react-redux";
import History from "../utils/history"
import Avatar from "@material-ui/core/Avatar";
import userActions from "../actions/userActions";

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
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);

    return(
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <HideOnScroll {...props}>
                    <AppBar style={{background: '#68a4a7'}}>
                        <Toolbar>
                            <Button onClick={() => History.push("/Home")}><Img src={Logo} style={{width:"50px",height:"50px"}}/></Button>
                            <Button onClick={() => History.push("/About")} color={"inherit"}>About</Button>
                            <Button onClick={() => History.push("/Menu")} color={"inherit"}>
                                Menu
                            </Button>

                            <Typography variant="h6" className={classes.blank}> </Typography>

                            <IconButton onClick={() => History.push("/Order")}  edge="start" color={"inherit"} aria-label={"basket"}>
                                <ShoppingBasket />
                            </IconButton>
                            {currentUser.loggedIn ?
                                <>
                                    <Avatar className={classes.yellow} onClick={() => dispatch(userActions.logOut())}>{currentUser.user.name[0]}</Avatar>
                                </>
                                :
                                <>
                                    <Button href={"/Register"} color={"inherit"}>Register</Button>
                                    <Button href={"/Login"} color={"inherit"}>Login</Button>
                                    <Button href={"/WaiterDashboard"} color={"inherit"}>Waiter </Button>
                                </>}

                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Toolbar />
            </div>
        </ThemeProvider>
        );
}