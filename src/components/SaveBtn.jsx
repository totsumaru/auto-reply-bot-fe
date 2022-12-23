import React from "react";
import {Box, Button} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

// 保存ボタンです
export const SaveBtn = ({color}) => {
  return (
    <Box sx={{textAlign: "right"}}>
      <Button
        variant="contained"
        color={color}
        startIcon={<SaveIcon/>}
      >保存する</Button>
    </Box>
  )
}