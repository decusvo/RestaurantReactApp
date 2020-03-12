import React from "react";
import {
  Typography,
  Fab,
  CardContent,
  createMuiTheme
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { CardActions, CardHeader } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { blue, red } from "@material-ui/core/colors";
import ClearIcon from "@material-ui/icons/Clear";

const TrackingItem = props => {


  const CancelOrderHandler = orderID => {
    updateState(orderID, "cancel");
    console.log("cancel");
  };

  const updateState = (id, state) => {
    fetch("//127.0.0.1:5000/order_event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: id, order_event: state })
    })
      .then(response => {
        refreshHandler();
        return response.json();
      })
      .catch(error => {
        console.log(error);
      })
      .then(data => {
        console.log(data);
      });
  };

  //maps all items in the order
  const MapOrderItem = ({ items }) => {
    return items.map((dish, index) => {
      let { quantity, name, cumulative_price } = dish;

      return (
        <Card
          style={{
            backgroundColor: "#fcc01a",
            padding: theme.spacing(2),
            marginBottom: theme.spacing(2)
          }}
          key={index}
        >
          <Typography style={{ textAlign: "middle" }}>Name: {name}</Typography>
          <Typography style={{ textAlign: "middle" }}>
            Price: {cumulative_price}
          </Typography>
          <Typography style={{ textAlign: "middle" }}>
            Quantity: {quantity}
          </Typography>
        </Card>
      );
    });
  };



  const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: red
    }
  });

  const {
    orderID,
    tableID,
    allItems,
    time,
    totalPrice,
    refreshHandler
  } = props;

  return (
    <Grid item xs alignItems={"stretch"}>
      <Card
        style={{
          backgroundColor: "#fcc01a",
          padding: theme.spacing(2),
          marginBottom: theme.spacing(2)
        }}
      >
        <CardHeader title={"Order No: ".concat(orderID)} />
        <Divider variant="middle" />
        <CardContent>
          <Typography>Table: {tableID}</Typography>
          <Typography>Price: {totalPrice}</Typography>
          <Typography>Time: {time}</Typography>
        </CardContent>
        <Divider variant="middle" />

        <CardActions disableSpacing>
          <Fab
            color="secondary"
            aria-label="cancel"
            onClick={() => {
              CancelOrderHandler(orderID);
            }}
          >
            <ClearIcon />
          </Fab>
        </CardActions>

        <ExpansionPanel color={"primary"}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ textAlign: "middle" }}>Read more</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="stretch"
            >
              <Divider variant="middle" />

              <MapOrderItem items={allItems} />
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Card>
    </Grid>
  );
};

export default TrackingItem;
