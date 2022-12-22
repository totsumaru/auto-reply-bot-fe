import React from "react";
import {Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// ブロックの追加ボタンです
export const BlockAddBtn = () => {
  return (
    <Box sx={{
      textAlign: "center",
      mt: 2,
    }}>
      <Button variant="outlined">
        <AddIcon fontSize="small"/>
      </Button>
    </Box>
  )
}