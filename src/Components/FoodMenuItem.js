import React from 'react'
import {Typography, Fab, CardContent, createMuiTheme} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import Grid from "@material-ui/core/Grid";
import {CardActions, CardHeader} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";


export default class FoodMenuItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            itemQuantity:0
        };

        this.PlusButtonHandler.bind(this);
        this.MinusButtonHandler.bind(this);
    }

    PlusButtonHandler = () => {
        this.setState({itemQuantity: this.state.itemQuantity + 1});
    };

    MinusButtonHandler = () => {
        if(this.state.itemQuantity > 0){
            this.setState({itemQuantity: this.state.itemQuantity - 1});
        }
    };

    render () {
        const theme = createMuiTheme();
        const {value, description, price, calories} = this.props;
        return (
            <Grid item xs={3}>
                <Card style={{backgroundColor: "#fcc01a",
                padding: theme.spacing(2),
                marginBottom: theme.spacing(2), maxWidth: 345}}>
                    <CardHeader title={value} />
                    <Divider variant="middle" />
                    <CardContent>
                        <Typography style={{textAlign:"left"}}>Description: {description}</Typography>
                        <Typography style={{textAlign:"left"}}>Calories : {calories}</Typography>
                        <Typography style={{textAlign:"left"}}>Price : {price}</Typography>
                    </CardContent>
                    <Divider variant="middle" />
                    <CardActions disableSpacing>
                            <Fab color="primary" aria-label="minus" onClick={this.MinusButtonHandler}>
                                <MinusIcon />
                            </Fab>
                            <Typography style={{marginRight: "auto", marginLeft: "auto"}}>{this.state.itemQuantity}</Typography>
                            <Fab color="primary" aria-label="add" onClick={this.PlusButtonHandler}>
                                <AddIcon />
                            </Fab>
                    </CardActions>
                </Card>
            </Grid>
        );
    }

};
