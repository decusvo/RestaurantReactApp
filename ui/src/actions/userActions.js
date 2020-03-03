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
    fetch("//127.0.0.1:5000/get_session_id", {method: 'POST'})
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data);
            return {type: "LOG_IN", payload: data};
        })
};

export default {
    logIn, logOut, autoLogIn
}
