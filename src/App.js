import { useState } from "react";
import { Button, Container, Grid2, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Header, Slider } from "./components";
import { INPUT_CONFIGS } from "./input.config";
import { Close, Tune } from "@mui/icons-material";
import { ResourceChart } from "./components/Charts/ResourceChart";

const initialSliderValues = {}
INPUT_CONFIGS.forEach(({ sliders }) => {
  sliders.forEach(slider => {
    initialSliderValues[slider.id] = slider.defaultValue || slider.min
  })
})

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sliderValues, setSliderValues] = useState(initialSliderValues)

  const onSliderValueChangeHandler = ({ id, value }) => {
    setSliderValues(prev => ({ ...prev, [id]: value }))
  }

  return (
    <>
      <Header />
      <Container
        maxWidth="none"
        sx={{
          flex: 1,
          py: { xs: 1, sm: 2.5, md: 3, lg: 2.5 },
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Tooltip title={isSidebarOpen ? 'Close' : "Configurations"}>
            <IconButton sx={{ width: "fit-content" }} onClick={() => setIsSidebarOpen(prev => !prev)}>
              {isSidebarOpen ? <Close color="error" /> : <Tune color="primary" />}
            </IconButton>
          </Tooltip>
          <Button color="error" onClick={() => { setSliderValues(initialSliderValues) }}>Reset</Button>
        </Stack>
        <Grid2 container spacing={2} sx={{ flex: 1, overflow: "auto", position: "relative" }}>
          <Grid2
            size={isSidebarOpen ? { xs: 12, md: 6, lg: 4 } : 0}
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
                  variant="h6"
                  textAlign="center"
                  sx={{ p: 1, borderRadius: 1, backgroundColor: "grey.200" }}
                >
                  {config.heading}
                </Typography>
                {config.sliders.map((slider) => (
                  <Slider key={slider.id} {...slider} value={sliderValues[slider.id]} onChange={onSliderValueChangeHandler} />
                ))}
              </Stack>
            ))}
          </Grid2>
          <Grid2
            size={{ xs: 12, md: 6, lg: 8 }}
            sx={{ height: "100%", overflow: "auto", flex: !isSidebarOpen ? "1 !important" : "" }}
          >
            <ResourceChart inputs={sliderValues} />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}

export default App;
