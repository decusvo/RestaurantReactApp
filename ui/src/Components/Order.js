import React from "react";
import {List, ListItem} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import allActions from "../actions";
import Link from "@material-ui/core/Link";
import {Redirect} from "react-router";

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
    const items = currentItems.items;
    if (items.length !== 0) {
        return items.map(function (dish, index) {
            const itemName = dish.name;
            const itemQuantity = dish.q;
            if (itemQuantity > 0) {
                return (<ListItem key={index} >
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body1"
                                    color="textPrimary"
                                >
                                    {itemName}
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
            } else {
                return (<div key={index}> </div>)
            }
        });
    } else {
        console.log("No items");
        return (<div> </div>)
    }

};

const Order = () => {
    const classes = useStyles();
    const currentItems = useSelector(state => state.currentItems);
    const currentUser = useSelector(state => state.currentUser);
    const [orderButtonClicked,setOrderButtonClicked] = React.useState(false);
    const items = currentItems.items;
    const dispatch = useDispatch();

    const handleClick = () => {
        const apiItems = [];
        items.map(function (dish) {
            for (let i = 0; i < dish.q; i++) {
                apiItems.push(dish.id)
            }
            return null;
        });
        fetch("//127.0.0.1:5000/create_order", {method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"table_num": 1, "items": apiItems, "custId": currentUser.user.name})
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log(data);
            dispatch(allActions.itemActions.resetItems())
            setOrderButtonClicked(true);
        }).catch(error => console.log(error))

    };

    return (
        <React.Fragment >
            {orderButtonClicked ? <Redirect to={"/Tracking"} />: null}
            <Typography variant="h3" className={classes.title}>
                Your order list
            </Typography>

            <List className={classes.root}>
                <MapOrderItem />
            </List>

            <Grid container>
                <Grid item xs={12}  >

                    <Button
                        onClick={() => handleClick()}
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.checkout}
                    >
                        Order
                    </Button>

                </Grid>
            </Grid>
        </React.Fragment>
    )
};

export default Order;
