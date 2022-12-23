import React from "react";
import {Box, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {updateName} from "../../features/Blocks/blocksSlice";

// 表示名の入力フィールドです
export const NameField = ({name, blockID}) => {
  const dispatch = useDispatch();

  return (
    <Box sx={{mx: 1, my: 2, display: "flex", alignItems: "center"}}>
      <TextField
        id="outlined-basic"
        label="表示名"
        value={name}
        variant="outlined"
        onChange={(e) => {
          dispatch(updateName({
            blockID: blockID,
            name: e.target.value
          }))
        }}
      />
    </Box>
  )
}