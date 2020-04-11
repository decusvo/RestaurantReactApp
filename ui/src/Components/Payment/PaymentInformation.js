import React, {useEffect, useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import {Card, MuiThemeProvider} from "material-ui";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";


/**
 * useStyles contains CSS styling for the PaymentInformation.js
 *
 */

const useStyles = makeStyles(theme => ({
   card: {
       padding: theme.spacing(6),
       margin: theme.spacing(6),
       display: 'flex',
       textAlign: 'center',
       flexDirection: 'column',
       alignItems: 'center',
       fontSize: 20
   }
}));

const PaymentInformation = () => {
    const [info, setInfo] = useState([]);
    const classes = useStyles();
    const currentUser = useSelector(state => state.currentUser);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentUser.user !== undefined) {
                const waiter_id = currentUser.user.name;
                fetch("//127.0.0.1:5000/get_waiters_orders", {method:'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({"waiter_id": waiter_id, "states": ["delivered"]})
                }).then(response => {
                    return response.json()
                }).then(data => {
                        setInfo(data.data.orders)
                    }
                )
            }
        }, 1000);

        return () => clearInterval(interval);
        }
        ,[]);

    const MapPaymentInformation = () => {
        if (info) {
            return info.map(function ({table_number}, index) {
                return (
                    <Grid key={index} item xs={12} md={3}>
                        <Card className={classes.card}>
                            <Typography>Table {table_number} hasn't payed yet</Typography>
                        </Card>
                    </Grid> )
            })
        } else {
            return null
        }

    };

    return (
        <React.Fragment>
            <MuiThemeProvider>
                <Grid container spacing={3}>
                    <MapPaymentInformation/>
                </Grid>
            </MuiThemeProvider>
        </React.Fragment>
    )
};

export default PaymentInformation;
