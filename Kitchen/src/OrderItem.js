
import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {CssBaseline} from "@material-ui/core";
import ArrowForwardRounded from '@material-ui/icons/ArrowForwardRounded';
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';
import Fab from '@material-ui/core/Fab';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";



export default class OrderItem extends React.Component {

    constructor(props) {
        super(props);
    };

    handleClick = (id) => {
        fetch("//127.0.0.1:5000/order_event", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"order_id":id, "order_event": "cooked"})
        }).then(response => {
            this.props.getOrders();
            return response.json()
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error)
        });
    };


    render() {
        // eslint-disable-next-line
        const {orderState, tableID, orderID, index} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>
                <Card key={index}>
                    <Grid container direction={'column'}>
                        <Grid item>
                    <Typography color="textSecondary" variant="h5">
                        Order {orderID} </Typography>
                        </Grid>

                            <Grid item >
                            </Grid>
                        <Grid container justify={'flex-end'}>
                            <Grid item>
                            </Grid>
                            <Grid item>
                        </Grid>

                        </Grid>
                    </Grid>
                    {orderState === "cooking" ?
                    (<Button variant="contained" color="primary" onClick={() => this.handleClick(orderID)}>
                      Order Cooked
                    </Button>) :
                    (<Button disabled={true} variant="contained" color="primary">
                      Cooked
                    </Button>)}
                </Card>
            </React.Fragment>
        );
    }
}
