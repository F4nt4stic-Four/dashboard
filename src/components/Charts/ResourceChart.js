import { LineChart } from "@mui/x-charts"
import { generateTemperaturePrediction, normalizeToOneDigit } from "./units"
import { Stack, Typography, Box } from "@mui/material"

const TIME_SERIES = [2025, 2050, 2075, 2100, 2125, 2150]

export const ResourceChart = ({ inputs }) => {
    return <Box sx={{ height: "100%", maxHeight: "50vh" }}>
        <Stack direction="row" spacing={1}>
            <Typography variant="h6">Temperature at the end will be</Typography>
            <Typography variant="h6" color="primary">+{normalizeToOneDigit(generateTemperaturePrediction(TIME_SERIES[TIME_SERIES.length - 1], inputs))} Celsius</Typography>
        </Stack>
        <LineChart xAxis={[{ data: TIME_SERIES }]} series={[{ data: TIME_SERIES.map(year => generateTemperaturePrediction(year, inputs)) }]} sx={{ mx: 'auto' }} />
    </Box>
}