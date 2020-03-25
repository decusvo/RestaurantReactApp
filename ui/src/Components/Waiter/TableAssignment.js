import React, { useState, useEffect } from "react";
import {List} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableWaiterCard from "./TableWaiterCard"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    alignItems: "center",
    justify: "center",
    marginLeft: theme.spacing(2)
  },
  title: {
    marginTop: theme.spacing(2),
    variant: "h2",
    color: "textSecondary"
  },
  inline: {
    display: "inline"
  }
}));

const TableAssignment = () => {
  const classes = useStyles();
  const currentUser = useSelector(state => state.currentUser);
  const [tables, setTables] = useState([])

  const getWaiterToTable = () => {
    fetch("//127.0.0.1:5000/get_tables_and_waiters", {
        method: 'POST'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        setTables(data.data.tables);
    });
  }

  useEffect(() => {
    getWaiterToTable()
  }, [])

  const MapTables = () => {
    return tables.map((item, index) => {
      return <TableWaiterCard key={index} id={item.table_number} item={item} state={item.email===currentUser.user.name} />
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h3" className={classes.title}>
        Table Assignment
      </Typography>

      <List className={classes.root}>
        <MapTables />
      </List>
    </React.Fragment>
  );
};

export default TableAssignment;
