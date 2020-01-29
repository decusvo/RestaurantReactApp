import React from 'react';
import {Container, CssBaseline, Typography} from '@material-ui/core';
import FoodMenuItem from "./FoodMenuItem";
import Button from "@material-ui/core/Button";
import Copyright from "./Copyright";
import Box from "@material-ui/core/Box";


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

	async componentDidMount(){
		fetch("//127.0.0.1:5000/api/menu").then((response) => {
			console.log(response);
			return response.json();
		}).then((data) => {
			this.setState({items : data});
		});
	}

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth={"xl"}>
                    <Typography style={{marginTop: 10, fontSize: 25}} color="textPrimary" gutterBottom>
                        Our Menu
                    </Typography>
                    <Button onClick={this.print}> </Button>

                    <FoodMenuItem value={"Dish Name"} description="TEST" whenClicked={this.AddItemToItems}/>
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

                    <Box mt={5}>
                        <Copyright />
                    </Box>

                </Container>
            </React.Fragment>

        )
    }
};
