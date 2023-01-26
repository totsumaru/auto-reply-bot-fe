import React from "react";
import {Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch} from "react-redux";
import {addKeyword} from "../../../features/Blocks/blocksSlice";

// キーワードの追加ボタンです
export const AddKeywordBtn = ({blockIndex, block}) => {
  const dispatch = useDispatch();

  return (
    <Box sx={{m: 1}}>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault()

          // 完全一致の場合は追加できないため、アラートを出す
          if (block.matchCondition === "perfect-match") {
            alert("完全一致の場合は、1つしか設定できません。")
            return
          }

          dispatch(addKeyword({
            blockIndex: blockIndex
          }))
        }}
      >
        <AddIcon fontSize="small"/>
      </Button>
    </Box>
  )
}