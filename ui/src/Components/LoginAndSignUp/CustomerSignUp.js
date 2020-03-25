import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import React from 'react';

const CustomerSignUp = (props) => {
  const {classes, handleSubmit, handleTextChange, handleTAndCChange, tAndC} = props
  return (
    <div className={classes.paper}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} method = "post">
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
                        onChange={handleTextChange}
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
                        onChange={handleTextChange}
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
                        onChange={handleTextChange}
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
                        onChange={handleTextChange}
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
                        onChange={handleTextChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value={tAndC}
                              color="primary"
                              onChange={handleTAndCChange} />}
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
  )
}

export default (CustomerSignUp)
