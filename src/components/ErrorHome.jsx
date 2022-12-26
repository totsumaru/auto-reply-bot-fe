import React from "react";
import {Box, Link, Typography} from "@mui/material";
import {useSearchParams} from "react-router-dom";

// エラー発生時のHome画面です
export const ErrorHome = () => {
  const [param] = useSearchParams();
  const serverID = param.get("id");

  // DiscordのログインURLを作成します
  const createDiscordLoginURL = () => {
    console.log("ENV FE:", process.env.REACT_APP_FE_ROOT_URL)
    const redirectURL = `${process.env.REACT_APP_FE_ROOT_URL}?id=${serverID}`
    const encodedRedirectURL = encodeURI(redirectURL)
    return `https://discord.com/api/oauth2/authorize?client_id=1055348253614419989&redirect_uri=${encodedRedirectURL}&response_type=code&scope=identify`
  }

  return (
    <Box sx={{
      textAlign: "center",
      m: 3,
    }}>
      <Typography variant="subtitle1">
        以下のリンクから再度認証してください。<br/>
        ログインできない場合は、管理者ロールが設定されてない可能性があります。
      </Typography>
      <Box sx={{
        mt: 3,
      }}>
        <Link href={createDiscordLoginURL()} sx={{p: 2}}>
          Discordログインページ
        </Link>
      </Box>
    </Box>
  )
}