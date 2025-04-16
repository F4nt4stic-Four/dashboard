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
  Button,
  Divider,
  Dialog,
  IconButton,
  TextField,
  LinearProgress,
  InputBase,
} from "@mui/material";
import {
  Close,
  ColorLens,
  CopyAll,
  Download,
  RestartAlt,
  Share,
  Upload,
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
import {
  convertJSONtoCSV,
  getRandomLightColor,
  parseCSVtoJSON,
} from "../../utils";
import { INPUT_CONFIGS } from "../../input.config";

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
  const [isCopied, setIsCopied] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [chartTheme, setChartTheme] = useState({
    borderColor: "#ff6384",
    backgroundColor: "#ff6384",
  });
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const lineChartData = {
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

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const onFileUploadHandler = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== "text/csv") {
      alert("Please upload a valid CSV file");
      event.target.value = "";
      return;
    }
    setLoading(true);
    const { data } = await parseCSVtoJSON(file);
    setData(data);
    setLoading(false);
  };

  const onTemplateDownloadHandler = () => {
    const configData = {};
    INPUT_CONFIGS.forEach((config) => {
      const { heading } = config;
      config.sliders.forEach(({ id, label }) => {
        configData[`${heading}-${label}`] = "";
      });
    });
    const csv = convertJSONtoCSV(configData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "configuration-template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onProcessFileData = () => {
    const chartData = data.map((chartData, index) => {
      const dataPoints = {};
      INPUT_CONFIGS.forEach((config) => {
        config.sliders.forEach(({ id, label }) => {
          dataPoints[id] = +chartData[`${config.heading}-${label}`];
        });
      });
      return {
        label: `Row-${index + 1}`,
        data: generateData(TIME_SERIES, dataPoints),
        inputs: dataPoints,
        borderColor: getRandomLightColor(),
        backgroundColor: getRandomLightColor(),
      };
    });
    setChartData(chartData);
    setIsUploadModalOpen(false);
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

  const onConfigDownloadHandler = () => {
    const configData = {};
    INPUT_CONFIGS.forEach((config) => {
      const { heading } = config;
      config.sliders.forEach(({ id, label }) => {
        configData[`${heading}-${label}`] = inputs[id];
      });
    });
    const fileData = chartData.map(({ inputs: data }) => {
      const chartData = {};
      INPUT_CONFIGS.forEach((config) => {
        const { heading } = config;
        config.sliders.forEach(({ id, label }) => {
          chartData[`${heading}-${label}`] = data[id];
        });
      });
      return chartData;
    });
    const csv = convertJSONtoCSV(configData, ...fileData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "configuration.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <ColorLens />
            Change Theme
          </Button>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              variant="outlined"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Upload /> Upload File
            </Button>
            <Button variant="outlined" onClick={onConfigDownloadHandler}>
              <Download /> Download Configurations
            </Button>
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
            <Line ref={chartRef} options={options} data={lineChartData} />
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
        {loading && <LinearProgress />}
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h5" color="primary">
              Upload Configuration File
            </Typography>
            <IconButton
              color="error"
              onClick={() => setIsUploadModalOpen(false)}
            >
              <Close />
            </IconButton>
          </Stack>
          <Button
            variant="outlined"
            size="small"
            sx={{ mt: 4 }}
            onClick={onTemplateDownloadHandler}
          >
            <Download /> Template
          </Button>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
            <Typography>Upload CSV File</Typography>
            <InputBase
              type="file"
              accept=".csv,text/csv"
              onChange={onFileUploadHandler}
            />
          </Stack>
          <Box sx={{ mt: 4, textAlign: "right" }}>
            <Button
              disabled={!data}
              color="success"
              size="small"
              variant="contained"
              onClick={onProcessFileData}
            >
              Generate Chart
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
