import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides:
                `
                    * {
                        margin: 0;
                        box-sizing: border-box;
                    }
                    html {
                        font-size: 62.5%;
                        height: 100%;
                    }
                    body {
                        height: 100%;
                    }
                    #root {
                        height: 100%;
                    }
                `
        }
    }
})

export default theme;