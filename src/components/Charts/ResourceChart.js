import { LineChart } from "@mui/x-charts";
import { generateTemperaturePrediction, normalizeToOneDigit } from "./units";
import { Stack, Typography, Box, Button } from "@mui/material";
import { CopyAll, RestartAlt, Share } from "@mui/icons-material";
import { useRef, useState } from "react";

const TIME_SERIES = [2025, 2050, 2075, 2100, 2125, 2150];

export const ResourceChart = ({ inputs, onResetHandler }) => {
  const chartRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const onShareHandler = () => {
    const currentURL = window.location.href; // Get the full URL
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <Box sx={{ height: "100%", maxHeight: "50vh" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Stack direction="row" spacing={1}>
          <Typography variant="h6">Temperature at the end will be</Typography>
          <Typography variant="h6" color="primary">
            +
            {normalizeToOneDigit(
              generateTemperaturePrediction(
                TIME_SERIES[TIME_SERIES.length - 1],
                inputs,
              ),
            )}{" "}
            Celsius
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button color="primary" variant="outlined" onClick={onShareHandler}>
            {isCopied ? (
              <>
                <CopyAll /> Copied
              </>
            ) : (
              <>
                <Share /> share
              </>
            )}
          </Button>
          <Button color="error" onClick={onResetHandler}>
            <RestartAlt />
            Reset
          </Button>
        </Stack>
      </Stack>
      <LineChart
        ref={chartRef}
        xAxis={[{ data: TIME_SERIES }]}
        series={[
          {
            data: TIME_SERIES.map((year) =>
              generateTemperaturePrediction(year, inputs),
            ),
          },
        ]}
        sx={{ mx: "auto" }}
      />
    </Box>
  );
};
