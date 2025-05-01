import { Close, InfoOutlined } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputBase,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

const InputGroup = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  "& .MuiTypography-root": {
    width: "40%",
  },
}));

const InputBaseCustom = ({ id, value, onChange, ...props }) => (
  <InputBase
    id={id}
    value={value}
    onChange={onChange}
    size="small"
    sx={{ flex: 1, backgroundColor: "grey.200", borderRadius: 1, px: 0.75 }}
    inputProps={{ sx: { py: 0.25 } }}
    {...props}
    required
  />
);

const isValidEquation = (equation) => {
  try {
    // Replace placeholders with dummy numbers to test validity
    const replaced = equation
      .replace(/input_value/g, "1")
      .replace(/year/g, "2150");

    // Use Function constructor to test the expression
    // Avoid using eval for safety
    new Function(`return ${replaced}`)();
    return true;
  } catch (e) {
    return false;
  }
};

export const InputModal = ({ existingLables = [], onClose, onAddInput }) => {
  const [input, setInput] = useState({
    label: "Custom Input",
    min: "0",
    max: "100",
    step: "1",
    defaultValue: "20",
    unit: "unit",
    equation: "10 * Math.log10(input_value + 1) * (1 + 0.5 * Math.sin((2 * Math.PI * (year - 2025)) / 100))",
  });
  const [error, setError] = useState(null);
  console.log(existingLables);
  const onChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
    setError(null);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let errorMessage = undefined;
    const inputValue = {
      ...input,
      min: +input.min,
      max: +input.max,
      defaultValue: +input.defaultValue,
      step: +input.step,
    };
    if (existingLables.includes(`custom-${inputValue.label}`)) {
      errorMessage =
        "Name already taken. Please choose a unique name for custom input";
    } else if (inputValue.min > inputValue.max) {
      errorMessage = "Max value should be greater than min value";
    } else if (
      inputValue.defaultValue < inputValue.min ||
      inputValue.defaultValue > inputValue.max
    ) {
      errorMessage = "Default value should be in the range";
    } else if (
      inputValue.step < 0 ||
      inputValue.step > inputValue.max - inputValue.min
    ) {
      errorMessage =
        "Step size should be positive and less than Max - Min value";
    } else if (!isValidEquation(inputValue.equation)) {
      errorMessage = "Equation has incorrect format";
    }

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    onAddInput(inputValue);
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5">Custom Input</Typography>
        <Tooltip arrow title="Close">
          <IconButton color="error" onClick={onClose}>
            <Close />
          </IconButton>
        </Tooltip>
      </Stack>
      <form onSubmit={onSubmitHandler}>
        <InputGroup>
          <Typography>Name: </Typography>
          <InputBaseCustom
            id="label"
            value={input["label"]}
            onChange={onChange}
          />
        </InputGroup>
        <InputGroup>
          <Typography>Min Value: </Typography>
          <InputBaseCustom
            id="min"
            value={input["min"]}
            onChange={onChange}
            type="number"
          />
        </InputGroup>
        <InputGroup>
          <Typography>Max Value: </Typography>
          <InputBaseCustom
            id="max"
            value={input["max"]}
            onChange={onChange}
            type="number"
          />
        </InputGroup>
        <InputGroup>
          <Typography>Default Value: </Typography>
          <InputBaseCustom
            id="defaultValue"
            value={input["defaultValue"]}
            onChange={onChange}
            type="number"
          />
        </InputGroup>
        <InputGroup>
          <Typography>Step Size: </Typography>
          <InputBaseCustom
            id="step"
            value={input["step"]}
            onChange={onChange}
            type="number"
          />
        </InputGroup>
        <InputGroup>
          <Typography>Unit: </Typography>
          <InputBaseCustom
            id="unit"
            value={input["unit"]}
            onChange={onChange}
          />
        </InputGroup>
        <InputGroup sx={{ flexDirection: "column", alignItems: "start" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ width: "100%" }}
          >
            <Typography>Equation: </Typography>
            <Tooltip
              arrow
              title="'input_value' for injecting the selected value. 'year' for have year as a dependency"
            >
              <InfoOutlined sx={{ color: "grey.500" }} />
            </Tooltip>
          </Stack>
          <InputBaseCustom
            id="equation"
            value={input["equation"]}
            onChange={onChange}
            fullWidth
            multiline
            rows={5}
            placeholder="2.5 * input_value + 0.2 * year"
          />
        </InputGroup>
        {error && <Typography color="error">{error}</Typography>}
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Button
            disabled={!!error}
            type="submit"
            variant="contained"
            size="small"
          >
            Add
          </Button>
        </Stack>
      </form>
    </>
  );
};
