
import React, {useState} from 'react';

import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import {makeStyles} from "@material-ui/core/styles";

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


    const handleChange = name => event => {
        setAvailability({
            ...availability
        });
    };


    
    return (
        <div className={classes.paper} >
        <Grid item xs={3}>
            <Card style={{backgroundColor: "#fcc01a"}}>
                <CardHeader title={value} />
                <Divider variant="middle" />
                <CardActions disableSpacing>
                    <FormControl className={classes.form}>
                        <InputLabel htmlFor="dish-state-native-simple">Availability</InputLabel>
                        <Select
                            native
                            value={availability}
                            onChange={handleChange('dishState')}
                            inputProps={{
                                name : 'dishState',
                                id: 'dish-state-native-simple',
                            }}
                        >
                            <option value="" />
                            <option value={10}>Available</option>
                            <option value={20}>Unavailable</option>
                        </Select>
                    </FormControl>
                </CardActions>
            </Card>
        </Grid>
        </div>
    );
};


export default (WaiterMenuItem);