import React from 'react';
import '../Styling/normalize.css'
import '../Styling/skeleton.css'
import '../Styling/LoginMenu.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/styles";
import { green } from "@material-ui/core/colors";

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(144deg, rgba(252,192,26,1) 0%, rgba(135,211,51,1) 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);

const CssTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "green"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "green"

        }
    }
})(TextField);

class LoginMenu extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.handleClick.bind(this);
    }

    handleClick(event) {
        let apiBaseUrl = "ApiURLHere";
        let self = this;
        let payload = {
            "email": this.state.username,
            "password": this.state.password
        };

    }



    render() {
        return (

            <div className="row">
                <div className="ten columns">
                    <h4>Log In</h4>

                    <div className="Log-In-Container">
                    <div className="six columns">
                        <div className="Container-left-side">

                            <div className="Login">
                                <MuiThemeProvider>
                                    <div>
                                        <CssTextField
                                            label="Username"
                                            hintText="Enter your Username"
                                            onChange={(event, newValue) => this.setState({username: newValue})}
                                        />
                                        <br/>
                                        <CssTextField
                                            label="Password"
                                            type="password"
                                            hintText="Enter your Password"
                                            onChange={(event, newValue) => this.setState({password: newValue})}
                                        />
                                        <br/>
                                        <br/>
                                        <StyledButton
                                            color="primary"
                                            onClick={(event) => this.handleClick(event)}>
                                            Sign in
                                        </StyledButton>
                                    </div>
                                </MuiThemeProvider>
                            </div>
                        </div>
                        </div>
                        <div className="six columns">
                            <div className="Container-right-side">

                                <p>Are you a new member? Sign up below.</p>
                                <MuiThemeProvider>
                                    <StyledButton
                                        primary={true}
                                        onClick={(event) => this.handleClick(event)}>
                                        Sign up
                                    </StyledButton>

                                </MuiThemeProvider>


                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )

    }

}

export default LoginMenu;