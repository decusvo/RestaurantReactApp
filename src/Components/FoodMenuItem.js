import React from 'react'
import {Typography, Paper, createMuiTheme, Fab} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';


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
            <div style={{display: "flex", flexWrap: "wrap"}}>
                <Paper elevation={3} style={{margin: theme.spacing(1),
                    width: theme.spacing(1000000),
                backgroundColor: "#87d32f"}}>
                    <Typography >{value}</Typography>
                    <Typography style={{textAlign:"left"}}>Description: {description}</Typography>
                    <Typography style={{textAlign:"left"}}>Calories : {calories}</Typography>
                    <Typography style={{textAlign:"left"}}>Price : {price}</Typography>
                    <Fab color="primary" aria-label="minus" onClick={this.MinusButtonHandler}>
                        <MinusIcon />
                    </Fab>
                    <Fab color="primary" aria-label="add" onClick={this.PlusButtonHandler}>
                        <AddIcon />
                    </Fab>
                    <Typography>{this.state.itemQuantity}</Typography>
                </Paper>
            </div>
        );
    }

};
