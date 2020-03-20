import React, {useState} from 'react';
import {AppBar, Button, CssBaseline, Slide, Toolbar, Typography, useScrollTrigger,} from '@material-ui/core';
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
import Notification from "./Notification";
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Badge, MuiThemeProvider} from "material-ui";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red} from '@material-ui/core/colors';
import PanToolIcon from '@material-ui/icons/PanTool';

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
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationCount, setCount] = useState(0);

    function logOut() {
        dispatch(userActions.logOut());
        fetch("//127.0.0.1:5000/remove_session", {method: 'POST'})
            .then((response) => {
            return response.json();
        })
    }

    const handleNumberOfNotifications = (number) => {
        setCount(number)
    };

    function callWaiter(called, waiter={}) {
        if (called === "button") {
            fetch("//127.0.0.1:5000/get_waiter_assinged_to_table", {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"table_id": 2})
            }).then((response) => {
                return response.json();
            }).then((data) => {
                const waiter_email = data.data.waiter_id;
                callWaiter("function", waiter_email)
            });
        } else if (called === "function") {
            fetch("//127.0.0.1:5000/add_waiter_notification", {method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"waiter_email": waiter, "message": "Customer at table " + 2 + " needs help", "customer_email":currentUser.name})
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data)
            });
        }
    }

    return(
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <HideOnScroll {...props}>
                    <AppBar className={classes.size} color={"secondary"}>
                        <Toolbar>
                            <Button onClick={() => History.push("/Home")}><Img src={Logo} style={{width:"50px",height:"50px"}}/></Button>
                            <Button onClick={() => History.push("/About")} color={"inherit"}>About</Button>
                            <Button onClick={() => History.push("/Menu")} color={"inherit"}>
                                Menu
                            </Button>

                            <Typography variant="h6" className={classes.blank}> </Typography>

                            <IconButton onClick={() => callWaiter("button")} edge={"start"} color={"inherit"} aria-label={"notify"}>
                                <PanToolIcon />
                            </IconButton>

                            {currentUser.loggedIn ?
                                <>
                                    {currentUser.staff ?
                                        <>
                                            <MuiThemeProvider muiTheme={getMuiTheme()}>
                                                <Badge badgeContent={notificationCount} badgeStyle={{top: 20, right: 15, backgroundColor: red.A400}}>
                                                    <IconButton style={{bottom: 5}} onClick={() => setNotificationOpen(true)} edge={"start"} color={"inherit"} tooltip={"notifications"} aria-label={"notification"}>
                                                        <NotificationsIcon />
                                                    </IconButton>
                                                </Badge>
                                            </MuiThemeProvider>
                                            <IconButton onClick={() => History.push("/WaiterDashboard")} edge={"start"} color={"inherit"} aria-label={"dashboard"}>
                                                <DashboardIcon />
                                            </IconButton>
                                            <IconButton onClick={() => History.push("/WaiterMenu")} edge={"start"} color={"inherit"} aria-label={"dashboard"}>
                                                <RestaurantMenuIcon />
                                            </IconButton>
                                        </>
                                        :
                                        <>
                                            <IconButton onClick={() => History.push("/Order")} edge="start" color={"inherit"} aria-label={"basket"}>
                                                <ShoppingBasket />
                                            </IconButton>
                                        </>}
                                    <Avatar className={classes.yellow} onClick={() => logOut()}>{currentUser.user.name[0]}</Avatar>
                                </>
                                :
                                <>
                                    <IconButton onClick={() => History.push("/Order")} edge="start" color={"inherit"} aria-label={"basket"}>
                                        <ShoppingBasket />
                                    </IconButton>
                                    <Button onClick={() => History.push("/Register")} color={"inherit"}>Register</Button>
                                    <Button onClick={() => History.push("/Login")} color={"inherit"}>Login</Button>
                                </>}

                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Notification numberOfNotifications={handleNumberOfNotifications} open={notificationOpen} setOpen={setNotificationOpen}/>
                <Toolbar />
                {total>0? <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    key={`${vertical},${horizontal}`}
                    open={true}
                    message={"Total price: " + total}
                /> : null}
            </ThemeProvider>
        </div>
        );
}