import React from "react";
import {useSelector} from "react-redux";
import {Typography} from "@mui/material";

// サーバー名です
export const ServerName = () => {
  const {name} = useSelector(state => state.server)

  return (
    <Typography>
      {name}
    </Typography>
  )
}