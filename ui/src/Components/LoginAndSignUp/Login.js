import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import theme from "../../Styling/theme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Box from "@material-ui/core/Box";
import Copyright from "../Common/Copyright";
import hash from "hash.js";
import buttonStyles from "../../Styling/buttonStyles";
import LoginSignupStyles from "../../Styling/LoginSignupStyles";

// Code copied and modified from material-ui website
// https://material-ui.com/components/snackbars/
import Snackbar from "@material-ui/core/Snackbar";
import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiAlert from "@material-ui/lab/Alert";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import allActions from "../../actions";
import History from "../../utils/history";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import {useN04TextInfoContentStyles} from "@mui-treasury/styles/textInfoContent/n04";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = props => {
  const { classes } = props;
  const dispatch = useDispatch();

  let [email, setEmail] = useState("");

  if (localStorage.getItem("rememberEmail") === "true") {
    email = localStorage.getItem("email");
  }

  const [password, setPassword] = useState("");
  const [staff, setStaff] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("success");
  const [message, setMessage] = React.useState("You've logged in successfully");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [tables, setTables] = React.useState([]);
  const [table, setTable] = React.useState(1);
  localStorage.setItem("table", table.toLocaleString());

  const handleEmailInput = event => {
    setEmail(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handlePasswordInput = event => {
    setPassword(event.target.value);
  };

  const handleStaff = () => {
    setStaff(!staff);
  };

  const handleSubmit = event => {
    if (rememberMe === true) {
      localStorage.setItem("email", email);
      localStorage.setItem("rememberEmail", "true");
    }

    event.preventDefault();
    let hashedPassword = hash
      .sha512()
      .update(password)
      .digest("hex");
    fetch("//127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: hashedPassword,
        staff_login: staff
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.data !== undefined) {
          setTimeout(function() {
            setLoggedIn(data.data.valid_credentials);
          }, 1000);
          // display success message
          setSeverity("success");
          setMessage("You've logged in successfully");
          setOpen(true);
        } else {
          // display failure message using data.data.message
          setSeverity("error");
          setMessage("Password or email incorrect");
          setOpen(true);
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    const user = { name: email, staff: staff };
    if (loggedIn === true) {
      dispatch(allActions.userActions.logIn(user));
    }
    // eslint-disable-next-line
  }, [loggedIn, email]);

  const setRemember = event => {
    if (event.target.checked === true) {
      setRememberMe(true);
    }
  };

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = () => {
    fetch("//127.0.0.1:5000/get_tables", {
      method: "POST"
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setTables(data.data.tables);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleTableChange = event => {
    setTable(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {loggedIn ? (
          staff ? (
            <Redirect to="/WaiterMenu" />
          ) : (
            History.push(-1)
          )
        ) : null}
        <div className={classes.paper}>
          <TextInfoContent
              useStyles={useN04TextInfoContentStyles}
              heading={'Sign in'}
          />
          <FormControl>
            <Select value={table} onChange={handleTableChange}>
              {tables.map((ele, index) => {
                return (
                  <MenuItem key={index} value={ele}>
                    {" "}
                    Table {ele}{" "}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <form className={classes.form} onSubmit={handleSubmit} method="post">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  color="primary"
                  onChange={handleEmailInput}
                  defaultValue={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  color="primary"
                  onChange={handlePasswordInput}
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={setRemember}
				  defaultChecked={(localStorage.getItem("rememberEmail") === "true")}
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me."
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={staff}
                  color="primary"
                  onChange={handleStaff}
                />
              }
              label="Staff member?"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Sign In
            </Button>
            <Grid container direction={"row"}>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body1">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link
                    onClick={() => History.push("/Register")}
                    variant="body1"
                  >
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const useStyles = theme => ({
  ...LoginSignupStyles(theme),
  ...buttonStyles(theme)
});

export default withStyles(useStyles)(Login);
