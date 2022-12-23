import React from "react";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {updateIsRandom} from "../../features/Blocks/blocksSlice";

// ランダムで返信を送るかどうかのラジオボタンです
export const IsRandomRadioGroup = ({blockID}) => {
  const blocks = useSelector(state => state.blocks).blocks
  const block = blocks.find(block => block.id === blockID);
  const dispatch = useDispatch();

  return (
    <FormControl sx={{mx: 1}}>
      <RadioGroup
        value={block.isRandom}
        name="random-radio"
        onChange={(e) => {
          // 返信が複数ある場合は、固定に変更できない
          if (block.reply.length > 1) {
            alert("固定に変更するためには、返信を1つにしてください。")
            dispatch(updateIsRandom({
              blockID: blockID,
              isRandom: true
            }))
            return
          }

          dispatch(updateIsRandom({
            blockID: blockID,
            isRandom: e.target.value === "true",
          }))
        }}
      >
        <FormControlLabel value={false} control={<Radio/>} label="返信は固定（返信1）にする"/>
        <FormControlLabel value={true} control={<Radio/>} label="次の中からランダムで送る"/>
      </RadioGroup>
    </FormControl>
  )
}