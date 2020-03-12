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
import Snackbar from "@material-ui/core/Snackbar";
import DashboardIcon from '@material-ui/icons/Dashboard';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

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
    const total = useSelector(state => state.currentItems.total);
    const vertical = "bottom";
    const horizontal = "right";

    function logOut() {
        dispatch(userActions.logOut())
        fetch("//127.0.0.1:5000/remove_session", {method: 'POST'})
            .then((response) => {
            return response.json();
        })
    }

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

                            <IconButton onClick={() => History.push("/Order")} edge="start" color={"inherit"} aria-label={"basket"}>
                                <ShoppingBasket />
                            </IconButton>
                            {currentUser.staff ?
                                <>
                                    <IconButton onClick={() => History.push("/WaiterDashboard")} edge={"start"} color={"inherit"} aria-label={"dashboard"}>
                                        <DashboardIcon />
                                    </IconButton>
                                    <IconButton onClick={() => History.push("/WaiterMenu")} edge={"start"} color={"inherit"} aria-label={"dashboard"}>
                                        <RestaurantMenuIcon />
                                    </IconButton>

                                </>
                                :
                                <>
                                    <div> </div>
                                </>}
                            {currentUser.loggedIn ?
                                <>
                                    <Avatar className={classes.yellow} onClick={() => logOut()}>{currentUser.user.name[0]}</Avatar>
                                </>
                                :
                                <>
                                    <Button onClick={() => History.push("/Register")} color={"inherit"}>Register</Button>
                                    <Button onClick={() => History.push("/Login")} color={"inherit"}>Login</Button>
                                </>}

                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Toolbar />
                {total>0? <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    key={`${vertical},${horizontal}`}
                    open={true}
                    message={"Total price: " + total}
                /> : null}

            </div>
        </ThemeProvider>
        );
}