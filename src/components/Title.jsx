import React from "react";
import {Typography} from "@mui/material";

// タイトルです
export const Title = ({content}) => {
  return (
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: "bold",
        mt: 4,
      }}>
      {content}
    </Typography>
  )
}