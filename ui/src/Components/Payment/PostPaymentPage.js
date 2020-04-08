import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router";
import buttonStyles from "../../Styling/buttonStyles";

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(2),
        variant: "h2",
        color: "textSecondary"
    },
    ...buttonStyles()
}));

const PostPaymentPage = () => {
  const classes = useStyles();
  const [buttonClicked, setButtonClicked] = React.useState(false);
  let firstName = localStorage.getItem('CustomerName');
  let orderID = localStorage.getItem('ProcessedOrderID');
  let response = (localStorage.getItem('paymentResponse') === "true") ? "successful" : "unsuccessful";
  localStorage.setItem('ProcessedOrderID','');
  localStorage.setItem('paymentResponse','');

  // handleRedirection is responsible for changing the state responsible for redirecting the customer back to the menu.

  const handleRedirection = () => {
      setButtonClicked(true);
  };

  // The two lines below retrieve the first name of the cardholder. This is used to give a friendlier response to the customer upon success.

  const lastIndex = firstName.lastIndexOf(" ");
  firstName = firstName.substring(0, lastIndex);

  // The react clause renders the response to the customer and directs him to go back to the main menu.

  return (
    <React.Fragment>
      {buttonClicked ? <Redirect to={"/Menu"} /> : null}

      <Typography variant="h3" className={classes.title}>
        Thanks {firstName}.The order no. {orderID} has been {response}.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleRedirection}
        className={classes.button}
      >
        Menu
      </Button>
    </React.Fragment>
  );
};

export default PostPaymentPage;
