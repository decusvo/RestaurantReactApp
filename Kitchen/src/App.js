import React, {useEffect, useState} from 'react';
import {CssBaseline, Typography, withStyles} from '@material-ui/core';
import Copyright from "./Copyright";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import OrderItem from "./OrderItem";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


//basic styles
const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },

    card: {
        padding: theme.spacing(6),
        marginTop: theme.spacing(6),
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 20
    },

    typography: {
        marginTop: 10, fontSize: 25
    }
});

const _ = require('lodash');

/**
 *
 * WaiterDashboard - component responsible for displaying the dashboard
 * where the kitchenstaff can change state of the orders
 * @param props
 * @returns {*} - a rendered container of three lists containing order from differend sates
 * @constructor
 */
const WaiterDashboard = (props) => {
    const {classes} = props;

    //state variables
    const [state, setState] = useState({cooking: [], ready_to_deliver: []});

    //Function called at an interval to refresh the state and re-render the dashboard.
    useEffect(() => {
        const interval = setInterval(() => {
            const orderStates = ["requested", "ready_to_deliver", "cooking"];
            fetch("//127.0.0.1:5000/get_orders", {method:'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"states": orderStates})
            }).then(response => {
                return response.json()
            }).then(data => {
                // if the array is not null
                let orders = data.data.orders;
                // eslint-disable-next-line
                const changedState = {"requested": [], "ready_to_deliver": [], "cooking": []};
                if(orders){
                    orders.forEach(ele => {
                        changedState[ele.state].push(ele)
                    })
                }
                if (!_.isEqual(state, changedState)) {
                    setState(changedState)
                }
                // else do nothing
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [state]);

    /**
     *
     * MapOrderItem - maps all the orders as cards.
     * called for each of three state columns.
     * @param {value} - a list of all orders.
     * @param {reverse} - set to false so it cant change state backwords
     * @returns {*} - a map of orders as cards
     * */
    const MapOrderItem = ({value, reverse=false}) => {
        if (reverse){
            value.reverse()
        }
        return value.map((ele, index) => {
            let {state, id, table_number, items, ordered_time, price} = ele;
            return (<OrderItem key={index} orderState={state} tableID={table_number} orderID={id} allItems={items} time={ordered_time} totalPrice={price} />)
        })
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        OAXHACA
                    </Typography>
                    <Button color="inherit">
                        Past Orders
                    </Button>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3}>
                {/*Grid for the to be confirmed, order objects will later be loaded in dynamically*/}
                <Grid item xs>
                    <Typography className={classes.typography} color={"textPrimary"} gutterBottom>
                        To be cooked
                    </Typography>
                    <MapOrderItem value={state.cooking}/>
                </Grid>

                <Grid item xs>
                    <Typography className={classes.typography} color={"textPrimary"} gutterBottom>
                        Cooked
                    </Typography>
                    <MapOrderItem value={state.ready_to_deliver} reverse={true}/>
                </Grid>
            </Grid>

            <Box mt={5}>
                <Copyright />
            </Box>
        </React.Fragment>

    );
};

export default withStyles(useStyles)(WaiterDashboard);
