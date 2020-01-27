import React from 'react';
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
import Box from "@material-ui/core/Box";
import Copyright from "./Copyright";

const useStyles = makeStyles(theme => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),

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

export default function SignInForm() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        placeholder="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        color="primary"

                    />
                    <TextField
                        variant='outlined'
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        placeholder="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        color="primary"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me."
                    />
                    <FormControlLabel
                        control={<Checkbox value="staff" color="primary" />}
                        label="Staff member?"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container direction={'row'}>
                        <Grid container justify="flex-end" >
                            <Grid item >
                                <Link href="#" variant="body1">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end">
                            <Grid item >
                                <Link href="#" variant="body1">
                                    Don't have an account? Sign up
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