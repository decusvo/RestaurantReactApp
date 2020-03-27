import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableWaiterCard from "./TableWaiterCard"
import {Container} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import theme from "../../Styling/theme";
import ThemeProvider from "@material-ui/styles/ThemeProvider/ThemeProvider";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from '@material-ui/core/Snackbar';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

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
  const [unassingedTables, setUnassingedTables] = useState([]);

  // snackbar values
  const [open, setOpen] = useState(false);
	const [severity, setSeverity] = useState("success");
	const [message, setMessage] = useState("You've logged in successfully");

  const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	};

  const getAssignedTables = () => {
    fetch("//127.0.0.1:5000/get_tables_and_waiters", {
        method: 'POST'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        setTables(data.data.tables);
    });
  };

  const getUnassignedTables = () => {
    fetch("//127.0.0.1:5000/get_unassinged_tables", {
        method: 'POST'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        setUnassingedTables(data.data.tables);
    });
  };

  useEffect(() => {
    getAssignedTables()
    getUnassignedTables()
  }, []);

  const MapTables = ({value}) => {
    if (value === true){
      return tables.map((item, index) => {
        const {table_number, email} = item;
        return (
              <React.Fragment key={index}>
                <Grid item>
                  <TableWaiterCard
                    key={index}
                    id={table_number}
                    item={item}
                    state={email===currentUser.user.name}
                    currentUser={currentUser}
                    getAssignedTables={getAssignedTables}
                    getUnassignedTables={getUnassignedTables}
                    setOpen={setOpen}
                    setSeverity={setSeverity}
                    setMessage={setMessage}
                  />
                </Grid>
              </React.Fragment>)
      });
    } else {
      return unassingedTables.map((item, index) => {
        return (
              <React.Fragment key={index}>
                <Grid item>
                  <TableWaiterCard
                    key={index}
                    id={item.table_number}
                    item={{email:false}}
                    currentUser={currentUser}
                    getAssignedTables={getAssignedTables}
                    getUnassignedTables={getUnassignedTables}
                    setOpen={setOpen}
                    setSeverity={setSeverity}
                    setMessage={setMessage}
                  />
                </Grid>
              </React.Fragment>)
      })
    }

  };

  return (
    <React.Fragment>
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Container component="main">
                <Typography variant="h3" className={classes.title}>
                    Table Assignment
                </Typography>
                {
                  unassingedTables === null ?
                    <div></div>
                  :
                  <Container>
                      <Typography variant="h5" className={classes.title}>
                          Unassigned Tables
                      </Typography>
                      <div className={classes.paper}>
                        <Grid spacing={10} container className={classes.grid} >
                            <MapTables value={false}/>
                        </Grid>
                      </div>
                  </Container>
                }
                {
                  tables === null ?
                    <div></div>
                  :
                  <Container>
                      <Typography variant="h5" className={classes.title}>
                          Assigned Tables
                      </Typography>
                      <div className={classes.paper}>
                        <Grid spacing={10} container className={classes.grid} >
                            <MapTables value={true}/>
                        </Grid>
                      </div>
                  </Container>
                }
            </Container>
        </ThemeProvider>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
					<Alert onClose={handleClose} severity={severity}>
						{message}
					</Alert>
				</Snackbar>
    </React.Fragment>

  );
};

export default TableAssignment;
