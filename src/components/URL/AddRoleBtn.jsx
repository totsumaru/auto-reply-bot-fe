import React from "react";
import {Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from "react-redux";
import {addAllowRoleID} from "../../features/Blocks/blocksSlice";

// ロールの追加ボタンです
export const AddRoleBtn = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={{m: 1}}>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault()

          dispatch(addAllowRoleID({}))
        }}
      >
        <AddIcon fontSize="small"/>
      </Button>
    </Box>
  )
}