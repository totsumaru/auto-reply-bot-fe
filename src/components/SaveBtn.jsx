import React from "react";
import {Box, Button} from "@mui/material";

// 保存ボタンです
export const SaveBtn = ({color}) => {
  return (
    <Box sx={{mt: 2, textAlign: "right"}}>
      <Button variant="contained" color={color}>保存する</Button>
    </Box>
  )
}