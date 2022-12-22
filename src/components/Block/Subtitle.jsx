import React from "react";
import {Typography} from "@mui/material";

// ブロック内のサブタイトルです
export const Subtitle = ({text}) => {
  return (
    <Typography
      variant="h6"
      fontWeight="bold"
      sx={{
        my: 2,
      }}
    >
      {text}
    </Typography>
  )
}
