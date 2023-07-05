import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import "../style/loading.css";

function Loading() {
    return (
        <Typography sx={{ display: "flex", alignItems: "center" }}>
            <span className="loading">
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
            </span>
            <CircularProgress />
        </Typography>
    );
}

export default Loading;
