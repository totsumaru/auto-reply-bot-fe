import React from "react";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";

// 全て含む/一部を含む のラジオボタンです
export const IsAllMatchRadioGroup = () => {
  return (
    <FormControl sx={{mx: 1}}>
      <RadioGroup
        defaultValue={true}
        name="all-match-radio"
      >
        <FormControlLabel value={true} control={<Radio/>} label="全てのキーワードを含む"/>
        <FormControlLabel value={false} control={<Radio/>} label="どれか1つのキーワードを含む"/>
      </RadioGroup>
    </FormControl>
  )
}