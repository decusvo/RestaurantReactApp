import React from 'react';
import '../Styling/normalize.css'
import '../Styling/skeleton.css'
import '../Styling/LoginMenu.css'
import SignInForm from "./SignInForm";


class SignIn extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

    }




    render() {
        return (
            <SignInForm />
        )

    }

}

export default SignIn;