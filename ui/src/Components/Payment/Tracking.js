import React, { useEffect } from "react";
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

// TODO: Pass order information to global state.

const Tracking = () => {
  const classes = useStyles();
  const currentUser = useSelector(state => state.currentUser); // Get username.
  const [currentOrders, setCurrentOrders] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [paymentState, setPaymentState] = React.useState(false);

  // function Alert returns the material-ui element that is later rendered on-screen containing an informative response.

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  // The function getTracking sends a call to the API to get all the available orders for the customer who is logged in.

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
        console.log(data);
        setCurrentOrders(data.data.orders);
      });
  };

  // The effect hook calls the getTracking function to re-render all the order cards if there has been a change.
  useEffect(() => {
    getTracking();
  }, []);

  // The userAlert function is responsible for changing the state in order to open the material-ui alert with a message when the order is cancelled

  const openCancellationAlert = () => {
    setMessage("Order has been cancelled");
    setOpen(true);
  };

  // the handleClose function is responsible for changing the state of Open in order to close the alert when the user clicks anywhere outside the alert area.

  const handleClose = (event, reason) => {
    // Handles the closing of a notification.
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // The updateState function takes an ID and an order state and calls the API to update the order state to the new one.

  const updateState = (id, state) => {
    fetch("//127.0.0.1:5000/order_event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: id, order_event: state })
    })
      .then(response => {
        getTracking();
        return response.json();
      })
      .catch(error => {
        console.log(error);
      })
      .then(data => {
        console.log(data);
      });
  };

  // the function paymentRedirection takes the ID of the order card chosen , then stores it locally and changes the PaymentState state.
  // Upon changing this , the ternary expression causes a redirection for the customer to the OrderSummary.js page.

  function paymentRedirection(orderID) {
    setPaymentState(true);
    localStorage.setItem("ProcessedOrderID", orderID);
  }

  // MapOrderItem function takes a value containing an object with all of information for each order.
  // The function then passes the relevant information as props to TrackingItem components representing order cards. These are then rendered for the customer.

  const MapOrderItem = ({ value }) => {
    return value.map((ele, index) => {
      const { id, items, ordered_time, price, state, table_number } = ele;
      return (
        <TrackingItem
          sendState={updateState}
          sendAlert={openCancellationAlert}
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

  // The return clause contains a React fragment which will contain the rendered order cards for user who is logged in.

  return (
    <React.Fragment>
      <CssBaseline />
      {paymentState ? <Redirect to="/OrderSummary" /> : null}
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
