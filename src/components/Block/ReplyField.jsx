import React from "react";
import {Box, TextField} from "@mui/material";
import {DeleteBtn} from "./DeleteBtn";

// 返信の入力フィールドです
export const ReplyField = ({label}) => {
  return (
    <Box sx={{mx: 1, my: 2, display: "flex", alignItems: "center"}}>
      <TextField
        label={label}
        placeholder="複数行の入力ができます"
        fullWidth
        multiline
      />
      <DeleteBtn/>
    </Box>
  )
}