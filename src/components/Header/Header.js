import { Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          Quantum Dashboard
        </Typography>
        <Link
          href="https://en-roads.climateinteractive.org/scenario.html?v=25.3.1"
          target="_blank"
          sx={{
            color: "common.white",
            textTransform: "uppercase",
            fontSize: "1.4rem",
          }}
        >
          Credits
        </Link>
      </Toolbar>
    </AppBar>
  );
};
