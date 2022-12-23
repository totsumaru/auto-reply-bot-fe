import React from "react";
import {Box, TextField} from "@mui/material";
import {DeleteBtn} from "./DeleteBtn";
import {useDispatch} from "react-redux";
import {updateReply} from "../../features/Blocks/blocksSlice";

// 返信の入力フィールドです
export const ReplyField = ({blockID, replyIndex, reply}) => {
  const dispatch = useDispatch();
  const label = "返信" + (replyIndex + 1);

  return (
    <Box sx={{mx: 1, my: 2, display: "flex", alignItems: "center"}}>
      <TextField
        fullWidth
        id="outlined-basic"
        label={label}
        variant="outlined"
        placeholder="複数行の入力ができます"
        multiline
        value={reply}
        onChange={(e) => {
          dispatch(updateReply({
            blockID: blockID,
            replyIndex: replyIndex,
            value: e.target.value
          }))
        }}
      />
      <DeleteBtn
        blockID={blockID}
        index={replyIndex}
        type="reply"
      />
    </Box>
  )
}