import React from "react";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import {deleteKeyword} from "../../features/Blocks/blocksSlice";

// 削除のアイコンボタンです
export const DeleteBtn = ({blockID, keywordIndex, keyword}) => {
  const dispatch = useDispatch();

  return (
    <IconButton
      aria-label="delete"
      sx={{m: 1}}
      onClick={(e) => {
        e.preventDefault()
        dispatch(deleteKeyword({
          blockID: blockID,
          keywordIndex: keywordIndex,
          keyword: keyword,
        }))
      }}
    >
      <DeleteIcon/>
    </IconButton>
  )
}
