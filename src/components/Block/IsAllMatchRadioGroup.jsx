import React from "react";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {useDispatch} from "react-redux";
import {updateIsAllMatch} from "../../features/Blocks/blocksSlice";

// 全て含む/一部を含む のラジオボタンです
export const IsAllMatchRadioGroup = ({blockID}) => {
  const dispatch = useDispatch();

  return (
    <FormControl sx={{mx: 1}}>
      <RadioGroup
        defaultValue={true}
        name="all-match-radio"
        onChange={(e) => {
          dispatch(updateIsAllMatch({
            blockID: blockID,
            isAllMatch: e.target.value,
          }))
        }}
      >
        <FormControlLabel value={true} control={<Radio/>} label="全てのキーワードを含む"/>
        <FormControlLabel value={false} control={<Radio/>} label="どれか1つのキーワードを含む"/>
      </RadioGroup>
    </FormControl>
  )
}