import React from "react";
import {Box, TextField} from "@mui/material";
import {DeleteBtn} from "./DeleteBtn";

// 返信の入力フィールドです
export const ReplyField = ({label}) => {
  return (
    <Box sx={{mx: 1, my: 2, display: "flex", alignItems: "center"}}>
      <TextField
        label={label}
        fullWidth
        multiline
      />
      <DeleteBtn/>
    </Box>
  )
}