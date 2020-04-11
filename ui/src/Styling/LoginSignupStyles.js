import theme from "./theme";

// This file contains the styling for log in and sign up that is used across the web application such that it can be re-used for multiple components.


export default () => ({
    paper: {
        marginTop: theme.spacing(8),
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
});
