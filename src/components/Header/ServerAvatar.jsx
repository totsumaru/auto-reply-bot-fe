import React from "react";
import {useSelector} from "react-redux";
import {Avatar, Box} from "@mui/material";

// サーバーのアバターです
export const ServerAvatar = () => {
  const {avatarURL} = useSelector(state => state.blocks)

  return (
    <Box sx={{mr: 1}}>
      {(avatarURL === "")
        ? <Avatar>A</Avatar>
        : <Avatar alt="Avatar" src={avatarURL}/>
      }
    </Box>
  )
}