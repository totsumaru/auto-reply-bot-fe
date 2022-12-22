import React from "react";
import {Box, Button} from "@mui/material";

// 保存ボタンです
export const SaveBtn = ({color}) => {
  return (
    <Box sx={{textAlign: "right"}}>
      <Button variant="contained" color={color}>保存する</Button>
    </Box>
  )
}