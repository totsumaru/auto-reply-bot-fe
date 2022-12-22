import React from "react";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";

// 埋め込みで送るかのラジオボタンです
export const IsEmbedRadioGroup = () => {
  return (
    <FormControl sx={{mx: 1}}>
      <RadioGroup
        defaultValue={true}
        name="embed-radio"
      >
        <FormControlLabel value={true} control={<Radio/>} label="通常のテキストで返信する"/>
        <FormControlLabel value={false} control={<Radio/>} label="リッチテキストで返信する"/>
      </RadioGroup>
    </FormControl>
  )
}