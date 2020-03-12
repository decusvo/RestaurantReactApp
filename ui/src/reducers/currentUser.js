const currentUser = (state = {}, action) => {
    switch (action.type) {
        case "LOG_IN":
            return {
                ...state,
                user: action.payload,
                loggedIn: true,
                staff: action.payload.staff
            };
        case "LOG_OUT":
            return {
                ...state,
                user: {},
                loggedIn: false,
                staff: false
            };
        default:
            return state
    }
};

export default currentUser;