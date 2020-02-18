import React, {useEffect, useState} from 'react';
import {Container, CssBaseline, Typography, withStyles} from '@material-ui/core';
import Copyright from "./Copyright";
import Box from "@material-ui/core/Box";
import FoodMenuItem from "./FoodMenuItem";
import Grid from "@material-ui/core/Grid";


const useStyles = ({
    typography: {
        marginTop: 10, fontSize: 25
    }
});

const FoodMenu = (props) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("//127.0.0.1:5000/menu", {method: 'POST'}).then((response) => {
            return response.json();
        }).then((data) => {
            setItems(data.data.items);
        });
    }, []);

    const {classes} = props;
        const {handlerPlus, handlerMinus} = props;
        const MapMenuItem = ({value}) => {
            return items.map(function (dishes, index) {
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
};

export default withStyles(useStyles)(FoodMenu);
