import { Close, Download } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  convertJSONtoCSV,
  getRandomLightColor,
  parseCSVtoJSON,
} from "../../utils";
import { generateData, generateKeyIdPair, TIME_SERIES } from "./units";

export const UploadFile = ({ onClose, setDataHandler }) => {
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
    const dictionary = generateKeyIdPair();
    Object.keys(dictionary).forEach((key) => {
      configData[key] = "";
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
    const dictionary = generateKeyIdPair();
    const chartData = data.map((chartData, index) => {
      const dataPoints = {};
      Object.keys(dictionary).forEach((key) => {
        dataPoints[dictionary[key]] = +chartData[key];
      });
      return {
        label: `Row-${index + 1}`,
        data: generateData(TIME_SERIES, dataPoints),
        inputs: dataPoints,
        borderColor: getRandomLightColor(),
        backgroundColor: getRandomLightColor(),
      };
    });
    setDataHandler(chartData);
  };

  return (
    <>
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
          <IconButton color="error" onClick={onClose}>
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
    </>
  );
};
