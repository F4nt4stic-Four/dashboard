import {
  ColorLens,
  CopyAll,
  Download,
  RestartAlt,
  Share,
  Upload,
} from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { generateKeyIdPair } from "./units";
import { convertJSONtoCSV } from "../../utils";
import { useState } from "react";

export const ChartHeader = ({
  setIsThemeModalOpen,
  setIsUploadModalOpen,
  chartRef,
  onResetHandler,
  chartData,
  inputs,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const onChartDownloadhandler = () => {
    const canvas = chartRef.current?.canvas;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png"); // you can also do 'image/jpeg' if you want
    const link = document.createElement("a");
    link.href = url;
    link.download = "temperature-chart.png";
    link.click();
  };

  const onConfigDownloadHandler = () => {
    const configData = {};
    const dictionary = generateKeyIdPair();
    Object.keys(dictionary).forEach((key) => {
      configData[key] = inputs[dictionary[key]];
    });
    const fileData = chartData.map(({ inputs: data }) => {
      const chartData = {};
      Object.keys(dictionary).forEach((key) => {
        chartData[key] = data[dictionary[key]];
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
        <Button variant="outlined" onClick={() => setIsUploadModalOpen(true)}>
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
  );
};
