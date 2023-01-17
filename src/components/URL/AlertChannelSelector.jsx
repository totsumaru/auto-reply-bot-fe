import React from "react";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {updateAlertChannelID} from "../../features/Blocks/blocksSlice";

// アラートを送信するチャンネルです
export const AlertChannelSelector = () => {
  const dispatch = useDispatch();
  const {channels} = useSelector(state => state.blocks);
  const {isRestrict, alertChannelID} = useSelector(state => state.blocks.rule.url);

  return (
    <>
      <Box sx={{minWidth: 120, mt: 3}}>
        <FormControl fullWidth disabled={!isRestrict}>
          <InputLabel id="demo-simple-select-label">チャンネル</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={!alertChannelID ? "" : alertChannelID}
            label="チャンネル"
            onChange={(e) => {
              dispatch(updateAlertChannelID({alertChannelID: e.target.value}))
            }}
          >
            <MenuItem key="none" value="none" sx={{fontWeight: "bold"}}>通知しない</MenuItem>
            {channels.map((channel) => {
              return <MenuItem key={channel.id} value={channel.id}>{channel.name}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Box>
    </>
  )
}