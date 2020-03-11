import React from "react";
import {List} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
}));

const OrderTracking = () => {
    const classes = useStyles();

    return (
        <React.Fragment >
            <Typography variant="h3" className={classes.title}>
                Track your order
            </Typography>

            <List className={classes.root}>
                {/* Landing page after success.*/}
            </List>


        </React.Fragment>
    )
};

export default OrderTracking;
