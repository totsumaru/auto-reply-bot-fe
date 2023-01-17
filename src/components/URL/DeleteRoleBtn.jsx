import React from "react";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import {deleteAllowRoleID} from "../../features/Blocks/blocksSlice";

// ロール削除のアイコンボタンです
export const DeleteRoleBtn = ({index}) => {
  const dispatch = useDispatch();

  return (
    <IconButton
      aria-label="delete"
      sx={{m: 1}}
      onClick={(e) => {
        e.preventDefault()
        dispatch(deleteAllowRoleID({index: index}))
      }}
    >
      <DeleteIcon/>
    </IconButton>
  )
}
