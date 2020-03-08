import React from 'react';
import {CssBaseline, Typography, withStyles} from '@material-ui/core';
import Copyright from "./Copyright";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import OrderItem from "./OrderItem";

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

class WaiterDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          requested: [],
          cooking: [],
          ready_to_deliver: []
        };
    }

    async componentDidMount(){
      var orderStates = ["requested", "ready_to_deliver", "cooking"];
      fetch("//127.0.0.1:5000/get_orders", {method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"states": orderStates})
      }).then(response => {
        return response.json()
      }).then(data => {
        // if the array is not null
        let orders = data.data.orders
        if(orders != undefined){
          orders.forEach(ele => {
            console.log(ele);
            let change = {};
            change[ele.state] = this.state[ele.state].concat(ele);
            this.setState(change)
          })
        }
        // else do nothing
      })
    }

    render() {
        const {classes} = this.props;

        const MapOrderItem = ({value}) => {
          return value.map((ele, index) => {
            const order = ele;
            console.log(order);
            let {state, id, table_number, items, ordered_time, price} = order;
            return (<OrderItem key={index} orderState={state} tableID={table_number} orderID={id} allItems={items} time={ordered_time} totalPrice={price} />)
          })
        };

        return (
            <React.Fragment>
                <CssBaseline />

                <Grid container spacing={3}>
                    {/*Grid for the to be confirmed, order objects will later be loaded in dynamically*/}
                    <Grid item xs>
                        <Typography className={classes.typography} color={"textPrimary"} gutterBottom>
                            To Be Confirmed
                        </Typography>
                        <MapOrderItem value={this.state.requested}/>
                      </Grid>

                    <Grid item xs>
                        <Typography className={classes.typography} color={"textPrimary"} gutterBottom>
                            In Progress
                        </Typography>
                        <MapOrderItem value={this.state.cooking}/>
                    </Grid>

                    <Grid item xs>
                        <Typography className={classes.typography} color={"textPrimary"} gutterBottom>
                            To Be Served
                        </Typography>
                        <MapOrderItem value={this.state.ready_to_deliver}/>
                    </Grid>
                </Grid>

                    <Box mt={5}>
                        <Copyright />
                    </Box>
            </React.Fragment>

        )
    }
}

export default withStyles(useStyles)(WaiterDashboard);
