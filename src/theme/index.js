import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
                    * {
                        margin: 0;
                        box-sizing: border-box;
                    }
                    html {
                        font-size: 62.5%;
                    }
                    #root {
                        height: 100vh;
                        display: flex;
                        flex-direction: column;
                    }
                `,
    },
  },
});

export default theme;
