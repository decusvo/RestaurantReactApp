
import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {CssBaseline} from "@material-ui/core";
import ArrowForwardRounded from '@material-ui/icons/ArrowForwardRounded';
import ArrowBackRounded from '@material-ui/icons/ArrowBackRounded';
import Fab from '@material-ui/core/Fab';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";



export default class OrderItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // To be confirmed (TBC) -> In Progress (IP) -> To Be Served (TBS) -> Complete
            // 0 -> 1 -> 2 - > 3
            orderState:0,
        };

        this.viewOrderHandler.bind(this);
        this.moveStateRight.bind(this);
        this.moveStateLeft.bind(this);
    };

    viewOrderHandler = () => {
        alert("click detected.");
    };

    moveStateRight = () => {
        this.setState((state) => ({
            counter: state.counter + 1
        }));
        alert(this.state.orderState);
    };

    moveStateLeft = () => {
        this.setState((state) => ({
            counter: state.counter - 1
        }));
        alert(this.state.orderState);
    };


    render() {
        // eslint-disable-next-line
        const {orderState, tableID, orderID} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>

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
            </React.Fragment>
        );
    }
}