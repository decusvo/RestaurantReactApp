const logIn = (userObj) => {
    return {
        type: "LOG_IN",
        payload: userObj
    }
};

const logOut = () => {
    return {
        type: "LOG_OUT"
    }
};

const autoLogIn = () => {
    return dispatch => {fetch("//127.0.0.1:5000/get_session_id", {method: 'POST'})
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data.data !== undefined) {
                    let user;
                    user = {name:data.data.session_id, staff:data.data.staff};
                    dispatch(logIn(user))
                }
            });
        };
};

export default {
    logIn, logOut, autoLogIn
}
