import React, { useState, useEffect } from "react";
import {List} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableWaiterCard from "./TableWaiterCard"
import {Container} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import theme from "../../Styling/theme";
import ThemeProvider from "@material-ui/styles/ThemeProvider/ThemeProvider";

const useStyles = makeStyles(theme => ({

  title: {
    marginTop: theme.spacing(2),
    variant: "h2",
    color: "textSecondary"
  },
    paper: {
        marginTop: theme.spacing(8),
        alignItems: 'center',
    },
    grid: {
      flexGrow: 1
    }
}));

const TableAssignment = () => {
  const classes = useStyles();
  const currentUser = useSelector(state => state.currentUser);
  const [tables, setTables] = useState([]);

  const getWaiterToTable = () => {
    fetch("//127.0.0.1:5000/get_tables_and_waiters", {
        method: 'POST'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        setTables(data.data.tables);
    });
  };

  useEffect(() => {
    getWaiterToTable()
  }, []);

  const MapTables = () => {
    return tables.map((item, index) => {
      const {table_number, id, email} = item;
      return <Grid item><TableWaiterCard key={index} id={item.table_number} item={item} state={email===currentUser.user.name} /></Grid>
    });
  };

  return (
    <React.Fragment>
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Container component="main">
                <Typography variant="h3" className={classes.title}>
                    Table Assignment
                </Typography>
                <div className={classes.paper}>
                  <Grid spacing={10} container className={classes.grid} >
                      <MapTables />
                  </Grid>
                </div>
            </Container>
        </ThemeProvider>
    </React.Fragment>

  );
};

export default TableAssignment;
