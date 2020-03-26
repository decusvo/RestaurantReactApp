import React from 'react';
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";




const useStyles = makeStyles(theme => ({
    button: {
        margin: "auto",
        justifyContent: "center",
        marginBottom: "1.5em",
    },
    paper: {
        marginTop: theme.spacing(8),
        flexGrow: 1
    },
    cardTitle : {
        fontSize:'1.1rem',
    },
    orderCard: {
        margin: theme.spacing(3, 0, 2),
        color: 'primary'

    },

}));

const TableWaiterCard = ( props ) => {
    const classes = useStyles();
    const {id, item, state} = props;
    const {firstname, lastname} = item

    const handleClick = () => {
      return null
    }

    return (
        <div className={classes.paper} >
            <CssBaseline/>
            <Card className={classes.orderCard}>
                <CardHeader title={"Table " + id}
                titleTypographyProps={
                    {variant:'body1', noWrap:true}
                }/>

                <Divider />

                <Typography gutterBottom variant="subtitle1" style={{marginLeft: "2.5em", marginRight: "2.5em"}}>
                    Assigned to: {firstname} {lastname}
                </Typography>
                <CardActions >
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => handleClick()}>
                      {state ? "Unassign":"Assign"}
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};


export default (TableWaiterCard);
