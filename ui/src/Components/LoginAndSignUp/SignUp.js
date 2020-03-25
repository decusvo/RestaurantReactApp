import theme from "../../Styling/theme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import CustomerSignUp from "./CustomerSignUp"
import WaiterSignUp from "./WaiterSignUp";

import hash from 'hash.js';

import React from 'react';
import { useSelector } from "react-redux";
import {Redirect} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Copyright from "../Common/Copyright";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

const SignUp = (props) => {
    const {classes} = props;
    // state variables
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [tAndC, setTAndC] = React.useState(false);

    // Snackbar variables
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = React.useState("success");
    const [message, setMessage] = React.useState("You've registered successfully");

    // Redirect variables
    const [signedUp, setSignedUp] = React.useState(false);

    // gets the details of the current user
    const currentUser = useSelector(state => state.currentUser);

    const handleTAndCChange = () => {
        const new_tAndC = !tAndC;
      setTAndC(new_tAndC);
    };

    const checkPasswords = () => {
      return password === confirmPassword
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    };

    const handleTextChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === "firstName") {
            setFirstName(value);
        } else if (name === "lastName") {
            setLastName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = (event) => {
      event.preventDefault() ;   // prevenets post trying to redirect to another page
      if (tAndC) {
        if (checkPasswords()){
        // hash password
        let hashedPassword = hash.sha512().update(password).digest('hex');
        fetch("//127.0.0.1:5000/signup", {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"firstname": firstName,
                              "lastname": lastName,
                              "email": email,
                              "password": hashedPassword})
        }).then(response => {
          return response.json()
        }).then(data => {
          if (data.data !== undefined) {
              //display success message
              setSeverity("success");
              setMessage("You've registered successfully");
              setOpen(true);
              setTimeout(function () {
                setSignedUp(data.data.success)
              }, 1000)
          }else {
            // display failure message
              setSeverity("error");
              setMessage("Email already in use");
              setOpen(true)
          }
        }).catch(error => console.log(error))

        } else{
          // display warning message passwords not equal
            setSeverity("warning");
            setMessage("Passwords weren't the same");
            setOpen(true)
        }
      } else {
        // display warning message not agreeing to Terms and Condtions
        setSeverity("warning");
        setMessage("Please agree to the Terms and Conditions");
        setOpen(true)
      }
    };

    return (
        <ThemeProvider theme={theme}>
            {/*redirects user to log in once signed up successfully*/}
            {signedUp ? <Redirect to='/Login' /> : null}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                {currentUser.staff ?
                  <WaiterSignUp />
                  :
                  <CustomerSignUp
                    classes={classes}
                    handleSubmit={handleSubmit}
                    handleTextChange={handleTextChange}
                    handleTAndCChange={handleTAndCChange}
                    tAndC={tAndC}
                  /> }
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
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#87D333'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: 'linear-gradient(144deg, rgba(252,192,26,1) 0%, rgba(135,211,51,1) 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
});

export default withStyles(useStyles)(SignUp);
