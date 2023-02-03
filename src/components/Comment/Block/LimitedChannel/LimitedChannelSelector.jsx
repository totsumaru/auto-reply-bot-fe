import React from "react";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AddChannelBtn} from "./AddChannelBtn";
import {DeleteChannelBtn} from "./DeleteChannelBtn";
import {updateLimitedChannelID} from "../../../../features/Blocks/blocksSlice";

// 実行を限定するチャンネルのセクションです
//
// Addボタンもこの中に記述します。
export const LimitedChannelSelector = ({blockIndex}) => {
  const dispatch = useDispatch();
  const {blocks, channels} = useSelector(state => state.blocks);
  const limitedChannelID = blocks[blockIndex].limitedChannelID;

  return (
    <>
      {limitedChannelID.map((chID, index) => {
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
                  dispatch(updateLimitedChannelID({
                    blockIndex: blockIndex,
                    limitedChannelIDIndex: index,
                    value: e.target.value
                  }))
                }}
              >
                {channels.map((channel) => {
                  return <MenuItem key={channel.id} value={channel.id}>{channel.name}</MenuItem>
                })}
              </Select>
            </FormControl>

            <DeleteChannelBtn blockIndex={blockIndex} index={index}/>
          </Box>
        )
      })}

      {limitedChannelID.length >= 3
        ? ""
        : <AddChannelBtn blockIndex={blockIndex}/>
      }
    </>
  )
}