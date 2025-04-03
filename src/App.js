import { useState } from "react";
import { Button, Container, Grid2, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { Header, Slider } from "./components";
import { INPUT_CONFIGS } from "./input.config";
import { Close, Tune, RestartAlt } from "@mui/icons-material";
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
        {/* <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Tooltip title={isSidebarOpen ? 'Close' : "Configurations"}>
            <IconButton sx={{ width: "fit-content" }} onClick={() => setIsSidebarOpen(prev => !prev)}>
              {isSidebarOpen ? <Close color="error" /> : <Tune color="primary" />}
            </IconButton>
          </Tooltip>
          <Button color="error" sx={{ alignItems: "center", gap: 0.5 }} onClick={() => { setSliderValues(initialSliderValues) }}><RestartAlt /> Reset</Button>
        </Stack> */}
        <ResourceChart inputs={sliderValues} />
        <Grid2 container spacing={2} sx={{ mt: 2 }}>
          {INPUT_CONFIGS.map(config => <Grid2 key={config.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Typography
              gutterBottom
              variant="h6"
              textAlign="center"
              fontWeight="600"
              sx={{ p: 1, borderRadius: 1, backgroundColor: "grey.200" }}
            >
              {config.heading}
            </Typography>
            <Grid2 container spacing={2}>
              {config.sliders.map((slider) => (<Grid2 key={slider.id} size={{ xs: 12, sm: 6 }}>
                <Slider {...slider} value={sliderValues[slider.id]} onChange={onSliderValueChangeHandler} />
              </Grid2>
              ))}
            </Grid2>
          </Grid2>)}
        </Grid2>
        {/* <Grid2 container spacing={2} sx={{ flex: 1, overflow: "auto", position: "relative" }}>
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
        </Grid2> */}
      </Container>
    </>
  );
}

export default App;
