import React, {useState} from "react";
import {Box, TextField} from "@mui/material";
import {DeleteBtn} from "./DeleteBtn";
import {useDispatch} from "react-redux";
import {updateKeyword} from "../../../features/Blocks/blocksSlice";

// キーワードの入力フィールドです
export const KeywordField = ({blockIndex, keywordIndex, keyword}) => {
  const [validationErrMsg, setValidationErrMsg] = useState("");
  const dispatch = useDispatch();
  const label = "キーワード" + (keywordIndex + 1);

  return (
    <Box sx={{mx: 1, my: 2, display: "flex", alignItems: "center"}}>
      <TextField
        fullWidth
        id="outlined-basic"
        label={label}
        variant="outlined"
        value={keyword}
        error={validationErrMsg !== ""}
        helperText={validationErrMsg}
        onChange={(e) => {
          // バリデーション
          if (e.target.value.length > 20) {
            setValidationErrMsg("最大文字数は20文字です")
            return
          } else {
            setValidationErrMsg("")
          }
          if (e.target.value === "") {
            setValidationErrMsg("必須項目です")
          }

          dispatch(updateKeyword({
            blockIndex: blockIndex,
            keywordIndex: keywordIndex,
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
        index={keywordIndex}
        type="keyword"
      />
    </Box>
  )
}
