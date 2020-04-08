import theme from "./theme";

// This file contains the styling for the button that is used across the web application such that it can be re-used.


export default () => ({
    button: {
        margin: theme.spacing(1, 0, 0),
        background:
            "linear-gradient(144deg, rgba(252,192,26,1) 0%, rgba(135,211,51,1) 90%)",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 40,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
    }
});
