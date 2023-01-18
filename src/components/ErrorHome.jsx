import React from "react";
import {Box, Link, Typography} from "@mui/material";
import {useSearchParams} from "react-router-dom";

// エラー発生時のHome画面です
export const ErrorHome = () => {
  const [param] = useSearchParams();
  const serverID = param.get("state");

  // DiscordのログインURLを作成します
  const createDiscordLoginURL = () => {
    const redirectURL = `${process.env.REACT_APP_FE_ROOT_URL}`
    const encodedRedirectURL = encodeURI(redirectURL)
    return `https://discord.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=${encodedRedirectURL}&response_type=code&scope=identify&state=${serverID}`
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