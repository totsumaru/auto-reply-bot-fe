import React from "react";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {AddChannelBtn} from "./AddChannelBtn";
import {DeleteChannelBtn} from "./DeleteChannelBtn";
import {useDispatch, useSelector} from "react-redux";
import {updateIgnoreChannelID} from "../../../features/Blocks/blocksSlice";

// 制限を受けないチャンネルです
export const ChannelSelector = () => {
  const {ignoreChannelID, channels} = useSelector(state => state.blocks);
  const dispatch = useDispatch();

  return (
    <>
      {ignoreChannelID.map((chID, index) => {
        return (
          <Box key={index} sx={{mx: 1, my: 2, display: "flex", alignItems: "center"}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{"チャンネル" + (index + 1)}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={!chID ? "" : chID}
                label={"チャンネル" + (index + 1)}
                onChange={(e) => {
                  dispatch(updateIgnoreChannelID({index: index, channelID: e.target.value}))
                }}
              >
                {channels.map((channel) => {
                  return <MenuItem key={channel.id} value={channel.id}>{channel.name}</MenuItem>
                })}
              </Select>
            </FormControl>

            <DeleteChannelBtn index={index}/>
          </Box>
        )
      })}

      {ignoreChannelID.length >= 10 ? "" : <AddChannelBtn/>}
    </>
  )
}