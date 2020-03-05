import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Elements from "react-stripe-elements/src/components/Elements";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        alignItems: "center",
        justify: "center",
        marginLeft: theme.spacing(2),
    },
    title: {
        marginTop: theme.spacing(2),
        variant:"h2",
        color:"textSecondary"
    }
}));

const retrieveOrders = () => {
    /*
    Call API to retrieve current order list for the particular order ID.
     */
}

// TODO: Implement a function retrieveOrders that calls the API to retrieve current orders.
// TODO: Implement a function which renders the order list appropriately.
// TODO: Build a form which accepts card details and customer information.


const Checkout = () => {
    const classes = useStyles();

    return (
        <React.Fragment >
            <ThemeProvider theme={theme}>
            <Typography variant="h5" className={classes.title}>
                Checkout
            </Typography>


                <Elements>
                {/*    This will contain a stripe element form which will accept customer details.*/}
                </Elements>



            </ThemeProvider>
        </React.Fragment>

    )
};

export default withStyles(useStyles)(Checkout);
