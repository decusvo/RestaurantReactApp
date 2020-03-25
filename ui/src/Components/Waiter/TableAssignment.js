import React from "react";
import {List} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

const MapTables = () => {
  return null
};


const TableAssignment = () => {
  const classes = useStyles();
  const currentUser = useSelector(state => state.currentUser);

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
