import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import theme from "../Styling/theme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Copyright from "./Copyright";
import Box from "@material-ui/core/Box";

import bcrypt from 'bcryptjs'

import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";

class SignUp extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        tAndC: false
      }
    }

    handleTAndCChange = (event) => {
      this.setState({tAndC: !this.state.tAndC})
    }

    handleTextChange = (event) => {
      let change = {};
      change[event.target.name] = event.target.value;
      this.setState(change)
    }

    checkPasswords() {
      return this.state.password === this.state.confirmPassword
    }

    handleSubmit = (event) => {
      event.preventDefault()    // prevenets post trying to redirect to another page
      if(this.checkPasswords() && this.state.tAndC){
        let {email, firstName, lastName, password} = this.state
        bcrypt.hash(password, 10, function(err, hash){
          fetch("//127.0.0.1:5000/signup", {method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({firstname: firstName,
                                "lastname": lastName,
                                "email": email,
                                "password": hash})
          }).then(response => {
            return response.json()
          }).then(data => {
            console.log(data);
          }).catch(error => console.log(error))
        })
      } else{
        // TODO: show error to the user i.e. the passwords are different
      }
    }

    render() {
      const {classes} = this.props;
      return (
          <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className={classes.paper}>
                      <Avatar className={classes.avatar}>
                          <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                          Sign up
                      </Typography>
                      <form className={classes.form} onSubmit={this.handleSubmit} method = "post">
                          <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                  <TextField
                                      autoComplete="fname"
                                      name="firstName"
                                      variant="outlined"
                                      required
                                      fullWidth
                                      id="firstName"
                                      placeholder="First Name"
                                      autoFocus
                                      onChange={this.handleTextChange}
                                  />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                  <TextField
                                      variant="outlined"
                                      required
                                      fullWidth
                                      id="lastName"
                                      placeholder="Last Name"
                                      name="lastName"
                                      autoComplete="lname"
                                      onChange={this.handleTextChange}
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <TextField
                                      type = 'email'
                                      variant="outlined"
                                      required
                                      fullWidth
                                      id="email"
                                      placeholder="Email Address"
                                      name="email"
                                      autoComplete="email"
                                      onChange={this.handleTextChange}
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <TextField
                                      variant="outlined"
                                      required
                                      fullWidth
                                      name="password"
                                      placeholder="Password"
                                      type="password"
                                      id="password"
                                      autoComplete="current-password"
                                      onChange={this.handleTextChange}
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <TextField
                                      variant="outlined"
                                      required
                                      fullWidth
                                      name="confirmPassword"
                                      placeholder="Confirm Password"
                                      type="password"
                                      id="passwordConfirmation"
                                      onChange={this.handleTextChange}
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <FormControlLabel
                                      control={<Checkbox value={this.state.tAndC}
                                            color="primary"
                                            onChange={this.handleTAndCChange} />}
                                      label="I have read Terms & Conditions"
                                  />
                              </Grid>
                          </Grid>
                          <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                          >
                              Sign Up
                          </Button>
                          <Grid container direction={'row'}>
                              <Grid container justify="flex-end" >
                                  <Grid item >
                                      <Link href="#" variant="body1">
                                          Read Terms & conditions
                                      </Link>
                                  </Grid>
                              </Grid>
                              <Grid container justify="flex-end">
                                  <Grid item >
                                      <Link href="#" variant="body1">
                                          Already have an account? Sign in
                                      </Link>
                                  </Grid>
                              </Grid>
                          </Grid>
                      </form>
                  </div>
                  <Box mt={5}>
                      <Copyright />
                  </Box>
              </Container>
          </ThemeProvider>
      );
    }
}

const useStyles = makeStyles(theme => ({
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
}));

export default withStyles(useStyles)(SignUp);
