import React from 'react';
import SignUpForm from "./SignUpForm";


class SignUp  extends React.Component {

    constructor(props) {
        super(props);

        // Need to lift state from SignUpForm.
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: ''
        };

    }




        render()
        {
            return(
                //Content from the signUpForm will be rendered here.
                <SignUpForm/>
            )

        }
    }

export default SignUp;