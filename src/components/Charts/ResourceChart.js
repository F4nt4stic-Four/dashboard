import {
  generateData,
  generateTemperaturePrediction,
  normalizeToOneDigit,
  TIME_SERIES,
} from "./units";
import {
  Stack,
  Typography,
  Box,
  Divider,
  Dialog,
  IconButton,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
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
import { UploadFile } from "./UploadFile";
import { ChartHeader } from "./ChartHeader";

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

export const ResourceChart = ({ inputs, onResetHandler }) => {
  const chartRef = useRef(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartTheme, setChartTheme] = useState({
    borderColor: "#ff6384",
    backgroundColor: "#ff6384",
  });
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const data = {
    labels: TIME_SERIES,
    datasets: [
      {
        label: "Current Temp",
        data: generateData(TIME_SERIES, inputs),
        borderColor: chartTheme.borderColor,
        backgroundColor: chartTheme.backgroundColor,
      },
      ...chartData,
    ].map((dataset) => ({
      ...dataset,
      borderJoinStyle: "round",
      borderCapStyle: "round",
      tension: 0.4,
    })),
  };

  return (
    <>
      <Box sx={{ height: "100%" }}>
        <ChartHeader
          setIsThemeModalOpen={setIsThemeModalOpen}
          setIsUploadModalOpen={setIsUploadModalOpen}
          chartRef={chartRef}
          onResetHandler={onResetHandler}
          chartData={chartData}
          inputs={inputs}
        />
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
          <Typography variant="h5" color="primary">
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
      <Dialog
        maxWidth="none"
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        slotProps={{ paper: { sx: { width: "auto" } } }}
      >
        <UploadFile
          onClose={() => setIsUploadModalOpen(false)}
          setDataHandler={(data) => {
            setChartData(data);
            setIsUploadModalOpen(false);
          }}
        />
      </Dialog>
    </>
  );
};
