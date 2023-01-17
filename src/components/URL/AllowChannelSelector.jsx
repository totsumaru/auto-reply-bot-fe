import React from "react";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {updateAllowChannelID} from "../../features/Blocks/blocksSlice";
import {AddChannelBtn} from "./AddChannelBtn";
import {DeleteChannelBtn} from "./DeleteChannelBtn";

// 制限を受けないチャンネルです
export const AllowChannelSelector = () => {
  const dispatch = useDispatch();
  const {channels} = useSelector(state => state.blocks);
  const {isRestrict, allowChannelID} = useSelector(state => state.blocks.rule.url);

  return (
    <>
      {allowChannelID.map((chID, index) => {
        return (
          <Box key={index} sx={{mx: 1, my: 2, display: "flex", alignItems: "center"}}>
            <FormControl fullWidth disabled={!isRestrict}>
              <InputLabel id="demo-simple-select-label">{"チャンネル" + (index + 1)}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={!chID ? "" : chID}
                label={"チャンネル" + (index + 1)}
                onChange={(e) => {
                  dispatch(updateAllowChannelID({index: index, channelID: e.target.value}))
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

      {allowChannelID.length >= 10 ? "" : <AddChannelBtn/>}
    </>
  )
}