import { Stack, Typography, Slider as MuiSlider } from "@mui/material";
import { getLabel } from "../../utils";

export const Slider = ({
  label,
  unit,
  min,
  id,
  step,
  max,
  value,
  stateConfig,
  onChange = null
}) => {
  const handleOnChange = (e) => {
    if (onChange && typeof onChange === 'function') {
      onChange({ id, value: e.target.value })
    }
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
        <Typography fontWeight="bold">
          {label}
        </Typography>
        {/* <Typography>
          <strong>{value}</strong> {unit}
        </Typography> */}
      </Stack>
      <MuiSlider
        value={value}
        onChange={handleOnChange}
        aria-label="Default"
        id={id}
        min={min}
        step={step}
        max={max}
        name={label}
        valueLabelDisplay="auto"
      />
      {stateConfig && (
          <Typography
            textAlign="center"
           
            textTransform="capitalize"
          >
            {getLabel(stateConfig, value) || ""}
          </Typography>
        )}
    </Stack>
  );
};
