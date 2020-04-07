import React, {useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useSelector} from "react-redux";
import TrackingItem from "./TrackingItem";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {Redirect} from "react-router";

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
  const [oldOrders, setOldOrders] = React.useState(undefined);
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [paymentState, setPaymentState] = React.useState(false);

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

  const getOldTracking = () => {
    fetch("//127.0.0.1:5000/get_old_cust_orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ custId: currentUser.user.name })
    })
        .then(response => {
          return response.json();
        })
        .then(data => {
          setOldOrders(data.data.orders);
        });
  };

  useEffect(() => {
    getTracking();
    getOldTracking();
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
        return response.json();
      })
      .catch(error => {
        console.log(error);
      })
      .then(data => {
        console.log(data);
      });
  };

  function paymentRedirection(orderID) {
    setPaymentState(true);
    localStorage.setItem('ProcessedOrderID', orderID);
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
        <Redirect to="/OrderSummary" />
      ) : null}
      <Typography variant="h3" className={classes.title}>
        Your orders
      </Typography>

      <Grid spacing={2} container className={classes.grid}>
        <MapOrderItem value={currentOrders} />
      </Grid>

      {oldOrders !== undefined ?
          <div>
            <Typography variant="h3" className={classes.title}>
              Your orders
            </Typography>
            <Grid spacing={2} container className={classes.grid}>
              <MapOrderItem value={oldOrders} />
            </Grid>
          </div>
          :null
      }

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={"info"}>
          {message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Tracking;
