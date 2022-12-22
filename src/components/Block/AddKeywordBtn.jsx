import React from "react";
import {Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// キーワードの追加ボタンです
export const AddKeywordBtn = () => {
  return (
    <Box sx={{m: 1}}>
      <Button variant="contained">
        <AddIcon fontSize="small"/>
      </Button>
    </Box>
  )
}