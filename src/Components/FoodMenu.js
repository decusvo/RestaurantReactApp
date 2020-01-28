import React from 'react';
import {Container, CssBaseline, Typography} from '@material-ui/core';
import FoodMenuItem from "./FoodMenuItem";
import Button from "@material-ui/core/Button";


export default class FoodMenu extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    AddItemToItems = () => {
        console.log(this.message);
    };

    print = () => {
      console.log(this.state.items);
    };

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth={"xl"}>
                    <Typography style={{marginTop: 10, fontSize: 25}} color="textPrimary" gutterBottom>
                        Our Menu
                    </Typography>
                    <Button onClick={this.print}> </Button>

                    <FoodMenuItem value={"Dish Name"} whenClicked={this.AddItemToItems}/>
                    <FoodMenuItem />
                    <FoodMenuItem />
                    <FoodMenuItem />
                    <FoodMenuItem />
                    <FoodMenuItem />
                    <FoodMenuItem />
                    <FoodMenuItem />
                    <FoodMenuItem />
                    <FoodMenuItem />
                    <FoodMenuItem />
                    <FoodMenuItem />

                </Container>
            </React.Fragment>

        )
    }
};