import React, {useEffect, useState} from 'react';
import {Container} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import WaiterMenuItem from "./WaiterMenuItem";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../Styling/theme";
import ThemeProvider from "@material-ui/styles/ThemeProvider/ThemeProvider";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({

    paper: {
        marginTop: theme.spacing(8),
        alignItems: 'center',

    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: 'linear-gradient( 109.6deg,  rgba(98,210,141,0.88) 11.2%, rgba(234,245,45,0.79) 88% )',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    reset: {
        margin: theme.spacing(3, 0, 2),
        background: 'linear-gradient( 109.6deg,  rgba(227,236,62,0.68) 11.2%, rgba(230,29,58,0.78) 91.3% )',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    grid :{
        flexGrow:1
    }
}));

/*
 * This menu is responsible for showing all the dishes available to the waiter.
 * Each dish will show a drop-down menu with availability choices, selected dishes will be updated once the submit button is pressed to submit the states.
 */

const WaiterMenu = () => {
    const [items, setItems] = useState([]);
    const [vegan] = useState(false);
    const [vegetarian] = useState(false);
    const [glutenFree] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [updatedItems,setUpdatedItems] = useState([]);
    const classes = useStyles();


    // Calls the API to get the current menu items.
    const getMenu = () => {
        fetch("//127.0.0.1:5000/menu", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"getAll": true})
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setItems(data.data.items);
        });
    };
    useEffect(() => {
        getMenu()
    }, []);


    // Updates array of items that need a state update. Function is passed as a prop to be called back by child component.
    const handleState = (item) => {
        // Item is the "ID,state" pair. that is added to the updatedArray state.
        let tempArray = updatedItems;
        tempArray.push(item);
        setUpdatedItems(tempArray);
        console.log(tempArray);
    };

    const MapWaiterMenuItem = ({value}) => {
        return items.map(function (dishes, index) {
            const dish = dishes["0"];
            const type = dish.type;
            if(type === value){
                if ((vegan && dish.vegan === vegan) || (vegetarian && dish.vegetarian === vegetarian) || (glutenFree && dish.gluten_free === glutenFree)){
                    return (<WaiterMenuItem sendState={handleState} key={index} id={dish.id} value={dish.name} />)
                }else if (!vegan && !vegetarian && !glutenFree) {
                    return (<WaiterMenuItem  sendState={handleState} key={index} id={dish.id} value={dish.name} state={dish.available}/>)
                }
            } return null;
        });
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />
    }

    const handleClose = (event, reason) => {
        // Handles the closing of a notification.
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    };

    const handleReset = event => {
        /* Handles the reset of availability states back to default. */
        event.preventDefault();
        getMenu();
        setSeverity("success");
        setMessage("The changes made have been reset");
        setOpen(true);
    };

    const handleSubmit = event => {
       // API call to update state of dish list is not yet implemented.
       event.preventDefault();
       updatedItems.forEach(item => {
           let state = (item[1] === "Available");
           fetch("//127.0.0.1:5000/menu_item_availability", {
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify({'menuId':item[0],'newState':state})
           }).then(response => {
               setUpdatedItems([]);
               getMenu();
               setSeverity("success");
               setMessage("Availability has been successfully updated");
               setOpen(true);
               return response.json()
           }).catch(error => {
               console.log(error);
               setSeverity("failure");
               setMessage("There has been an error.");
               setOpen(true);

           })
       })
   };

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
            <CssBaseline />
                <Container component="main">
                    <div className={classes.paper}>
                    <Grid spacing={2}
                          container
                          className={classes.grid}
                    >
                        <Grid item xs>
                            <MapWaiterMenuItem value={"starter"} />
                        </Grid>

                        <Grid item xs>
                            <MapWaiterMenuItem value={"side"}/>
                        </Grid>

                        <Grid item xs>
                            <MapWaiterMenuItem value={"main"}/>
                        </Grid>

                        <Grid item xs>
                            <MapWaiterMenuItem value={"dessert"} className={classes.itemCard} />
                        </Grid>
                    </Grid>
                        <Grid
                            container
                            spacing={4}
                            className={classes.grid}
                        >
                            <Grid item xs>
                                <form className={classes.form} onSubmit={handleReset}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.reset}
                                    >
                                        Reset
                                    </Button>
                                </form>
                            </Grid>

                            <Grid item xs>
                                <form className={classes.form} onSubmit={handleSubmit} method = "post">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Submit
                                    </Button>
                                </form>
                            </Grid>

                        </Grid>
                </div>
                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={severity}>
                            {message}
                        </Alert>
                    </Snackbar>

            </Container>
            </ThemeProvider>



        </React.Fragment>

    )
};

export default WaiterMenu;