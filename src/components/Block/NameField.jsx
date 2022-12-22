import React from "react";
import {Box, TextField} from "@mui/material";

// 表示名の入力フィールドです
export const NameField = () => {
  return (
    <Box sx={{mx: 1, my: 2, display: "flex", alignItems: "center"}}>
      <TextField
        label="表示名"
        multiline
      />
    </Box>
  )
}