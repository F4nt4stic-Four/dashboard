import { useEffect, useState } from "react";
import { Container, Grid2 } from "@mui/material";
import { Header } from "./components";
import { INPUT_CONFIGS } from "./input.config";
import { ResourceChart } from "./components/Charts/ResourceChart";
import { InputContainer } from "./components/InputContainer/InputContainer";

const initialSliderValues = {};
INPUT_CONFIGS.forEach(({ sliders }) => {
  sliders.forEach((slider) => {
    initialSliderValues[slider.id] = slider.defaultValue || slider.min;
  });
});

function App() {
  const [sliderValues, setSliderValues] = useState(initialSliderValues);
  const [customSliders, setCustomSliders] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const sliderValuesFromParams = {};
    searchParams.forEach((value, key) => {
      sliderValuesFromParams[key] = value;
    });
    setSliderValues((prev) => ({ ...prev, ...sliderValuesFromParams }));
  }, []);

  const onSliderValueChangeHandler = ({ id, value }) => {
    setSliderValues((prev) => ({ ...prev, [id]: value }));
  };

  const onResetHandler = () => {
    setSliderValues(initialSliderValues);
  };

  const onAddCustomInput = (input) => {
    setCustomSliders((prev) => [
      ...prev,
      {
        ...input,
        id: `custom_${input.label.toLowerCase().replace(/[-\s]+/g, "_")}`,
      },
    ]);
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
        <ResourceChart
          inputs={sliderValues}
          customEquations={customSliders.reduce((acc, item) => {
            acc[item.id] = item.equation;
            return acc;
          }, {})}
          onResetHandler={onResetHandler}
        />
        <Grid2 container spacing={2} sx={{ mt: 6 }}>
          <InputContainer
            config={{
              id: "custom",
              heading: "Custom Inputs",
              sliders: customSliders,
            }}
            sliderValues={sliderValues}
            onAddCustomInput={onAddCustomInput}
            onSliderValueChangeHandler={onSliderValueChangeHandler}
          />
          {INPUT_CONFIGS.map((config) => (
            <InputContainer
              key={config.id}
              config={config}
              sliderValues={sliderValues}
              onSliderValueChangeHandler={onSliderValueChangeHandler}
            />
          ))}
        </Grid2>
      </Container>
    </>
  );
}

export default App;
