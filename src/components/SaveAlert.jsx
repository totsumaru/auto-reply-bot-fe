import React from "react";
import {Alert} from "@mui/material";
import {useSelector} from "react-redux";
import {SaveBtn} from "./SaveBtn";

// 保存を推奨するボタンです
export const SaveAlert = () => {
  const {isChanged} = useSelector(state => state.blocks);

  return (
    <>
      {isChanged && (
        <Alert
          color="error"
          action={<SaveBtn/>}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          内容が変更されています
        </Alert>
      )}
    </>
  )
}
