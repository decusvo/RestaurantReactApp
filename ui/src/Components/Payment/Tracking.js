import React, { useEffect } from "react";
import { List} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useSelector } from "react-redux";
import TrackingItem from "./TrackingItem";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";


// TODO: Conditional rendering of pay/cancel options on each of items when "delivered" state is reached.


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
    alignItems: "center"
  },
  orderContainer: {},
  grid: {
    flexGrow: 0
  }
}));

const Tracking = () => {
  const classes = useStyles();
  const currentUser = useSelector(state => state.currentUser); // Get username.
  const [currentOrders, setCurrentOrders] = React.useState([]);

  const getTracking = () => {
    fetch("//127.0.0.1:5000/get_cust_order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ custId: currentUser.user.name })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCurrentOrders(data.data.orders);
      });
  };
  useEffect(() => {
    getTracking();
  }, []);

  const MapOrderItem = ({ value }) => {
    return value.map((ele, index) => {
      const {id, items, ordered_time, price, state, table_number} = ele;
      return (
        <TrackingItem
          key={index}
          orderState={state}
          tableID={table_number}
          orderID={id}
          allItems={items}
          time={ordered_time}
          totalPrice={price}
        />
      );
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography variant="h3" className={classes.title}>
        Your orders
      </Typography>

      <Grid spacing={2} container maxWidth={"xs"} className={classes.grid}>
        <MapOrderItem value={currentOrders} />
      </Grid>

      <List className={classes.root}>{/*Checkout form.*/}</List>
    </React.Fragment>
  );
};

export default Tracking;
