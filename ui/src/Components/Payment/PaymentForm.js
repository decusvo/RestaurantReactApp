import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// TODO: An API endpoint that verifies the card details.

export default function PaymentForm(props) {
  const { makePayment } = props;

  const submitPayment = () => {
    let cardName = this.cardName.getValue();
    let cardNumber = this.cardNumber.getValue();
    let expiry = this.expiry.getValue();
    let cvv = this.cvv.getValue();

    // The response from the API is sent up to Checkout.js

    fetch("//127.0.0.1:5000/make_payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cardName: cardName,
        cardNumber: cardNumber,
        expiryDate: expiry,
        cvv: cvv
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        props.response(data);
      });
  };

  useEffect(() => {
    submitPayment();
  }, [makePayment]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      }
      <div className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              ref={cardName => (this.cardName = cardName)}
              required
              id="cardName"
              label="Name on card"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              ref={cardNumber => (this.cardNumber = cardNumber)}
              required
              id="cardNumber"
              label="Card number"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              ref={expiry => (this.expiry = expiry)}
              required
              id="expDate"
              label="Expiry date"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              ref={cvv => (this.cvv = cvv)}
              required
              id="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
