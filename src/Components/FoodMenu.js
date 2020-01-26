import React from 'react';
import {Container, CssBaseline, Typography} from '@material-ui/core';
import FoodMenuItem from "./FoodMenuItem";


export default class FoodMenu extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    AddItemToList = (item) => {
        this.setState({items: this.state.items.add(item)});
    };

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth={"xl"}>
                    <Typography style={{marginTop: 10, fontSize: 25}} color="textPrimary" gutterBottom>
                        Our Menu
                    </Typography>

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
                    <FoodMenuItem />

                </Container>
            </React.Fragment>

        )
    }
};