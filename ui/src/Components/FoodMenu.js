import React from 'react';
import {Container, CssBaseline, Typography, withStyles} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Copyright from "./Copyright";
import Box from "@material-ui/core/Box";
import FoodMenuItem from "./FoodMenuItem";
import Grid from "@material-ui/core/Grid";


const useStyles = ({
    typography: {
        marginTop: 10, fontSize: 25
    }
});

class FoodMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            addedItems: []
        };
    }

    handlerPlus = (num, arg) => {
        const pos = this.state.addedItems.indexOf(arg);
        const {addedItems} = this.state;
        if (pos > -1) {
            addedItems[pos-1] += 1;
            this.setState({addedItems: addedItems})
        } else {
            this.setState({addedItems: this.state.addedItems.concat(num, arg)})
        }
    };

    handlerMinus = (num, arg) => {
        const pos = this.state.addedItems.indexOf(arg);
        const {addedItems} = this.state;
        if (pos > -1) {
            addedItems[pos-1] -= 1;
            if (addedItems[pos-1] > 0) {
                this.setState({addedItems: addedItems})
            }
        }
    };

    print = () => {
      console.log(this.state.addedItems);
    };

    async componentDidMount(){
        fetch("//127.0.0.1:5000/api/menu").then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({items : data});
        });
    }

    render() {
        const {classes} = this.props;
        const {handlerPlus, handlerMinus} = this;
        const MapMenuItem = ({value}) => {
            return this.state.items.map(function (dishes, index) {
                const dish = dishes["0"];
                const type = dish.type;

                if (type === value) {
                    return (<FoodMenuItem handlerMinus={handlerMinus} handlerPlus={handlerPlus} key={index} value={dish.name} description={dish.description} price={dish.price} calories={dish.calories}/>)
                } else {
                    return (<div key={index}> </div>);
                }
            });
        };

        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth={"xl"}>
                    <Typography style={{marginTop: 10, fontSize: 30}} color="textPrimary" gutterBottom>
                        Our Menu
                    </Typography>
                    <Button onClick={this.print}> </Button>

                    <Typography className={classes.typography} color={"textPrimary"} gutterBottom>
                        Starters
                    </Typography>
                    <Grid container spacing={3}>
                        <MapMenuItem value={"starter"}/>
                    </Grid>

                    <Typography className={classes.typography} color={"textPrimary"} gutterBottom>
                        Sides
                    </Typography>
                    <Grid container spacing={3}>
                        <MapMenuItem value={"side"} />
                    </Grid>

                    <Typography className={classes.typography} color={"textPrimary"} gutterBottom>
                        Mains
                    </Typography>
                    <Grid container spacing={3}>
                        <MapMenuItem value={"main"} />
                    </Grid>

                    <Typography className={classes.typography} color={"textPrimary"} gutterBottom>
                        Desserts
                    </Typography>
                    <Grid container spacing={3}>
                        <MapMenuItem value={"dessert"} />
                    </Grid>

                    <Box mt={5}>
                        <Copyright />
                    </Box>

                </Container>
            </React.Fragment>

        )
    }
}

export default withStyles(useStyles)(FoodMenu);
