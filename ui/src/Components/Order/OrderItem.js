import React from 'react'
import {Typography, Fab, CardContent, createMuiTheme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {CardActions, CardHeader} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {blue, red} from "@material-ui/core/colors";
import ClearIcon from '@material-ui/icons/Clear';

const OrderItem = (props) => {

    const NextStateHandler = (orderState, orderID) => {
        //check if order state is "requested" or "readytoDeliver"
        if (orderState === "requested") {
            let newState = "start_cook";
            updateState(orderID, newState);
        } else if (orderState === "ready_to_deliver") {
            let newState = "deliver";
            updateState(orderID, newState);
        }

    };

    const CancelOrderHandler = (orderID) => {
        updateState(orderID, "cancel");
    };

    const updateState = (id, state) => {
        fetch("//127.0.0.1:5000/order_event", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"order_id": id, "order_event": state})
        }).then(response => {
            return response.json()
        }).catch(error => {
            console.log(error)
        });
    };


    //maps all items in the order
    const MapOrderItem = ({items}) => {
        return items.map((dish, index) => {

            let {quantity, name, cumulative_price} = dish;

            return(
                <Card style={{backgroundColor: "#fcc01a",
                    padding: theme.spacing(2),
                    marginBottom: theme.spacing(2)}} key={index}>

                    <Typography style={{textAlign:"middle"}}>Name: {name}</Typography>
                    <Typography style={{textAlign:"middle"}}>Price: {cumulative_price}</Typography>
                    <Typography style={{textAlign:"middle"}}>Quantity: {quantity}</Typography>

                </Card>
            )
        })
    };

    //checks if order is in the cooking state or not
    const isFabDisabled = (orderState) => {
        return orderState === "cooking";
    };

    const theme = createMuiTheme({
        palette: {
            primary: blue,
            secondary: red
        }
    });

    const {orderID, tableID, orderState, allItems, time, totalPrice} = props;

    return (
            <Grid container item xs justify={"center"} alignItems={"stretch"}>

                <Card style={{backgroundColor: "#fcc01a",
                    padding: theme.spacing(2),
                    marginBottom: theme.spacing(2),
                    minWidth: "95%",
                    maxWidth: "95%",
                    height: "95%"}}>
                    <CardHeader title={"Order No: ".concat(orderID)} />
                    <Divider variant="middle" />
                    <CardContent>

                        <Typography style={{textAlign:"middle"}}>Table: {tableID}</Typography>
                        <Typography style={{textAlign:"middle"}}>Price: {totalPrice}</Typography>
                        <Typography style={{textAlign:"middle"}}>Time: {time}</Typography>

                    </CardContent>
                    <Divider variant="middle" />

                    <CardActions disableSpacing>

                        <Fab color="secondary" aria-label="cancel" disabled={orderState === "ready_to_deliver"} onClick={() => {CancelOrderHandler(orderID);}}>
                            <ClearIcon />
                        </Fab>

                        <Typography style={{marginRight: "auto", marginLeft: "auto"}}/> {/*separates the Fab components from each other*/}

                        <Fab color="primary" aria-label="next" disabled={isFabDisabled(orderState)} onClick={() => {NextStateHandler(orderState, orderID);}}>
                            <ArrowForwardIosIcon />
                        </Fab>


                    </CardActions>

                    <ExpansionPanel color={"primary"}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography style={{textAlign:"middle"}}>MoreInfo</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>

                            <Grid
                                container
                                direction="column"
                                justify="space-evenly"
                                alignItems="stretch"
                            >
                                <Divider variant="middle" />

                                <MapOrderItem items={allItems}/>

                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                </Card>
            </Grid>
        );
};

export default OrderItem;
