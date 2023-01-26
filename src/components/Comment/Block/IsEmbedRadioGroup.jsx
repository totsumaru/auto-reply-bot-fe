import React from "react";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {useDispatch} from "react-redux";
import {updateIsEmbed} from "../../../features/Blocks/blocksSlice";

// 埋め込みで送るかのラジオボタンです
export const IsEmbedRadioGroup = ({blockIndex, block}) => {
  const dispatch = useDispatch();

  return (
    <FormControl sx={{mx: 1}}>
      <RadioGroup
        value={block.isEmbed}
        name="embed-radio"
        onChange={(e) => {
          dispatch(updateIsEmbed({
            blockIndex: blockIndex,
            isEmbed: e.target.value === "true",
          }))
        }}
      >
        <FormControlLabel value={false} control={<Radio/>} label="通常のテキストで返信する"/>
        <FormControlLabel value={true} control={<Radio/>} label="リッチテキストで返信する"/>
      </RadioGroup>
    </FormControl>
  )
}