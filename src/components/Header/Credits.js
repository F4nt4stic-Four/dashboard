import { Close } from "@mui/icons-material"
import { Box, IconButton, Stack, styled, Tooltip, Typography } from "@mui/material"

const Image = styled("img")(() => ({
    width: "100%",
    height: "100%",
}))

export const Credits = ({ onClose }) => {
    return <>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" color="primary">2025S SSW 555-WS Course Project</Typography>
            <Tooltip title="Close">
                <IconButton onClick={onClose} color="error">
                    <Close fontSize="large" />
                </IconButton>
            </Tooltip>
        </Stack>
        <Stack spacing={5} sx={{my: 4}} direction={{xs: "column", lg: "row"}} justifyContent="space-between" alignItems="center">
            <Tooltip title="Professor Yu" arrow>
            <Box onClick={() => window.open("https://www.linkedin.com/in/zhongyuan-yu-7955102a/", "_blank")} sx={{display: "flex", maxWidth: "20rem", borderRadius: 2, overflow: "hidden", cursor: "pointer"}}> 
                <Image src="https://media.licdn.com/dms/image/v2/C4D03AQHzLdtGHALpXg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1517597891408?e=1749081600&v=beta&t=9sevc8-odyHhj0iNEjdOuMFzRMPOMoobfeZvdHgrYUE" alt="Professor Yu" />
            </Box>
            </Tooltip>
            <Box sx={{maxWidth: "25rem"}}>
                <Typography variant="h5" textAlign="center">
                    Special Thanks to Professor Yu and Professor Chen for his guidance and support throughout the project.
                </Typography>
            </Box>
            <Tooltip title="Professor Chen" arrow>
            <Box onClick={() => window.open("https://www.linkedin.com/in/hao-chen-260413111/", "_blank")} sx={{display: "flex", maxWidth: "20rem", borderRadius: 2, overflow: "hidden", cursor: "pointer"}}> 
                <Image src="https://media.licdn.com/dms/image/v2/D4E03AQENpkHk4h9Z4Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1690858573337?e=1749081600&v=beta&t=71oNKh-FKDRdCd4nJ1OwjKRFWSEaFeiaxEiXfgbqOrc" alt="Professor Chen" />
            </Box>
            </Tooltip>
            
        </Stack>
    </>
}