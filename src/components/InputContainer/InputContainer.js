import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  Grid2,
  Typography,
} from "@mui/material";
import { Slider } from "../Slider";
import { useState } from "react";
import { InputModal } from "./InputModal";

export const InputContainer = ({
  config,
  sliderValues,
  onSliderValueChangeHandler,
  onAddCustomInput,
}) => {
  const [inputModal, setInputModal] = useState(false);

  return (
    <>
      <Grid2 sx={{ p: 1 }} size={{ xs: 12, sm: 6, lg: 4 }}>
        <Accordion
          sx={{
            boxShadow: "none",
            "& .MuiAccordionSummary-root.Mui-expanded": {
              minHeight: "0",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              m: 0,
              p: 1,
              borderRadius: 1,
              backgroundColor: "grey.200",
              "& .MuiAccordionSummary-content, .MuiAccordionSummary-content.Mui-expanded":
                { m: 0 },
            }}
          >
            <Typography variant="h6" textAlign="center" fontWeight="600">
              {config.heading}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid2 container spacing={2}>
              {config.sliders.map((slider) => (
                <Grid2 key={slider.id} size={{ xs: 12, sm: 6 }}>
                  <Slider
                    {...slider}
                    value={sliderValues[slider.id] || slider.defaultValue}
                    onChange={onSliderValueChangeHandler}
                  />
                </Grid2>
              ))}
              {config.id === "custom" && (
                <Grid2 size={12} textAlign="center">
                  <Button
                    variant="outlined"
                    sx={{ mt: 2 }}
                    onClick={() => setInputModal(true)}
                  >
                    Add Slider Input
                  </Button>
                </Grid2>
              )}
            </Grid2>
          </AccordionDetails>
        </Accordion>
      </Grid2>
      <Dialog
        open={inputModal}
        onClose={() => setInputModal(false)}
        slotProps={{
          paper: { sx: { width: "auto", p: 2 } },
        }}
      >
        <InputModal
          existingLables={config.sliders.map(({ id }) => id)}
          onClose={() => setInputModal(false)}
          onAddInput={(inputValue) => {
            onAddCustomInput(inputValue);
            setInputModal(false);
          }}
        />
      </Dialog>
    </>
  );
};
