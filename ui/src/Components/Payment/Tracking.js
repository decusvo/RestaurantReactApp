import React, { useEffect } from "react";
import { Container, List } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useSelector } from "react-redux";
import TrackingItem from "./TrackingItem";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { Redirect } from "react-router";

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
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [paymentState, setPaymentState] = React.useState(false);
  let orderInfo = null;

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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

  const userAlert = () => {
    setMessage("Order has been cancelled");
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    // Handles the closing of a notification.
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const updateState = (id, state) => {
    fetch("//127.0.0.1:5000/order_event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: id, order_event: state })
    })
      .then(response => {
        getTracking();
        console.log("updated");
        return response.json();
      })
      .catch(error => {
        console.log(error);
      })
      .then(data => {
        console.log(data);
      });
  };

  function paymentRedirection(
    orderID,
    tableID,
    allItems,
    totalPrice,
    quantity
  ) {
    orderInfo = {
      orderID: orderID,
      tableID: tableID,
      allItems: allItems,
      totalPrice: totalPrice,
      quantity: quantity
    };
    setPaymentState(true);
  }

  const MapOrderItem = ({ value }) => {
    return value.map((ele, index) => {
      const { id, items, ordered_time, price, state, table_number } = ele;
      return (
        <TrackingItem
          sendState={updateState}
          sendAlert={userAlert}
          paymentIntent={paymentRedirection}
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
      {paymentState ? (
        <Redirect
          to={{
            pathname: "/Checkout",
            state: { orderInfo }
          }}
        />
      ) : null}
      <Typography variant="h3" className={classes.title}>
        Your orders
      </Typography>

      <Grid spacing={2} container className={classes.grid}>
        <MapOrderItem value={currentOrders} />
      </Grid>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={"info"}>
          {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Tracking;