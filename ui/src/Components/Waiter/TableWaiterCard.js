import React from 'react';
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";




const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),

    },
    paper: {
        marginTop: theme.spacing(8),
        flexGrow: 1,
    },
    cardTitle : {
        fontSize:'1.1rem'
    },
    orderCard: {
        margin: theme.spacing(3, 0, 2),
        color: 'primary'

    },

}));

const TableWaiterCard = ( props ) => {
    const classes = useStyles();
    const {id, item, state} = props;

    return (
        <div className={classes.paper} >
            <CssBaseline/>
            <Card className={classes.orderCard}>
                <CardHeader title={"Table " + id}
                titleTypographyProps={
                    {variant:'body1', noWrap:true}
                }/>

                <Divider />

                <Typography gutterBottom variant="subtitle1">
                    ID {id}
                </Typography>
                <CardActions >
                    <FormControl component="fieldset" className={classes.form}>
                        <RadioGroup aria-label="Availability" name="dishState"  defaultValue={ (state===true) ? "Available":"Unavailable"}>
                            <FormControlLabel value="Available" control={<Radio color={'primary'} />} label="Available" />
                            <FormControlLabel value="Unavailable" control={<Radio color={'primary'}/>} label="Unavailable" />
                        </RadioGroup>
                    </FormControl>
                </CardActions>
            </Card>
        </div>
    );
};


export default (TableWaiterCard);
