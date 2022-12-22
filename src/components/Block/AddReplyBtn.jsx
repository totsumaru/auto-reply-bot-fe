import React from "react";
import {Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// 返信の追加ボタンです
export const AddReplyBtn = () => {
  return (
    <Box sx={{m: 1}}>
      <Button variant="contained">
        <AddIcon fontSize="small"/>
      </Button>
    </Box>
  )
}