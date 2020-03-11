import React from "react";
import {List, ListItem} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useSelector} from "react-redux";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";

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



const MapOrderItem = ({items}) => {
    if (items.length !== 0) {
        return items.map(function (dish, index) {
            const itemName = dish.name;
            const itemQuantity = dish.q;
            if (itemQuantity > 0) {
                return (<ListItem key={index} >
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <ListItem>
                                <Typography
                                    component="span"
                                    variant="body1"
                                    color="textPrimary"
                                >
                                    {itemName}
                                </Typography>

                                </ListItem>
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


const Tracking = () => {
    const classes = useStyles();
    const currentUser = useSelector(state => state.currentUser);

    const getTracking = () => {
        fetch("//127.0.0.1:5000/get_custs_order", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'custId':currentUser.user.name})
        }).then((response) => {
            return response.json();
        }).then((data) => {
            return data;
        });
    };

    const items = getTracking();
    console.log(items);




    return (
        <React.Fragment >
            <Typography variant="h3" className={classes.title}>
                Tracking
            </Typography>

            <Paper className={classes.orderContainer}>

                <List>
                   <MapOrderItem value={items}/>
                </List>

            </Paper>

        <List className={classes.root}>
         {/*Checkout form.*/}
        </List>


        </React.Fragment>
)
};

export default Tracking;
