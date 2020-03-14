import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2)
  }
}));

export default function Review() {
  const classes = useStyles();
  const orderToProcess = useSelector(state => state.orderToProcess);
  const [currentOrder, setCurrentOrder] = React.useState();

  // TODO: Have an API endpoint that returns only a single order back.

  const getSummary = () => {
    fetch("//127.0.0.1:5000/get_cust_order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cust_id: orderToProcess.data.customer,
        order_id: orderToProcess.data.order
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCurrentOrder(data);
      });
  };
  useEffect(() => {
    getSummary();
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {currentOrder.allItems.map((product, index) => (
          <ListItem className={classes.listItem} key={index}>
            <ListItemText primary={product.name} secondary={product.quantity} />
            <Typography variant="body2">{product}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {currentOrder.totalPrice}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
