import React from "react";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

// 削除のアイコンボタンです
export const DeleteBtn = () => {
  return (
    <IconButton aria-label="delete" sx={{m: 1}}>
      <DeleteIcon/>
    </IconButton>
  )
}
