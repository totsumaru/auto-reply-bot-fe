import React from "react";
import {Box, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useDispatch, useSelector} from "react-redux";
import {addReply} from "../../features/Blocks/blocksSlice";

// 返信の追加ボタンです
export const AddReplyBtn = ({blockID}) => {
  const blocks = useSelector(state => state.blocks).blocks
  const block = blocks.find(block => block.id === blockID);
  const dispatch = useDispatch();

  return (
    <Box sx={{m: 1}}>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault()
          // 固定の場合は1つしか設定できないため、アラートを出す
          if (!block.isRandom && block.reply.length === 1) {
            alert("返信が固定の場合は、1つしか設定できません。")
            return
          }

          dispatch(addReply({
            blockID: blockID
          }))
        }}
      >
        <AddIcon fontSize="small"/>
      </Button>
    </Box>
  )
}