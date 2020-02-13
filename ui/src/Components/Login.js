import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import theme from "../Styling/theme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Box from "@material-ui/core/Box";
import Copyright from "./Copyright";


import hash from 'hash.js'

import React from 'react';
import '../Styling/LoginMenu.css'
import withStyles from "@material-ui/core/styles/withStyles";




import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



// custom styles defined here.
class Login extends React.Component {
	constructor(props) {
				super(props);
				this.state = {
						email: '',
						password: '',
						staff: false,
						loggedIn: false
				};
		}

		handleTextChange = (event) => {
			let change = {};
			change[event.target.type] = event.target.value;
			this.setState(change)
		};

		handleStaff = () => {
			this.setState({staff: !this.state.staff})
		};

    handleSubmit = (event) => {
      event.preventDefault();
      let {email, password, staff} = this.state;
      let hashedPassword = hash.sha512().update(password).digest('hex')
      fetch("//127.0.0.1:5000/login", {method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"email": email, "password": hashedPassword, "staff_login": staff})
      }).then(response => {
        return response.json()
      }).then(data => {
        if (data.data !== undefined) {
          this.setState({loggedIn: data.data.valid_credentials})
          // display success message
        } else {
          // display failure message using data.data.message
        }

      }).catch(error => console.log(error))
    };

    handleSubmit = (event) => {
      event.preventDefault();
      let {email, password, staff} = this.state;
      let hashedPassword = hash.sha512().update(password).digest('hex')
      fetch("//127.0.0.1:5000/logout", {method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"email": email, "password": hashedPassword, "staff_login": staff})
      }).then(response => {
        return response.json()
      }).then(data => {
        if (data.data == true) {
          this.setState({loggedOut: data.data.valid_credentials})
          // display success message
        } else {
          // display failure message using data.data.message
        }

      }).catch(error => console.log(error))
    };

		render() {
			const {classes} = this.props;
				return (
					<ThemeProvider theme={theme}>
					<Container component="main" maxWidth="xs">
							<CssBaseline />
							<div className={classes.paper}>

									<Typography component="h1" variant="h5">
											Sign in
									</Typography>
									<form className={classes.form} onSubmit={this.handleSubmit} method = "post">
											<Grid container spacing={1}>
													<Grid item xs={12}>
											<TextField
													type="email"
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
													onChange={this.handleTextChange}
											/>
													</Grid>
													<Grid item xs={12}>
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
													onChange={this.handleTextChange}
											/>
													</Grid>
											</Grid>
											<FormControlLabel
													control={<Checkbox value="remember" color="primary" />}
													label="Remember me."
											/>
											<FormControlLabel
													control={<Checkbox value={this.state.staff} color="primary" onChange={this.handleStaff} />}
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
											<Button
													type="submit"
													fullWidth
													variant="contained"
													color="primary"
													className={classes.submit}
											>
													Logout
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
				)
		}
}

const useStyles = theme => ({
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
				margin: theme.spacing(1, 0, 0),
				background: 'linear-gradient(144deg, rgba(252,192,26,1) 0%, rgba(135,211,51,1) 90%)',
				borderRadius: 3,
				border: 0,
				color: 'white',
				height: 40,
				padding: '0 30px',
				boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		},
		logout: {
				margin: theme.spacing(0, 0, 1),
				background: 'linear-gradient(144deg, rgba(252,192,26,1) 0%, rgba(135,211,51,1) 90%)',
				borderRadius: 3,
				border: 0,
				color: 'white',
				height: 40,
				padding: '0 30px',
				boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		},
});

export default withStyles(useStyles)(Login);
