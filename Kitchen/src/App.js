import React from 'react';
import {CssBaseline, Typography, withStyles} from '@material-ui/core';
import Copyright from "./Copyright";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import OrderItem from "./OrderItem";
import { makeStyles } from '@material-ui/core/styles';
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

class WaiterDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          cooking: [],
          ready_to_deliver: []
        };
    }



    getOrders = () => {
        var orderStates = ["ready_to_deliver", "cooking"];
        console.log("tag");

        this.setState(this.state.cooking = []);
        this.setState(this.state.ready_to_deliver = []);


        fetch("//127.0.0.1:5000/get_orders", {method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"states": orderStates})
        }).then(response => {
            return response.json()
        }).then(data => {
            // if the array is not null
            let orders = data.data.orders;
            // eslint-disable-next-line
            if(orders){
                orders.forEach(ele => {
                    let change = {};
                    change[ele.state] = this.state[ele.state].concat(ele);
                    this.setState(change)
                })
            }
            // else do nothing
        })
    };



    async componentDidMount(){
      this.getOrders()
    }



    render() {
        const {classes} = this.props;

        const MapOrderItem = ({value}) => {
          return value.map((ele, index) => {
            const order = ele
            let {state, id, table_number} = order
            return (
              <OrderItem orderState={state} tableID={table_number} orderID={id} index={index}/>)
          })
        }

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
                            Currently Cooking
                        </Typography>
                        <MapOrderItem value={this.state.cooking}/>
                      </Grid>

                    <Grid item xs>
                        <Typography className={classes.typography} color={"textPrimary"} gutterBottom>
                            Ready to deliver
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
