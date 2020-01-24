import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';



class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        };

        this.handleClick.bind(this);
    }

    handleClick(event) {
        let apiBaseUrl = "EnterApiURLHere";
        let self = this;
        let payload = {
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "email": this.state.email,
            "password": this.state.password
        };


        render()
        {
            return (
                <div>
                    <MuiThemeProvider>
                        <div>

                            <TextField
                                hintText="Enter your First Name"
                                floatingLabelText="First Name"
                                onChange={(event, newValue) => this.setState({first_name: newValue})}
                            />
                            <br/>
                            <TextField
                                hintText="Enter your Last Name"
                                floatingLabelText="Last Name"
                                onChange={(event, newValue) => this.setState({last_name: newValue})}
                            />
                            <br/>
                            <TextField
                                hintText="Enter your Email"
                                type="email"
                                floatingLabelText="Email"
                                onChange={(event, newValue) => this.setState({email: newValue})}
                            />
                            <br/>
                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                floatingLabelText="Password"
                                onChange={(event, newValue) => this.setState({password: newValue})}
                            />
                            <br/>
                            <RaisedButton label="Submit" primary={true} onClick={(event) => this.handleClick(event)}/>
                        </div>
                    </MuiThemeProvider>
                </div>
            );
        }
    }
}


export default Registration;