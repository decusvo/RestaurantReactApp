import React from 'react'
import {Typography, Fab, CardContent, createMuiTheme} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import Grid from "@material-ui/core/Grid";
import {CardActions, CardHeader} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ExpandMore} from "@material-ui/icons";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import FoodMenuItem from "./FoodMenuItem";
// import {CardMedia} from "@material-ui/core";


const OrderItem = (props) => {

    const NextStateHandler = (orderState, orderID) => {
        //check if order state is "requested" or "readytoDeliver"      var orderStates = ["requested", "ready_to_deliver", "cooking"]

    };

    const PrevStateHandler = (orderState, orderID) => {
        //check if order state is "cooking" or "readytoDeliver"
    };

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
            //return value.map((ele, index) => {
            //             const order = ele;
            //             console.log(order);
            //             let {state, id, table_number, items} = order;
            //             return (<OrderItem key={index} orderState={state} tableID={table_number} orderID={id} allItems={items} />)
            //           })

        })
    };

    const isFabDisabled = (orderState) => {
        return orderState === "cooking";
    };

    const theme = createMuiTheme();
    const {orderID, tableID, orderState, allItems, time, totalPrice} = props;

    return (

        // orderState={state} tableID={table_number} orderID={id}
            <Grid item xs justify={"center"} alignItems={"stretch"}>

                <Card style={{backgroundColor: "#fcc01a",
                    padding: theme.spacing(2),
                    marginBottom: theme.spacing(2)}}>
                    <CardHeader title={"Order No: ".concat(orderID)} />
                    <Divider variant="middle" />
                    <CardContent>

                        <Typography style={{textAlign:"middle"}}>Table: {tableID}</Typography>
                        <Typography style={{textAlign:"middle"}}>Price: {totalPrice}</Typography>
                        <Typography style={{textAlign:"middle"}}>Time: {time}</Typography>

                    </CardContent>
                    <Divider variant="middle" />

                    <CardActions disableSpacing>

                        <Fab color="primary" aria-label="prev" disabled={isFabDisabled(orderState)} onClick={() => {PrevStateHandler(orderState, orderID);}}>
                            <ArrowBackIosIcon />
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
