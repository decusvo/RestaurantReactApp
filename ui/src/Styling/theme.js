import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#87D333"
    },
    secondary: {
      main: "#fbc531"
    },
    error: {
      main: red.A400
    },
    background: {
      default: "#fff"
    }
  },

  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#f5f6fa"
        }
      }
    }
  }
});

export default theme;
