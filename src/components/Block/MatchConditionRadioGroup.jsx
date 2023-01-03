import React from "react";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {useDispatch} from "react-redux";
import {updateMatchCondition} from "../../features/Blocks/blocksSlice";

// 全て含む/一部を含む のラジオボタンです
export const MatchConditionRadioGroup = ({blockIndex, block}) => {
  const dispatch = useDispatch();

  return (
    <FormControl sx={{mx: 1}}>
      <RadioGroup
        value={block.matchCondition}
        name="all-match-radio"
        onChange={(e) => {
          dispatch(updateMatchCondition({
            blockIndex: blockIndex,
            matchCondition: e.target.value,
          }))
        }}
      >
        <FormControlLabel value="all-contain" control={<Radio/>} label="全てのキーワードを含む"/>
        <FormControlLabel value="one-contain" control={<Radio/>} label="どれか1つのキーワードを含む"/>
        <FormControlLabel value="perfect-match" control={<Radio/>} label="完全一致"/>
      </RadioGroup>
    </FormControl>
  )
}