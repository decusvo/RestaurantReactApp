import React, {useState} from 'react'
import {CardActions, CardContent, CardHeader, createMuiTheme, Fab, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import {useDispatch} from "react-redux";
import allActions from "../actions";
import {CardMedia} from "@material-ui/core";


const FoodMenuItem = (props) => {
    const dispatch = useDispatch();

    const PlusButtonHandler = (id, value, price) => {
        setItemQuantity(itemQuantity + 1);
        dispatch(allActions.itemActions.addItem(id, value, price));
    };

    const MinusButtonHandler = (value, price) => {
        if(itemQuantity > 0){
            setItemQuantity(itemQuantity - 1);
            dispatch(allActions.itemActions.removeItem(value, price));
        }
    };

    const theme = createMuiTheme();
    const {id, value, description, price, calories, image, quantity} = props;
    const [itemQuantity, setItemQuantity] = useState(quantity);
    return (
        <Grid item xs={3}>
            <Card style={{backgroundColor: "#fcc01a",
            padding: theme.spacing(2),
            marginBottom: theme.spacing(2), maxWidth: 345, height: "95%"}}>
                <CardHeader title={value} />
                <Divider variant="middle" />
                <CardMedia style={{height: 0, paddingTop: '56.25%'}} alt={value} height={"140"} title={value} image={image}/>
                <CardContent>
                    <Typography style={{textAlign:"left"}}>Description: {description}</Typography>
                    <Typography style={{textAlign:"left"}}>Calories : {calories}</Typography>
                    <Typography style={{textAlign:"left"}}>Price : {price}</Typography>
                </CardContent>
                <div style={{display:"flex" ,flexDirection:"column"}}>
                     <div style={{flexJustify:"flex-end"}}>
                <Divider variant="middle" />
                <CardActions style={{marginTop: "auto"}}>
                        <Fab color="primary" aria-label="minus" onClick={() => {MinusButtonHandler(value, price);}}>
                            <MinusIcon />
                        </Fab>
                        <Typography style={{marginRight: "auto", marginLeft: "auto"}}>{itemQuantity}</Typography>
                        <Fab color="primary" aria-label="add" onClick={() => {PlusButtonHandler(id, value, price);}}>
                            <AddIcon />
                        </Fab>
                </CardActions>
            </div>
        </div>
            </Card>
        </Grid>
    );
};

export default FoodMenuItem;