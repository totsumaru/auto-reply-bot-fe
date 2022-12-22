import React from "react";
import {Box, TextField} from "@mui/material";
import {DeleteBtn} from "./DeleteBtn";

export const KeywordField = ({label}) => {
  return (
    <Box sx={{mx: 1, my: 2, display: "flex", alignItems: "center"}}>
      <TextField fullWidth id="outlined-basic" label={label} variant="outlined"/>
      <DeleteBtn/>
    </Box>
  )
}
