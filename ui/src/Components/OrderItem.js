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
import MapOrderItem from "./MapOrderItem";
// import {CardMedia} from "@material-ui/core";


export default class OrderItem extends React.Component {
    constructor(props){
        super(props);

        this.NextStateHandler.bind(this);
        this.PrevStateHandler.bind(this);
    }

    NextStateHandler = (orderState, orderID) => {
        //check if order state is "requested" or "readytoDeliver"      var orderStates = ["requested", "ready_to_deliver", "cooking"]
            this.setState(function () {
                this.props.handlerNextState(orderState, orderID);
            });
    };

    PrevStateHandler = (orderState, orderID) => {
        //check if order state is "cooking" or "readytoDeliver"
        this.setState(function () {
            this.props.handlerPrevState(orderState, orderID);
        });
    };

    isFabDisabled = (orderState) => {
        return orderState === "cooking";
    };

    render () {
        const theme = createMuiTheme();
        const {orderID, tableID, orderState} = this.props;

        // orderState={state} tableID={table_number} orderID={id}
        return (
            <Grid item xs justify={"center"} alignItems={"stretch"}>

                <Card style={{backgroundColor: "#fcc01a",
                    padding: theme.spacing(2),
                    marginBottom: theme.spacing(2)}}>
                    <CardHeader title={"Order No: ".concat(orderID)} />
                    <Divider variant="middle" />
                    <CardContent>

                        <Typography style={{textAlign:"middle"}}>Table: {tableID}</Typography>
{/*
                        <Typography style={{textAlign:"left"}}>list of menu items : {menuItems}</Typography>
                        <Typography style={{textAlign:"left"}}>totalPrice : {price}</Typography>

*/}
                    </CardContent>
                    <Divider variant="middle" />

                    <CardActions disableSpacing>

                                <fab color="primary" aria-label="prev" disabled={this.isFabDisabled(orderState)} onClick={() => {this.PrevStateHandler(orderState, orderID); this.props.handlerPrevState(orderState, orderID);}}>
                                    <ArrowBackIosIcon />
                                </fab>

                                <fab color="primary" aria-label="next" disabled={this.isFabDisabled(orderState)} onClick={() => {this.NextStateHandler(orderState, orderID); this.props.handlerNextState(orderState, orderID);}}>
                                    <ArrowForwardIosIcon />
                                </fab>


                    </CardActions>

                    <ExpansionPanel color={"primary"}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography style={{textAlign:"middle"}}>MoreInfo</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <MapOrderItem orderID={1} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                </Card>
            </Grid>
        );
    }
};
