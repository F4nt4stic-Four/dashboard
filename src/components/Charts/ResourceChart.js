import { generateTemperaturePrediction, normalizeToOneDigit } from "./units";
import {
  Stack,
  Typography,
  Box,
  Button,
  Divider,
  Dialog,
  IconButton,
  TextField,
} from "@mui/material";
import {
  Close,
  ColorLens,
  CopyAll,
  Download,
  RestartAlt,
  Share,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

const TIME_SERIES = [2025, 2050, 2075, 2100, 2125, 2150];

export const ResourceChart = ({ inputs, onResetHandler }) => {
  const chartRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const [chartTheme, setChartTheme] = useState({
    borderColor: "#ff6384",
    backgroundColor: "#ff6384",
  });
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const data = {
    labels: TIME_SERIES,
    datasets: [
      {
        label: "Temperature",
        data: TIME_SERIES.map((year) =>
          generateTemperaturePrediction(year, inputs),
        ),
        borderColor: chartTheme.borderColor,
        backgroundColor: chartTheme.backgroundColor,
        borderJoinStyle: "round",
        borderCapStyle: "round",
        tension: 0.4,
      },
    ],
  };

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

  const onChartDownloadhandler = () => {
    const canvas = chartRef.current?.canvas;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png"); // you can also do 'image/jpeg' if you want
    const link = document.createElement("a");
    link.href = url;
    link.download = "temperature-chart.png";
    link.click();
  };

  return (
    <>
      <Box sx={{ height: "100%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Button color="primary" onClick={() => setIsThemeModalOpen(true)}>
            <ColorLens />Change Theme
          </Button>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              color="primary"
              variant="outlined"
              onClick={onChartDownloadhandler}
            >
              <Download />
              Download Chart
            </Button>
            <Button color="primary" variant="outlined" onClick={onShareHandler}>
              {isCopied ? (
                <>
                  <CopyAll /> Copied
                </>
              ) : (
                <>
                  <Share /> share Link
                </>
              )}
            </Button>
            <Button color="error" onClick={onResetHandler}>
              <RestartAlt />
              Reset
            </Button>
          </Stack>
        </Stack>
        <Stack
          spacing={4}
          direction={{ xs: "column", lg: "row-reverse" }}
          justifyContent="space-around"
          sx={{ height: "100%", mt: 2 }}
          alignItems="center"
        >
          <Stack
            spacing={1}
            alignItems="center"
            sx={{
              p: 2,
              minWidth: "25rem",
              borderRadius: 2,
              backgroundColor: "grey.100",
            }}
          >
            <Typography variant="h4" color="primary">
              +
              {normalizeToOneDigit(
                generateTemperaturePrediction(
                  TIME_SERIES[TIME_SERIES.length - 1],
                  inputs,
                ),
              )}
              <sup>
                <sup>o</sup>C
              </sup>
            </Typography>
            <Divider sx={{ width: "5rem" }} />
            <Typography variant="h6">Temperature at the end will be</Typography>
          </Stack>
          <Box sx={{ position: "relative", width: "100%" }}>
            <Line ref={chartRef} options={options} data={data} />
          </Box>
        </Stack>
      </Box>
      <Dialog
        open={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        slotProps={{ paper: { sx: { width: "auto", p: 2 } } }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h4" color="primary">
            Chart Theme
          </Typography>
          <IconButton color="error" onClick={() => setIsThemeModalOpen(false)}>
            <Close />
          </IconButton>
        </Stack>
        <Stack sx={{ mt: 4 }} spacing={4}>
          <TextField
            label="Border Color"
            type="color"
            value={chartTheme.borderColor}
            onChange={(e) => {
              setChartTheme((prev) => ({
                ...prev,
                borderColor: e.target.value,
              }));
            }}
          />
          <TextField
            label="Background Color"
            type="color"
            value={chartTheme.backgroundColor}
            onChange={(e) => {
              setChartTheme((prev) => ({
                ...prev,
                backgroundColor: e.target.value,
              }));
            }}
          />
        </Stack>
      </Dialog>
    </>
  );
};
