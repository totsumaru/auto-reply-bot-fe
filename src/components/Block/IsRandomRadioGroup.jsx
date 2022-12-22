import React from "react";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";

// ランダムで返信を送るかどうかのラジオボタンです
export const IsRandomRadioGroup = () => {
  return (
    <FormControl sx={{ml: 1}}>
      <RadioGroup
        defaultValue={false}
        name="random-radio"
      >
        <FormControlLabel value={false} control={<Radio/>} label="返信は固定（返信1）にする"/>
        <FormControlLabel value={true} control={<Radio/>} label="次の中からランダムで送る"/>
      </RadioGroup>
    </FormControl>
  )
}