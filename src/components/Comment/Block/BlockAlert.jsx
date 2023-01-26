import React from "react";
import {Alert, Box} from "@mui/material";

// ブロック内で使用されるアラートです
export const BlockAlert = ({text}) => {
  return (
    <Box sx={{mx: 1, my: 2}}>
      <Alert severity="warning">{text}</Alert>
    </Box>
  )
}