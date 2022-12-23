import React from "react";
import {Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from "react-redux";
import {addBlock} from "../features/Blocks/blocksSlice";

// ブロックの追加ボタンです
export const BlockAddBtn = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={{
      textAlign: "center",
      mt: 2,
    }}>
      <Button
        variant="outlined"
        onClick={(e) => {
          e.preventDefault()
          dispatch(addBlock())
        }}
      >
        <AddIcon fontSize="small"/>
      </Button>
    </Box>
  )
}