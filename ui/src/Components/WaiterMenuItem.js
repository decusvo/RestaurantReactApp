import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
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
    }
}));

const WaiterMenuItem = ( props ) => {
    const classes = useStyles();
    const {id,value} = props;
    const [availability,setAvailability] = useState(true); // default availability is true.

    // Handles the change of radio button that updates the state of dish availability.
    const handleChange = event => {
        setAvailability(event.target.value);
    };



    return (
        <div className={classes.paper} >
            <CssBaseline/>
            <Card style={{backgroundColor: "#fcc01a" , height: '20vw'}}>
                <CardHeader title={value}
                titleTypographyProps={{variant:'display1' }}/>
                <Divider variant="horizontal" />
                <Typography gutterBottom variant="subtitle1">
                    ID : {id}
                </Typography>
                <CardActions >
                    <FormControl component="fieldset" className={classes.form}>
                        <FormLabel component="legend">State</FormLabel>
                        <RadioGroup defaultValue="Available" aria-label="Availability" name="dishState" onChange={handleChange}>
                            <FormControlLabel value="Available" control={<Radio />} label="Available" />
                            <FormControlLabel value="Unavailable" control={<Radio />} label="Unavailable" />
                        </RadioGroup>
                    </FormControl>
                </CardActions>
            </Card>
        </div>
    );
};


export default (WaiterMenuItem);