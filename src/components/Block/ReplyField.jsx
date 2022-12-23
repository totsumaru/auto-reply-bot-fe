import React, {useState} from "react";
import {Box, TextField} from "@mui/material";
import {DeleteBtn} from "./DeleteBtn";
import {useDispatch} from "react-redux";
import {updateReply} from "../../features/Blocks/blocksSlice";

// 返信の入力フィールドです
export const ReplyField = ({blockIndex, replyIndex, reply}) => {
  const [validationErrMsg, setValidationErrMsg] = useState("");
  const dispatch = useDispatch();
  const label = "返信" + (replyIndex + 1);

  return (
    <Box sx={{mx: 1, my: 2, display: "flex", alignItems: "center"}}>
      <TextField
        fullWidth
        id="outlined-basic"
        label={label}
        variant="outlined"
        placeholder="Enterで改行できます"
        multiline
        value={reply}
        error={validationErrMsg !== ""}
        helperText={validationErrMsg}
        onChange={(e) => {
          // バリデーション(最大20文字)
          if (e.target.value.length > 20) {
            setValidationErrMsg("最大文字数は20文字です")
            return
          } else {
            setValidationErrMsg("")
          }
          if (e.target.value === "") {
            setValidationErrMsg("必須項目です")
          }

          dispatch(updateReply({
            blockIndex: blockIndex,
            replyIndex: replyIndex,
            value: e.target.value
          }))
        }}
        onBlur={(e) => {
          // バリデーション(required)
          if (e.target.value === "") {
            setValidationErrMsg("必須項目です")
          }
        }}
      />
      <DeleteBtn
        blockIndex={blockIndex}
        index={replyIndex}
        type="reply"
      />
    </Box>
  )
}