import React, {useEffect, useState} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {Container} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import WaiterMenuItem from "./WaiterMenuItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../Styling/theme";
import ThemeProvider from "@material-ui/styles/ThemeProvider/ThemeProvider";


// OBJECTIVE: Have a menu component which will display all the dishes and have the ability to change states "Available" , "Unavailable".

const useStyles = makeStyles(theme => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: 'linear-gradient(144deg, rgba(252,192,26,1) 0%, rgba(135,211,51,1) 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
}));

/*
 * This menu is responsible for showing all the dishes available to the waiter.
 * Each dish will show a drop-down menu with availability choices, selected dishes will be updated once the submit button is pressed to submit the states.
 */

const WaiterMenu = () => {

    const classes = useStyles();

    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("//127.0.0.1:5000/menu", {method: 'POST'}).then((response) => {
            return response.json();
        }).then((data) => {
            setItems(data.data.items);
        });
    }, []);


   const stateHandler = () => {



   }

    const MapWaiterMenuItem = ({value}) => {
        return items.map(function (dishes, index) {
            const dish = dishes["0"];
            const type = dish.type;

            if (type === value) {
                return (<WaiterMenuItem stateHandler={stateHandler} key={index} value={dish.name} dishState={dish.state}/>)
            } else {
                return (<div key={index}> </div>);
            }
        });
    };


    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
            <CssBaseline />
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                <Typography style={{marginTop: 10, fontSize: 30}} color="textPrimary" gutterBottom>
                    Dish list
                </Typography>

                <Typography  color={"textPrimary"} gutterBottom>
                    Starters
                </Typography>
                <Grid container spacing={12}>
                    <MapWaiterMenuItem value={"starter"}/>
                </Grid>

                <Typography  color={"textPrimary"} gutterBottom>
                    Sides
                </Typography>
                <Grid container spacing={12}>
                    <MapWaiterMenuItem value={"side"} />
                </Grid>

                <Typography color={"textPrimary"} gutterBottom>
                    Mains
                </Typography>
                <Grid container spacing={12}>
                    <MapWaiterMenuItem value={"main"} />
                </Grid>

                <Typography  color={"textPrimary"} gutterBottom>
                    Desserts
                </Typography>
                <Grid container spacing={12}>
                    <MapWaiterMenuItem value={"dessert"} />
                </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit availability
                        </Button>
                    </div>
            </Container>
            </ThemeProvider>



        </React.Fragment>

    )
};

export default (WaiterMenu);
