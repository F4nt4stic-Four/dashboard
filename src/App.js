import { useState } from "react";
import { Box, Container, Grid2, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Header, Slider } from "./components";
import { INPUT_CONFIGS } from "./input.config";
import { Close, Tune } from "@mui/icons-material";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <>
      <Header />
      <Container
        maxWidth="none"
        sx={{
          flex: 1,
          py: { xs: 1, sm: 2.5, md: 3, lg: 2.5 },
          overflow: "auto",
        }}
      >
        <Grid2 container spacing={2} sx={{ height: "100%", overflow: "auto", position: "relative" }}>
          <Box sx={{ position: "absolute", inset: 0, width: "fit-content", height: "fit-content", backgroundColor: "common.white", zIndex: "modal" }}>
            <Tooltip title={isSidebarOpen ? 'Close' : "Configurations"}>
              <IconButton onClick={() => setIsSidebarOpen(prev => !prev)}>
                {isSidebarOpen ? <Close fontSize="large" color="error" /> : <Tune fontSize="large" color="primary" />}
              </IconButton>
            </Tooltip>
          </Box>
          <Grid2
            size={{ xs: 12, md: 6, lg: 4 }}
            sx={{ height: "100%", overflow: "auto", order: { xs: 1, md: 0 }, width: isSidebarOpen ? "" : "0 !important", transition: "all 0.2s ease-in-out" }}
          >
            {INPUT_CONFIGS.map((config, index) => (
              <Stack
                spacing={2}
                sx={{
                  mt: index !== 0 && index < INPUT_CONFIGS.length - 1 ? 2 : 0,
                }}
                key={config.id}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  fontWeight="bold"
                  textAlign="center"
                  sx={{ p: 1, borderRadius: 1, backgroundColor: "grey.200" }}
                >
                  {config.heading}
                </Typography>
                {config.sliders.map((slider) => (
                  <Slider key={slider.id} {...slider} />
                ))}
              </Stack>
            ))}
          </Grid2>
          <Grid2
            size={{ xs: 12, md: 6, lg: 8 }}
            sx={{ height: "100%", overflow: "auto" }}
          >
            Graphs will come here
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}

export default App;
