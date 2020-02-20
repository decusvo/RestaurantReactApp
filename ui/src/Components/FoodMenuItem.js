import React, {useState} from 'react'
import {CardActions, CardContent, CardHeader, createMuiTheme, Fab, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import {useDispatch} from "react-redux";
import allActions from "../actions";
// import {CardMedia} from "@material-ui/core";


const FoodMenuItem = (props) => {
    const [itemQuantity, setItemQuantity] = useState(0);

    const dispatch = useDispatch();

    const PlusButtonHandler = (value) => {
        setItemQuantity(itemQuantity + 1);
        dispatch(allActions.itemActions.addItem(value));
    };

    const MinusButtonHandler = (value) => {
        if(itemQuantity > 0){
            setItemQuantity(itemQuantity - 1);
        }
        dispatch(allActions.itemActions.removeItem(value));
    };

    const theme = createMuiTheme();
    const {value, description, price, calories} = props;
    return (
        <Grid item xs={3}>
            <Card style={{backgroundColor: "#fcc01a",
            padding: theme.spacing(2),
            marginBottom: theme.spacing(2), maxWidth: 345}}>
                <CardHeader title={value} />
                <Divider variant="middle" />
                <CardContent>
                    {/*<CardMedia component={"img"} alt={value} height={"140"} title={value} img={"../Images/Logo.png"}/>*/}
                    <Typography style={{textAlign:"left"}}>Description: {description}</Typography>
                    <Typography style={{textAlign:"left"}}>Calories : {calories}</Typography>
                    <Typography style={{textAlign:"left"}}>Price : {price}</Typography>
                </CardContent>
                <Divider variant="middle" />
                <CardActions disableSpacing>
                        <Fab color="primary" aria-label="minus" onClick={() => {MinusButtonHandler(value);}}>
                            <MinusIcon />
                        </Fab>
                        <Typography style={{marginRight: "auto", marginLeft: "auto"}}>{itemQuantity}</Typography>
                        <Fab color="primary" aria-label="add" onClick={() => {PlusButtonHandler(value);}}>
                            <AddIcon />
                        </Fab>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default FoodMenuItem;