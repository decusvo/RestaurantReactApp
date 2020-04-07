import React, {useEffect, useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import {Card, MuiThemeProvider} from "material-ui";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
   card: {
       padding: theme.spacing(6),
       marginTop: theme.spacing(6),
       display: 'flex',
       textAlign: 'center',
       flexDirection: 'column',
       alignItems: 'center',
       fontSize: 20
   }
}));

const PaymentInformation = () => {
    const info = [{"table_id": 4}, {"table_id": 8}];
    // const [info, setInfo] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        fetch()
            .then()
        },[]);

    const MapPaymentInformation = () => {
        return info.map(function (table, index) {
            return (
                <Grid key={index} item xs={12} md={3}>
                    <Card className={classes.card}>
                        <Typography>

                        </Typography>
                    </Card>
                </Grid> )
        })
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
