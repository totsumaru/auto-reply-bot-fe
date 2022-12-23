import React from "react";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import {deleteKeyword, deleteReply} from "../../features/Blocks/blocksSlice";

// 削除のアイコンボタンです
export const DeleteBtn = ({blockIndex, index, type}) => {
  const dispatch = useDispatch();

  return (
    <IconButton
      aria-label="delete"
      sx={{m: 1}}
      disabled={index === 0}
      onClick={(e) => {
        e.preventDefault()
        switch (type) {
          case "keyword":
            dispatch(deleteKeyword({
              blockIndex: blockIndex,
              keywordIndex: index,
            }))
            break
          case "reply":
            dispatch(deleteReply({
              blockIndex: blockIndex,
              replyIndex: index,
            }))
            break
          default:
        }
      }}
    >
      <DeleteIcon/>
    </IconButton>
  )
}
