import React, {useState} from "react";
import {Box, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {updateName} from "../../features/Blocks/blocksSlice";

// 表示名の入力フィールドです
export const NameField = ({blockIndex, name}) => {
  const [validationErrMsg, setValidationErrMsg] = useState("");
  const dispatch = useDispatch();

  return (
    <Box maxWidth="400px" sx={{
      mx: 1,
      my: 2,
      display: "flex",
      alignItems: "center",
    }}>
      <TextField
        id="outlined-basic"
        label="表示名"
        value={name}
        variant="outlined"
        error={validationErrMsg !== ""}
        helperText={validationErrMsg}
        sx={{
          width: "100%"
        }}
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

          dispatch(updateName({
            blockIndex: blockIndex,
            name: e.target.value
          }))
        }}
        onBlur={(e) => {
          // バリデーション(required)
          if (e.target.value === "") {
            setValidationErrMsg("必須項目です")
          }
        }}
      />
    </Box>
  )
}