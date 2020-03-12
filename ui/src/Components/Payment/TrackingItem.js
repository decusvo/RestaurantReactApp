import React from "react";
import { Typography, CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useN01TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n01";
import { useBouncyShadowStyles } from "@mui-treasury/styles/shadow/bouncy";
import cx from "clsx";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    margin: "auto",
    boxShadow: "none",
    borderRadius: 0
  },
  content: {
    padding: 24
  },
  cta: {
    marginTop: 24,
    textTransform: "initial"
  }
}));

const TrackingItem = props => {
  let button = null;
  const classes = useStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const shadowStyles = useBouncyShadowStyles();

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

  const MapOrderItem = ({ items }) => {
    return items.map((dish, index) => {
      let { quantity, name, cumulative_price } = dish;
      return (
        <Grid item xs>
          <Card key={index} className={classes.root}>
            <CardContent className={classes.content}>
              <TextInfoContent
                classes={textCardContentStyles}
                overline={name}
                body={cumulative_price}
              />
            </CardContent>
          </Card>
        </Grid>
      );
    });
  };

  const {
    orderID,
    tableID,
    allItems,
    totalPrice,
    orderState,
    refreshHandler
  } = props;

  if (orderState === "delivered") {
    button = <Button color={"primary"} fullWidth className={classes.cta}>
      Pay
    </Button>;
  } else if (orderState === "paid" || orderState === "cancelled") {
    button = <Button disabled={true} fullWidth className={classes.cta} >Done</Button>
  }
else {
    button =
    <Button
      color={"secondary"}
      onClick={() => {
        CancelOrderHandler(orderID);
      }}
      fullWidth
      className={classes.cta}
    >
      Cancel
    </Button>;
  };

  return (
    <Grid item xs={12} sm={6} md={3} lg={2}>
      <Card className={cx(classes.root, shadowStyles.root)}>
        <CardContent className={classes.content}>
          <TextInfoContent
            classes={textCardContentStyles}
            overline={"Order ".concat(orderID) + " at table ".concat(tableID)}
            heading={"Total ".concat(totalPrice)}
            body={orderState.charAt(0).toUpperCase() + orderState.slice(1)}
          />
          {button}
        </CardContent>

        <ExpansionPanel color={"primary"}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.typography}>Read more</Typography>
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
