import { Close } from "@mui/icons-material"
import { IconButton, Stack, Tooltip, Typography } from "@mui/material"

export const Credits = ({ onClose }) => {
    return <>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" color="primary">2025S SSW 555-WS Course Project</Typography>
            <Tooltip title="Close">
                <IconButton onClick={onClose} color="error">
                    <Close fontSize="large" />
                </IconButton>
            </Tooltip>
        </Stack>
    </>
}