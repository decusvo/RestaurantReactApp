import React from "react";
import {List, ListItem} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        alignItems: "center",
        justify: "center"
    },
    inline: {
        display: "inline"
    }
}));

const MapOrderItem = () => {
    const currentItems = useSelector(state => state.currentItems);
    console.log(currentItems.item);
    return currentItems.item.map(function (dish, index) {
        if (typeof dish === "string") {

            return (<ListItem key={index} >
                <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                                Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                    }
                />
            </ListItem>)
        } else {
            return (<div key={index}> </div>);
        }
    });
};

const Order = () => {
    const classes = useStyles();
    const currentItems = useSelector(state => state.currentItems);
    return (
        <List className={classes.root}>
            <MapOrderItem />
        </List>
    )
};

export default Order;