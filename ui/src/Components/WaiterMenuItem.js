
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

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),

    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    }
}));

const WaiterMenuItem = ( props ) => {
    const classes = useStyles();
    const {value} = props;
    const [availability,setAvailability] = useState(true); // default availability is true.




    // Handles the change of radio button that updates the state of dish availability.
    const handleChange = event => {
        setAvailability(event.target.value);
    };


    return (
        <div className={classes.paper} >
        <Grid item xs={3}>
            <Card style={{backgroundColor: "#fcc01a"}}>
                    <div style={{display:"flex",flexDirection:"row",textAlign:"center"}} >
                <CardHeader title={value} />
                <Divider variant="horizontal" />
                        <div style={{flexJustify:"flex-end"}}> {/* Item styling.*/}
                <CardActions disableSpacing>
                    <FormControl component="fieldset" className={classes.form}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup defaultValue="Available" aria-label="Availability" name="dishState" onChange={handleChange}>
                            <FormControlLabel value="Available" control={<Radio />} label="Available" />
                            <FormControlLabel value="Unavailable" control={<Radio />} label="Unavailable" />
                        </RadioGroup>
                    </FormControl>
                </CardActions>
                        </div>
                    </div>
            </Card>
        </Grid>
        </div>
    );
};


export default (WaiterMenuItem);