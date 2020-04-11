import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import formStyles from "../../Styling/formStyles";

const useStyles = makeStyles(theme => ({
  ...formStyles(theme)
}));

export default function PaymentForm() {
  const classes = useStyles();
  const [redirectToSummary, setRedirectToSummary] = React.useState(false);
  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpiry, setCardExpiry] = React.useState("");
  const [cardCVV, setCardCVV] = React.useState("");
  const [cardSortCode, setCardSortCode] = React.useState("");
  const [payConfirmed, setPayConfirmed] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [open, setOpenAlert] = React.useState(false);

  // submitPayment is a function which sends customer details to be verified by the API which were collected from the respective textfields.
  // The API response is saved locally, as well as the customers name.

  const submitPayment = () => {
    fetch("//127.0.0.1:5000/verify_payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        card_num: cardNumber,
        cvv: cardCVV,
        sort_num: cardSortCode,
        expiry_date: cardExpiry
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        localStorage.setItem("paymentResponse", data.data.success);
        localStorage.setItem("CustomerName", cardName);
        if (data.data.success === true) {
          setPayConfirmed(true);
        } else {
          invalidPayment();
        }
      })
      .catch(error => console.log(error));
  };

  // updateOrder is a function which sends a call to the API endpoint. Upon successful verification, the function tells the API that the particular order ID has been paid.

  const updateOrder = () => {
    fetch("//127.0.0.1:5000/order_event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: localStorage.getItem("ProcessedOrderID"),
        order_event: "pay"
      })
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .catch(error => {
        console.log(error);
      });
  };

  // invalidPayment is a function which gives the user a notification if the API cannot successfully verify details.

  const invalidPayment = () => {
    setMessage(
      "There has been a problem validating your payment. Please check if information entered is correct."
    );
    setOpenAlert(true);
  };

  // handleClose is responsible for closing the alert that notifies the user of an issue with verifying the payment.

  const handleClose = (event, reason) => {
    // Handles the closing of a notification.
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  // handleSortCode function takes the value entered in the sort code text field and updates the value of the CardSortCode( state accordingly.

  const handleSortCode = event => {
    setCardSortCode(event.target.value);
  };

  // handleName function takes the value entered in the cardholder name text field and updates the values of the CardName state.

  const handleName = event => {
    setCardName(event.target.value);
  };

  // handleNumber function takes the value entered in the cardholder name text field and updates the values of the CardNumber state.

  const handleNumber = event => {
    setCardNumber(event.target.value);
  };

  // handleExpiry function takes the value entered in the cardholder name text field and updates the values of the CardExpiry state.

  const handleExpiry = event => {
    setCardExpiry(event.target.value);
  };

  // handleCVV function takes the value entered in the cardholder name text field and updates the values of the CardCVV state.

  const handleCVV = event => {
    setCardCVV(event.target.value);
  };

  // handleBack is responsible for changing the state of RedirectToSummary. Once set to true, a ternary expression redirects the user to OrderSummary page.

  const handleBack = () => {
    setRedirectToSummary(true);
  };

  // uponConfirmation function is responsible for calling the function to update the order and then redirect the customer to the post payment page.

  const uponConfirmation = () => {
    updateOrder();

    return <Redirect to="/PostPaymentPage" />;
  };

  // The return clause renders a React element with a payment form to fill out for the customer.
  // Upon paying, a response is given. If the response is successful the customer is redirected.
  // If the API response is not a success, then the customer is notified via an on-screen alert.

  return (
    <React.Fragment>
      {redirectToSummary ? <Redirect to="/OrderSummary" /> : null}
      {payConfirmed ? uponConfirmation() : null}

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Payment details
          </Typography>

          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  onChange={handleName}
                  id="cardName"
                  label="Name on card"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  onChange={handleNumber}
                  id="cardNumber"
                  label="Card number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  onChange={handleExpiry}
                  id="expDate"
                  label="Expiry date"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  onChange={handleSortCode}
                  id="sortCode"
                  label="Sorting code"
                  helperText="The code should be in XXXXXX format."
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  onChange={handleCVV}
                  id="cvv"
                  label="CVV"
                  helperText="Last three digits on signature strip"
                  fullWidth
                />
              </Grid>
            </Grid>
          </div>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={submitPayment}
              className={classes.button}
            >
              Pay
            </Button>
          </div>

          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={"info"}>
              {message}
            </Alert>
          </Snackbar>
        </Paper>
      </main>
    </React.Fragment>
  );
}
