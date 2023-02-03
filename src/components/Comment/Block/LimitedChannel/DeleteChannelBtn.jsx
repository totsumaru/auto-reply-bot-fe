import React from "react";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from "react-redux";
import {deleteLimitedChannelID} from "../../../../features/Blocks/blocksSlice";

// チャンネル削除のアイコンボタンです
export const DeleteChannelBtn = ({blockIndex, index}) => {
  const dispatch = useDispatch();

  return (
    <IconButton
      aria-label="delete"
      sx={{m: 1}}
      onClick={(e) => {
        e.preventDefault()
        dispatch(deleteLimitedChannelID({
          blockIndex: blockIndex,
          limitedChannelIDIndex: index,
        }))
      }}
    >
      <DeleteIcon/>
    </IconButton>
  )
}
