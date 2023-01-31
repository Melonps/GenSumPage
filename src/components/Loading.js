import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../style/loading.css';

function Loading() {
    return (
        <div>
            <Box sx={{ height: 40 }}>
                <Typography>
                    <span class="loading">
                        <span>L</span>
                        <span>o</span>
                        <span>a</span>
                        <span>d</span>
                        <span>i</span>
                        <span>n</span>
                        <span>g</span>
                    </span>
                    </Typography>
                <CircularProgress  />
            </Box>
        </div>
    )
}

export default Loading;