import React from "react";
import {Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from "react-redux";
import {addKeyword} from "../../features/Blocks/blocksSlice";

// キーワードの追加ボタンです
export const AddKeywordBtn = ({blockIndex}) => {
  const dispatch = useDispatch();

  return (
    <Box sx={{m: 1}}>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault()
          dispatch(addKeyword({
            blockIndex: blockIndex
          }))
        }}
      >
        <AddIcon fontSize="small"/>
      </Button>
    </Box>
  )
}