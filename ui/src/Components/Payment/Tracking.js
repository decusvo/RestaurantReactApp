import React, {useEffect} from "react";
import {List} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        alignItems: "center",
        justify: "center",
        marginLeft: theme.spacing(2),
    },
    inline: {
        display: "inline"
    },
    title: {
        marginTop: theme.spacing(2),
        variant:"h2",
        color:"textSecondary"
    },
    checkout: {
        margin: theme.spacing(3, 0, 2),
        background: 'linear-gradient(144deg, rgba(252,192,26,1) 0%, rgba(135,211,51,1) 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        minWidth: 200
    },
}));


const getTracking = () => {
    const currentUser = useSelector(state => state.currentUser);

    fetch("//127.0.0.1:5000/get_custs_order", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({'custId':currentUser.})
    }).then((response) => {
        return response.json();
    }).then((data) => {
    //
    });
}
useEffect(() => {
    getMenu()
}, []);

const Tracking = () => {
    const classes = useStyles();




    return (
        <React.Fragment >
            <Typography variant="h3" className={classes.title}>
                Tracking
            </Typography>

        <List className={classes.root}>
         {/*Checkout form.*/}
        </List>


        </React.Fragment>
)
};

export default Tracking;
