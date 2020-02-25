import React from 'react';
import {CssBaseline, Typography, withStyles} from '@material-ui/core';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";


//basic styles
const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },

    card: {
        padding: theme.spacing(6),
        marginTop: theme.spacing(6),
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 20
    },

    typography: {
        marginTop: 10, fontSize: 25
    }
});

class Kitchen extends React.Component {

    render() {
        return (
            <React.Fragment>
                <CssBaseline />

                <Grid container spacing={3}>
                    {/*Grid for the to be confirmed, order objects will later be loaded in dynamically*/}
                    <Grid item xs>
                        <Typography color={"textPrimary"} gutterBottom>
                            In Progress
                        </Typography>
                    </Grid>

                    <Grid item xs>
                        <Typography color={"textPrimary"} gutterBottom>
                            Currently Cooking
                        </Typography>
                    </Grid>
                </Grid>

                    <Box mt={5}>
                    </Box>
            </React.Fragment>

        )
    }
}

export default withStyles(useStyles)(Kitchen);
