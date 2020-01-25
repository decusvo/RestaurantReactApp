import React from 'react'
import {Typography, Paper, createMuiTheme} from "@material-ui/core";


export default class FoodMenuItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            itemQuantity:0
        };

        this.PlusButtonHandler.bind(this);
        this.MinusButtonHandler.bind(this);
    }

    PlusButtonHandler() {
        let newState = (this.state.itemQuantity)+1;
        this.setState(newState);
    }

    MinusButtonHandler() {
        let newState = (this.state.itemQuantity)-1;
        this.setState(newState);
    }

    render () {
        const theme = createMuiTheme();
        return (
            <div style={{display: "flex", flexWrap: "wrap"}}>
                <Paper elevation={3} style={{margin: theme.spacing(1),
                    width: theme.spacing(1000000),
                backgroundColor: "#87d32f"}}>
                    <Typography >Dish name</Typography>
                    <Typography style={{textAlign:"left"}}>Dish description</Typography>
                    <Typography style={{textAlign:"left", }}>Nutritional information</Typography>
                    <Typography style={{textAlign:"left", }}>Allergies</Typography>
                </Paper>
            </div>
        );
    }

};