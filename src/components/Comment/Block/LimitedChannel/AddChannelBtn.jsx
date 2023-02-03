import React from "react";
import {Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from "react-redux";
import {addLimitedChannelID} from "../../../../features/Blocks/blocksSlice";

// チャンネルの追加ボタンです
export const AddChannelBtn = ({blockIndex}) => {
  const dispatch = useDispatch();

  return (
    <Box sx={{m: 1}}>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault()

          dispatch(addLimitedChannelID({
            blockIndex: blockIndex,
          }))
        }}
      >
        <AddIcon fontSize="small"/>
      </Button>
    </Box>
  )
}