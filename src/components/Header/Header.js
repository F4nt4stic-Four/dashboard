import { useState } from "react";
import { Button, Dialog, List, ListItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Credits } from './Credits'

export const Header = () => {
  const [open, setOpen] = useState(false)

  return (<>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Quantum Dashboard
        </Typography>
        <List sx={{ display: "flex" }}>
          <ListItem>
            <Button color="common.white" onClick={() => setOpen(true)}>Credits</Button>

          </ListItem>
          <ListItem>
            <Button
              onClick={() => window.open("https://en-roads.climateinteractive.org/scenario.html?v=25.3.1", "_blank")}
              sx={{
                color: "common.white",
              }}
            >
              Reference
            </Button>
          </ListItem>
        </List>
      </Toolbar>
    </AppBar>
    <Dialog maxWidth="none" open={open} onClose={() => setOpen(false)} slotProps={{ paper: { sx: { width: "auto", p: 2 } } }}>
      <Credits onClose={() => setOpen(false)} />
    </Dialog>
  </>
  );
};
