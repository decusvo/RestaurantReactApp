
import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {CardActions, CssBaseline} from "@material-ui/core";
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
        }

        this.viewOrderHandler.bind(this);
        this.moveStateRight.bind(this);
        this.moveStateLeft.bind(this);
    };

    viewOrderHandler = () => {
        alert("click detected.");
    }

    moveStateRight = () => {
        this.setState((state, props) => ({
            counter: state.counter + 1
        }));
        alert(this.state.orderState);
    }

    moveStateLeft = () => {
        this.setState((state, props) => ({
            counter: state.counter - 1
        }));
        alert(this.state.orderState);
    }


    render() {
        const {orderState, tableID, orderID} = this.props;
        return (
            <React.Fragment>
                <CssBaseline/>

                <Grid container direction={'column'}>
                    <Grid item>
                <Typography color="textSecondary" variant="h5">
                    Order {orderID} </Typography>
                    </Grid>
                    <Grid item>
                <Typography component="p" variant="h5">
                    Table {tableID}
                </Typography>
                    </Grid>
                        <Grid item >
                    <Link color="primary" href="#" onClick={this.viewOrderHandler}>
                        More details
                    </Link>
                        </Grid>
                    <Grid container justify={'flex-end'}>
                        <Grid item>
                            <Fab color="primary" aria-label="Left" onClick={() => {this.moveStateLeft()}}>
                                <ArrowBackRounded/>
                            </Fab>
                        </Grid>
                        <Divider orientation="vertical" />
                        <Grid item>
                        <Fab color="primary" aria-label="Right" onClick={() => {this.moveStateRight()}}>
                            <ArrowForwardRounded/>
                        </Fab>
                    </Grid>

                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}