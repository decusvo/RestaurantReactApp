import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import OrderItem from "./OrderItem";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `action-tab-${index}`,
        "aria-controls": `action-tabpanel-${index}`
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
        position: "relative",
        minHeight: 200
    }
}));

export default function WaiterDashboardV2() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => { // handles change of index in the <Tabs> component.
        setValue(index);
    };



    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="action tabs example"
                >
                    <Tab label="To be Served" {...a11yProps(0)} />
                    <Tab label="In Progress" {...a11yProps(1)} />
                    <Tab label="To Be Confirmed" {...a11yProps(2)} />
                </Tabs>
            </AppBar>

            <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
            >

                <TabPanel value={value} index={0} dir={theme.direction}>

                    <Grid container xs spacing={3}>
                        <Grid item xs>
                    <Card className={classes.card}>
                        <OrderItem orderState={"TBF"} tableID={5} orderID={10} />
                    </Card>
                        </Grid>
                    </Grid>

                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}
