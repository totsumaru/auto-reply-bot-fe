import React from "react";
import {Box, TextField} from "@mui/material";
import {DeleteBtn} from "./DeleteBtn";
import {useDispatch} from "react-redux";
import {updateKeyword} from "../../features/Blocks/blocksSlice";

// キーワードの入力フィールドです
export const KeywordField = ({blockID, keywordIndex, keyword}) => {
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
        onChange={(e) => {
          dispatch(updateKeyword({
            blockID: blockID,
            keywordIndex: keywordIndex,
            value: e.target.value
          }))
        }}
      />
      <DeleteBtn
        blockID={blockID}
        keywordIndex={keywordIndex}
        keyword={keyword}
      />
    </Box>
  )
}
