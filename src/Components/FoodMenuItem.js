import React from 'react'
import {Typography, Paper, createMuiTheme, Fab} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import Grid from "@material-ui/core/Grid";


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
                <Paper elevation={3} style={{backgroundColor: "#fcc01a",
                    padding: theme.spacing(1),
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                    whiteSpace: 'wrap',
                    height: theme.spacing(35),
                    marginBottom: theme.spacing(1),}}>
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
            </Grid>
        );
    }

};
