import React from "react";
import {useDispatch, useSelector} from "react-redux";
import FormGroup from "@mui/material/FormGroup";
import {Checkbox, FormControlLabel} from "@mui/material";
import {
  updateDiscordAllow,
  updateGIFAllow,
  updateOpenseaAllow,
  updateTwitterAllow,
  updateYoutubeAllow
} from "../../features/Blocks/blocksSlice";

// 許可するURLのチェックボックスです
export const AllowURLCheckbox = () => {
  const {
    isRestrict,
    isYoutubeAllow,
    isTwitterAllow,
    isGIFAllow,
    isOpenseaAllow,
    isDiscordAllow,
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
          label="YouTube (youtube.com)"
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
          label="Twitter (twitter.com)"
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
          label="GIF (tenor.com)"
        />

        {/* Opensea */}
        <FormControlLabel
          disabled={!isRestrict}
          control={
            <Checkbox
              checked={isOpenseaAllow}
              onChange={(e) => {
                dispatch(updateOpenseaAllow())
              }}
            />
          }
          label="OpenSea (opensea.io,testnet)"
        />

        {/* Discord(招待リンクはダメ) */}
        <FormControlLabel
          disabled={!isRestrict}
          control={
            <Checkbox
              checked={isDiscordAllow}
              onChange={(e) => {
                dispatch(updateDiscordAllow())
              }}
            />
          }
          label="Discord (discord.com ※招待リンクは含まれません)"
        />
      </FormGroup>
    </>
  )
}