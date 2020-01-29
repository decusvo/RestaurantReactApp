import React from 'react';
import {Container, CssBaseline, Typography} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Copyright from "./Copyright";
import Box from "@material-ui/core/Box";
import FoodMenuItem from "./FoodMenuItem";


export default class FoodMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    print = () => {
      console.log(this.state.items);
    };

    async componentDidMount(){
        fetch("//127.0.0.1:5000/api/menu").then((response) => {
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

                    {
                        this.state.items.map(function (dishes, index) {
                            const dish = dishes["0"];
                            // const type = dish.type; for rendering starters only
                            return (
                                <FoodMenuItem key={index} value={dish.name} description={dish.description} price={dish.price} calories={dish.calories}/>
                            );
                            // if (type === "starter") {
                            //     return (
                            //         <FoodMenuItem key={index} value={dish.name} description={dish.description} price={dish.price} calories={dish.calories}/>
                            //     );
                            // } else {
                            //     return(<div key={index}/>);
                            // } for rendering starters only
                        })
                    }

                    <Box mt={5}>
                        <Copyright />
                    </Box>

                </Container>
            </React.Fragment>

        )
    }
};
