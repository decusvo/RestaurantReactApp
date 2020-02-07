import React from 'react';
import '../Styling/LoginMenu.css'
import SignInForm from "./SignInForm";


class SignIn extends React.Component {



    constructor(props) {
        super(props);

        // Need to lift state from SignInForm.
        this.state = {
            email: '',
            password: ''
        };

    }




    render() {
        return (
            // Sign in form components rendered here.
            <SignInForm />
        )

    }

}

export default SignIn;