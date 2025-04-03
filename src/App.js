import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import { Header, Slider } from "./components";
import { INPUT_CONFIGS } from "./input.config";
import { ExpandMore } from "@mui/icons-material";
import { ResourceChart } from "./components/Charts/ResourceChart";

const initialSliderValues = {};
INPUT_CONFIGS.forEach(({ sliders }) => {
  sliders.forEach((slider) => {
    initialSliderValues[slider.id] = slider.defaultValue || slider.min;
  });
});

function App() {
  const [sliderValues, setSliderValues] = useState(initialSliderValues);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const sliderValuesFromParams = {};
    searchParams.forEach((value, key) => {
      sliderValuesFromParams[key] = value;
    });
    setSliderValues(prev => ({...prev, ...sliderValuesFromParams}));
  }, []);

  const onSliderValueChangeHandler = ({ id, value }) => {
    setSliderValues((prev) => ({ ...prev, [id]: value }));
  };

  const onResetHandler = () => {
    setSliderValues(initialSliderValues);
  };

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
          gap: 2,
        }}
      >
        <ResourceChart inputs={sliderValues} onResetHandler={onResetHandler} />
        <Grid2 container spacing={2} sx={{ mt: 2 }}>
          {INPUT_CONFIGS.map((config) => (
            <Grid2
              key={config.id}
              sx={{ p: 1 }}
              size={{ xs: 12, sm: 6, lg: 4 }}
            >
              <Accordion sx={{ boxShadow: "none" }}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: "grey.200",
                    "& .MuiAccordionSummary-content": { m: 0 },
                  }}
                >
                  <Typography variant="h6" textAlign="center" fontWeight="600">
                    {config.heading}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid2 container spacing={2}>
                    {config.sliders.map((slider) => (
                      <Grid2 key={slider.id} size={{ xs: 12, sm: 6 }}>
                        <Slider
                          {...slider}
                          value={sliderValues[slider.id]}
                          onChange={onSliderValueChangeHandler}
                        />
                      </Grid2>
                    ))}
                  </Grid2>
                </AccordionDetails>
              </Accordion>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </>
  );
}

export default App;
