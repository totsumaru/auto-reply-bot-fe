import React from "react";
import {useSelector} from "react-redux";
import {Avatar, Box} from "@mui/material";

// サーバーのアバターです
export const ServerAvatar = () => {
  const {avatarURL} = useSelector(state => state.server)

  return (
    <Box sx={{mr: 2}}>
      {(avatarURL === "")
        ? <Avatar>A</Avatar>
        : <Avatar alt="Avatar" src={avatarURL}/>
      }
    </Box>
  )
}