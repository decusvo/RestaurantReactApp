import React from 'react';
import SignUpForm from "./SignUpForm";


class SignUp  extends React.Component {

    constructor(props) {
        super(props);
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
                <SignUpForm/>
            )

        }
    }

