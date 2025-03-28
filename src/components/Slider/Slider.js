import { Stack, Typography, Slider as MuiSlider } from "@mui/material";
import { useState } from "react";
import { getLabel } from "../../utils";

export const Slider = ({
  label,
  unit,
  min,
  step,
  max,
  defaultValue = 0,
  stateConfig,
}) => {
  const [value, setValue] = useState(defaultValue);
  const handleOnChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <Stack spacing={0.25} sx={{ px: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        flexWrap="wrap"
      >
        <Typography fontSize="1.8rem" fontWeight="bold">
          {label}
        </Typography>
        {stateConfig && (
          <Typography
            textAlign="center"
            fontSize="1.8rem"
            textTransform="capitalize"
          >
            {getLabel(stateConfig, value) || ""}
          </Typography>
        )}
        <Typography fontSize="1.8rem">
          <strong>{value}</strong> {unit}
        </Typography>
      </Stack>
      <MuiSlider
        value={value}
        onChange={handleOnChange}
        aria-label="Default"
        min={min}
        step={step}
        max={max}
        name={label}
        valueLabelDisplay="auto"
      />
    </Stack>
  );
};
