import React from 'react';
import {Container, CssBaseline, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import FoodMenuItem from "./FoodMenuItem";

const useStyles = makeStyles({
    title: {
        marginTop: 10,
        fontSize: 25,
    },
});

export default function FoodMenu(){
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth={"xl"}>
                <Typography className={classes.title} color="textPrimary" gutterBottom>
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


};