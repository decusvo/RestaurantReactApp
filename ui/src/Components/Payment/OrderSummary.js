import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router";

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2)
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

export default function OrderSummary() {
  const classes = useStyles();
  const orderToProcess = useSelector(state => state.orderToProcess);
  const currentUser = useSelector(state => state.currentUser);
  const [currentOrder, setCurrentOrder] = React.useState();
  const [redirectToTracking, setRedirectToTracking] = React.useState(false);
  const [redirectToPayment, setRedirectToPayment] = React.useState(false);
  const [loadedOrders, setLoadedOrders] = React.useState(false);

  const handleBack = () => {
    setRedirectToTracking(true);
  };

  const handleNext = () => {
    setRedirectToPayment(true);
  };

  const MapOrderItem = ({ value }) => {
    return value.map((ele, index) => {
      const { name, cumulative_price, quantity } = ele;
      return (
        <ListItem className={classes.listItem} key={index}>
          <ListItemText primary={name} secondary={cumulative_price} />
          <Typography variant="body2">{quantity}</Typography>
        </ListItem>
      );
    });
  };

  const getSummary = () => {
    fetch("//127.0.0.1:5000/get_order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        custId: currentUser.user.name,
        orderId: orderToProcess.order
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCurrentOrder(data.data.order);
        setLoadedOrders(true);
      });
  };

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      {redirectToTracking ? <Redirect to="/Tracking" /> : null}
      {redirectToPayment ? <Redirect to="/PaymentForm" /> : null}

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Order Summary
          </Typography>
          {loadedOrders ? (
            // console.log(currentOrder[0].items)
            <List disablePadding>
              <MapOrderItem value={currentOrder[0].items} />
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" className={classes.total}>
                  {currentOrder[0].price}
                </Typography>
              </ListItem>
            </List>
          ) : (
            <Typography variant="subtitle1">Loading orders..</Typography>
          )}
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              className={classes.button}
            >
              Back to Tracking
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              Next
            </Button>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
