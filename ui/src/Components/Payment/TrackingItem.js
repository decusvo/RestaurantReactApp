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
  let button;
  const classes = useStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const shadowStyles = useBouncyShadowStyles();

  // The MapOrderItem function takes order information and renders the information on the card.

  const MapOrderItem = ({ items }) => {
    return items.map((dish, index) => {
      let { name, cumulative_price } = dish;
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

  // The information passed as props from the Tracking.js is initialized as variables for later use.

  const { orderID, tableID, allItems, totalPrice, orderState } = props;

  // Conditional rendering. If an order has been delivered, a Pay button has been rendered instead of Cancel.
  // The user is no longer able to cancel the particular order as it has been now delivered.
  // Upon clicking the Pay button, the order ID is passed up to Tracking.js parent component and used to redirect the customer to OrderSummary.js

  if (orderState === "delivered") {
    button = (
      <Button
        color={"primary"}
        fullWidth
        className={classes.cta}
        onClick={() => {
          props.paymentIntent(orderID);
        }}
      >
        Pay
      </Button>
    );

    // If the order has been paid or cancelled, the customer can no longer modify the order card.
  } else if (orderState === "paid" || orderState === "cancelled") {
    button = (
      <Button disabled={true} fullWidth className={classes.cta}>
        Done
      </Button>
    );

    // If the user presses cancel, an alert is rendered on-screen for the user. The state is also sent back up to Tracking.js to cancel the particular order.
  } else {
    button = (
      <Button
        color={"secondary"}
        onClick={() => {
          props.sendState(orderID, "cancel");
          props.sendAlert();
        }}
        fullWidth
        className={classes.cta}
      >
        Cancel
      </Button>
    );
  }

  // renderOrderSubMenu function is responsible for rendering the panel of each card containing a minimal order summary for that particular order.

  const renderOrderSubMenu = () => {
    return (
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
    );
  };

  // The return clause renders one order card onto the Tracking.js page.

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

        {renderOrderSubMenu}
      </Card>
    </Grid>
  );
};

export default TrackingItem;
