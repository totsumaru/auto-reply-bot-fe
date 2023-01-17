import React from "react";
import {Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from "react-redux";
import {addAllowChannelID} from "../../features/Blocks/blocksSlice";

// チャンネルの追加ボタンです
export const AddChannelBtn = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={{m: 1}}>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault()

          dispatch(addAllowChannelID({}))
        }}
      >
        <AddIcon fontSize="small"/>
      </Button>
    </Box>
  )
}