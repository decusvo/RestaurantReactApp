import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router";
import { useDispatch } from "react-redux";
import allActions from "../../actions";

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

export default function PaymentForm() {
  const classes = useStyles();
  const [redirectToSummary, setRedirectToSummary] = React.useState(false);
  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpiry, setCardExpiry] = React.useState("");
  const [cardCVV, setCardCVV] = React.useState("");
  const [cardSortCode, setCardSortCode] = React.useState("");
  const [payConfirmed, setPayConfirmed] = React.useState(false);
  const dispatch = useDispatch();

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
        setPayConfirmed(true);
        dispatch(allActions.orderActions.setResponse(data, cardName));
      });
  };

  const handleSortCode = event => {
    setCardSortCode(event.target.value);
  };
  const handleName = event => {
    setCardName(event.target.value);
  };
  const handleNumber = event => {
    setCardNumber(event.target.value);
  };
  const handleExpiry = event => {
    setCardExpiry(event.target.value);
  };

  const handleCVV = event => {
    setCardCVV(event.target.value);
  };

  const handleBack = () => {
    setRedirectToSummary(true);
  };
  return (
    <React.Fragment>
      {redirectToSummary ? <Redirect to="/OrderSummary" /> : null}
      {payConfirmed ? <Redirect to="/PostPaymentPage" /> : null}

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
        </Paper>
      </main>
    </React.Fragment>
  );
}
