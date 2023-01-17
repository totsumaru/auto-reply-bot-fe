import React from "react";
import {useDispatch, useSelector} from "react-redux";
import FormGroup from "@mui/material/FormGroup";
import {Checkbox, FormControlLabel} from "@mui/material";
import {updateGIFAllow, updateTwitterAllow, updateYoutubeAllow} from "../../features/Blocks/blocksSlice";

// 許可するURLのチェックボックスです
export const AllowURLCheckbox = () => {
  const {
    isRestrict,
    isYoutubeAllow,
    isTwitterAllow,
    isGIFAllow,
  } = useSelector(state => state.blocks.rule.url);
  const dispatch = useDispatch();

  return (
    <>
      <FormGroup sx={{mt: 1}}>
        {/* YouTube */}
        <FormControlLabel
          disabled={!isRestrict}
          control={
            <Checkbox
              checked={isYoutubeAllow}
              onChange={(e) => {
                dispatch(updateYoutubeAllow())
              }}
            />
          }
          label="YouTube (https://youtube.com/)"
        />

        {/* Twitter */}
        <FormControlLabel
          disabled={!isRestrict}
          control={
            <Checkbox
              checked={isTwitterAllow}
              onChange={(e) => {
                dispatch(updateTwitterAllow())
              }}
            />
          }
          label="Twitter (https://twitter.com/)"
        />

        {/* GIF */}
        <FormControlLabel
          disabled={!isRestrict}
          control={
            <Checkbox
              checked={isGIFAllow}
              onChange={(e) => {
                dispatch(updateGIFAllow())
              }}
            />
          }
          label="GIF (https://tenor.com/)"
        />
      </FormGroup>
    </>
  )
}