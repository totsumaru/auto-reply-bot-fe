import React from "react";
import {useSelector} from "react-redux";
import {Typography} from "@mui/material";

// サーバー名です
export const ServerName = () => {
  const {serverName} = useSelector(state => state.blocks)

  return (
    <Typography>
      {serverName}
    </Typography>
  )
}