import React from "react";
import {List, ListItem} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

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

const MapOrderItem = () => {
    const currentItems = useSelector(state => state.currentItems);
    console.log(currentItems);

    const array = [{
        name:'Item 1',
        q:'5'
    },
        {
            name:'Item 2',
            q:'4'
        },
        {
            name:'Item 3',
            q:'2'
        },
        {
            name:'Item 4',
            q:'4'
        },
        {
            name:'Item 5',
            q:'2'
        },

    ];

    return array.map(function (dish, index) {
        // const itemName = dish.name;
        const itemQuantity = dish.q;
        return (<ListItem key={index} >
            <ListItemText
                primary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body1"
                            color="textPrimary"
                        >
                            itemName
                        </Typography>

                    </React.Fragment>
                }
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            color="textSecondary"
                        >
                            Q : {itemQuantity}
                        </Typography>

                    </React.Fragment>
                }
            />
        </ListItem>)
    });
};

const Order = () => {
    const classes = useStyles();
    const currentItems = useSelector(state => state.currentItems);
    return (
        <React.Fragment >
            <Typography variant="h3" className={classes.title}>
                Your order list
            </Typography>

            <List className={classes.root}>
                {console.log(currentItems)}
                <MapOrderItem />
            </List>

            <Grid container>
                <Grid item xs={12}  >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.checkout}
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )
};

export default Order;